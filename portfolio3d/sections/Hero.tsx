"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Star } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center pt-32 pb-20 overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-[30rem] h-[30rem] bg-primary/20 blur-[130px] rounded-full" />
      <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-primary/10 blur-[130px] rounded-full" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-white/70 text-sm mb-10 shadow-lg backdrop-blur-md"
          >
            <Star size={14} className="text-primary fill-primary" />
            <span className="font-medium tracking-wide">Available for premium projects</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-7xl md:text-9xl font-bold text-white leading-[0.9] tracking-tighter mb-8 selection:select-none"
          >
            Crafting Digital <br />
            <span className="text-primary italic">Experiences.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl md:text-2xl text-muted max-w-3xl mb-14 leading-relaxed font-light"
          >
            A curated portfolio showcasing high-end design, smooth animations, 
            and scalable Next.js architectures built for the modern web.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row gap-6 mb-24"
          >
            <Button size="lg" className="group text-lg px-10">
              View Projects
              <ArrowRight size={22} className="ml-3 group-hover:translate-x-1.5 transition-transform duration-300" />
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-10">
              Get in Touch
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-6xl mx-auto rounded-3xl border border-white/10 bg-white/[0.02] aspect-[16/9] md:aspect-[21/9] flex items-center justify-center p-12 backdrop-blur-sm relative overflow-hidden group shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full relative z-10">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-40 rounded-2xl bg-white/5 border border-white/5 group-hover:border-white/10 transition-colors duration-500" />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
