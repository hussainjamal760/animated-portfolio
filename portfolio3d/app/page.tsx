import Header from "@/components/layout/Header";
import HeroScroll from "@/components/sections/HeroScroll";

export default function Home() {
  return (
    <main className="bg-black">
      <Header />
      <HeroScroll />
      <div className="h-screen w-full flex items-center justify-center bg-black border-t border-white/5">
        <h2 className="text-4xl font-extrabold text-white/10 uppercase tracking-[2em] animate-pulse">LoopBazar</h2>
      </div>
    </main>
  );
}
