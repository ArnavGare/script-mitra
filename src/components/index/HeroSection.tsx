
import React from "react";

const HeroSection = () => (
  <section id="home" className="scroll-mt-20">
    <div className="text-center pt-12 pb-7 px-4">
      <div className="animate-fade-in">
        <h1
          className="text-5xl md:text-6xl font-playfair font-extrabold headline-glow mb-2 relative text-transparent bg-clip-text bg-gradient-to-r from-[#1cf6c2] via-[#29aadd] to-[#7265ff]"
          style={{ lineHeight: "1.11" }}
        >
          Automation Mitra
        </h1>
        <p className="mt-2 text-xl md:text-2xl font-sans text-[#0ca67c] dark:text-[#7efae2] font-semibold tracking-tight animate-fade-in-up">
          Your Growth Partner for Smart Automation &amp; Content Creation
        </p>
        <p className="mx-auto max-w-2xl mt-6 mb-1 text-lg md:text-xl text-white/90 dark:text-gray-200 font-medium font-sans animate-fade-in-up">
          Automation Mitra is a central platform for Indian financial creators and advisors, offering a suite of AI-driven tools and automation products — all designed to help you scale smarter, create better, and grow your influence.
        </p>
      </div>
    </div>
  </section>
);

export default HeroSection;
