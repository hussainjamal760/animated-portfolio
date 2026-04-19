"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 200;
const IMG_PREFIX = "ezgif-frame-";

const getFrameSrc = (i: number) =>
  `/modal-img/${IMG_PREFIX}${String(i).padStart(3, "0")}.png`;

export default function HeroScroll() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const frameRef = useRef({ value: 0 });
  const lastFrameRef = useRef(0);

  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);

  // 🔥 DRAW IMAGE (with fallback)
  const drawImage = (
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    img: HTMLImageElement
  ) => {
    const W = canvas.width;
    const H = canvas.height;
const scaleFactor = 1; // adjust 0.6 - 1

const scale =
  Math.min(W / img.naturalWidth, H / img.naturalHeight) * scaleFactor;
    const sw = img.naturalWidth * scale;
    const sh = img.naturalHeight * scale;
    const sx = (W - sw) / 2;
    const sy = (H - sh) / 2;

    ctx.clearRect(0, 0, W, H);
    ctx.drawImage(img, sx, sy, sw, sh);
  };

  const drawFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = imagesRef.current[index];

    // ❗ fallback to last rendered frame
    if (!img || !img.complete || !img.naturalWidth) {
      const fallback = imagesRef.current[lastFrameRef.current];
      if (!fallback) return;
      drawImage(ctx, canvas, fallback);
      return;
    }

    lastFrameRef.current = index;
    drawImage(ctx, canvas, img);
  };

  // 🔄 LOAD IMAGES
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    const setSize = () => {
      const dpr = window.devicePixelRatio || 1;

      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;

      canvas.style.width = "100vw";
      canvas.style.height = "100vh";

      // 🔥 FIX BLUR
      ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);

      drawFrame(frameRef.current.value);
    };

    setSize();
    window.addEventListener("resize", setSize);

    let loaded = 0;

    const onProgress = () => {
      loaded++;
      setLoadingProgress(Math.round((loaded / TOTAL_FRAMES) * 100));
      if (loaded === TOTAL_FRAMES) setIsReady(true);
    };

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFrameSrc(i);

      img.onload = () => {
        imagesRef.current[i - 1] = img; // ✅ FIXED INDEX

        if (i === 1) drawFrame(0);

        onProgress();
      };

      img.onerror = () => {
        imagesRef.current[i - 1] =
          imagesRef.current[i - 2] || null; // fallback

        onProgress();
      };
    }

    return () => {
      window.removeEventListener("resize", setSize);
    };
  }, []);

  // 🎯 SCROLL ANIMATION
  useEffect(() => {
    if (!isReady) return;

    const container = containerRef.current;
    if (!container) return;

    drawFrame(0);

    const tween = gsap.to(frameRef.current, {
      value: TOTAL_FRAMES - 1,
      ease: "none",
      onUpdate: () => {
        const frame = Math.floor(frameRef.current.value); // ✅ smooth
        drawFrame(frame);
      },
      scrollTrigger: {
        id: "hero-scroll",
        trigger: container,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        pin: true, // 🔥 better UX
      },
    });

    return () => {
      tween.kill();
      ScrollTrigger.getById("hero-scroll")?.kill();
    };
  }, [isReady]);

  return (
    <div
      ref={containerRef}
      style={{ height: "600vh" }}
      className="relative w-full bg-black"
    >
      <div className="sticky top-0 w-full h-screen overflow-hidden bg-black">
        <canvas ref={canvasRef} />

        {!isReady && (
          <div className="absolute inset-0 flex items-center justify-center bg-black z-50">
            <div className="flex flex-col items-center gap-6">
              <div className="relative">
                <div className="h-16 w-16 border-4 border-white/10 border-t-[#FFB7CE] rounded-full animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white text-[10px] font-bold">
                    {loadingProgress}%
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-center gap-2">
                <p className="text-[10px] font-black tracking-[0.4em] text-white uppercase opacity-40">
                  Initializing Experience
                </p>

                <div className="w-32 h-0.5 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${loadingProgress}%` }}
                    className="h-full bg-gradient-to-r from-[#FFB7CE] to-[#D4A5FF]"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/30 pointer-events-none z-10" />
      </div>
    </div>
  );
}