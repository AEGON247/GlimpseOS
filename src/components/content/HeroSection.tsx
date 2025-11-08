import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

interface HeroProps {
  title: string;
  subtitle: string;
  ctaText: string;
}

const HeroSection: React.FC<HeroProps> = ({ title, subtitle, ctaText }) => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Initial reveal animation
    gsap.timeline({ delay: 0.5 })
      .from(titleRef.current, { y: 50, opacity: 0, ease: "power3.out", duration: 1 })
      .from(subtitleRef.current, { y: 30, opacity: 0, ease: "power2.out", duration: 0.8 }, "-=0.6")
      .from(ctaRef.current, { y: 20, opacity: 0, ease: "power1.out", duration: 0.6 }, "-=0.4");
  }, []);

  const handleCtaClick = () => {
    gsap.to(window, { duration: 1, scrollTo: "#git-graph-viz", ease: "power2.inOut" });
  };

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center items-center text-center p-8 z-10">
      <h1 ref={titleRef} className="text-6xl md:text-8xl font-bold text-glimpse-text mb-4 lg:leading-tight">
        {title}
      </h1>
      <p ref={subtitleRef} className="text-xl md:text-2xl text-glimpse-dark-text max-w-3xl mb-12">
        {subtitle}
      </p>
      <button
        ref={ctaRef}
        onClick={handleCtaClick}
        className="px-8 py-3 bg-transparent border-2 border-glimpse-blue rounded-full text-glimpse-blue text-lg font-bold
                   hover:bg-glimpse-blue hover:text-glimpse-bg transition-all duration-300
                   shadow-glimpse-blue shadow-lg hover:shadow-xl hover:scale-105 transform hover-target"
      >
        {ctaText}
      </button>
    </section>
  );
};

export default HeroSection;