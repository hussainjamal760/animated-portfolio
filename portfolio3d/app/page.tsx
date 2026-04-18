import Header from "@/components/layout/Header";
import Hero from "@/sections/Hero";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      

      <div className="h-[200vh] w-full bg-black" />
    </main>
  );
}
