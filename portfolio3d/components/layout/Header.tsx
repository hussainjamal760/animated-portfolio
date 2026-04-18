"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/constants";
import { cn } from "@/lib/utils";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 100) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
      setIsOpen(false);
    }
  });

  return (
    <header className="fixed top-0 left-0 w-full z-50 pointer-events-none">
      <div className="container mx-auto px-6 md:px-12 py-8 flex justify-end">
        <div className="pointer-events-auto w-full flex justify-center">
          <AnimatePresence mode="wait">
            {!isScrolled ? (
              <motion.div
                key="burger-only"
                initial={{ opacity: 0, scale: 0.8, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.8, x: 20 }}
                className="w-full flex justify-between items-center"
              >
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-xl font-bold text-white tracking-tighter"
                >
                  PORTFOLIO<span className="text-primary">.</span>
                </motion.div>
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="p-4 bg-white/5 border border-white/10 rounded-full text-white hover:bg-white/10 transition-colors shadow-xl backdrop-blur-md"
                >
                  {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </motion.div>
            ) : (
              <motion.nav
                key="full-navbar"
                initial={{ opacity: 0, y: -20, width: "60px" }}
                animate={{ opacity: 1, y: 34, width: "80%" }}
                exit={{ opacity: 0, y: -20, width: "60px" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="glass-dark rounded-[2rem] px-10 py-5 flex items-center justify-center border border-primary/40 shadow-[0_0_20px_rgba(58,190,249,0.1)] backdrop-blur-2xl"
              >
                <div className="flex items-center gap-16">
                  {NAV_LINKS.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      className="text-sm font-medium text-white/80 hover:text-primary transition-all duration-300 tracking-widest uppercase"
                    >
                      {link.label}
                    </a>
                  ))}
                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-2 text-white hover:bg-white/5 rounded-full transition-colors md:hidden"
                  >
                    <Menu size={20} />
                  </button>
                </div>
              </motion.nav>
            )}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresenceOutcome isOpen={isOpen} setIsOpen={setIsOpen} />
    </header>
  );
};

const AnimatePresenceOutcome = ({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (v: boolean) => void }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "100vh" }}
        exit={{ opacity: 0, height: 0 }}
        className="fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl pointer-events-auto flex flex-col items-center justify-center gap-8"
      >
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute top-10 right-10 p-4 text-white hover:bg-white/5 rounded-full transition-colors"
        >
          <X size={32} />
        </button>
        {NAV_LINKS.map((link, i) => (
          <motion.a
            key={link.label}
            href={link.href}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => setIsOpen(false)}
            className="text-4xl font-bold text-white hover:text-primary transition-colors tracking-tight"
          >
            {link.label}
          </motion.a>
        ))}
      </motion.div>
    )}
  </AnimatePresence>
);

export default Header;
