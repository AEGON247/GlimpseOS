import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CustomCursor: React.FC = () => {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorOutlineRef = useRef<HTMLDivElement>(null);
  const pointerRef = useRef({ x: 0, y: 0, dx: 0, dy: 0, speed: 0.1 }); // Track position and speed

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      pointerRef.current.x = e.clientX;
      pointerRef.current.y = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // GSAP Ticker for smooth animation
    const animateCursor = () => {
      if (cursorDotRef.current && cursorOutlineRef.current) {
        // Dot follows immediately
        gsap.to(cursorDotRef.current, {
          x: pointerRef.current.x,
          y: pointerRef.current.y,
          duration: 0.1, // Quick follow
          ease: "none",
          overwrite: "auto"
        });

        // Outline lags behind slightly, with a springy ease
        gsap.to(cursorOutlineRef.current, {
          x: pointerRef.current.x,
          y: pointerRef.current.y,
          duration: 0.3, // Slower follow
          ease: "power2.out", // Springy ease
          overwrite: "auto"
        });
      }
    };

    gsap.ticker.add(animateCursor);

    // Handle hover states
    const handleHover = (e: Event) => {
      const target = e.target as HTMLElement;
      if (cursorOutlineRef.current) {
        if (target.closest('a, button, .hover-target')) { // Add more selectors as needed
          gsap.to(cursorOutlineRef.current, {
            scale: 2,
            opacity: 0.5,
            borderColor: 'rgba(0, 255, 255, 0.8)',
            backgroundColor: 'rgba(0, 255, 255, 0.1)',
            duration: 0.3,
            ease: "power2.out"
          });
        } else {
          gsap.to(cursorOutlineRef.current, {
            scale: 1,
            opacity: 1,
            borderColor: '#00FFFF',
            backgroundColor: 'transparent',
            duration: 0.3,
            ease: "power2.out"
          });
        }
      }
    };

    document.addEventListener('mouseover', handleHover);
    document.addEventListener('mouseout', handleHover);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleHover);
      document.removeEventListener('mouseout', handleHover);
      gsap.ticker.remove(animateCursor);
    };
  }, []);

  return (
    <>
      {/* Small dot, follows precisely */}
      <div
        ref={cursorDotRef}
        id="custom-cursor-dot"
        className="fixed w-1 h-1 bg-glimpse-blue rounded-full -translate-x-1/2 -translate-y-1/2"
      ></div>
      {/* Larger outline, lags slightly, animates on hover */}
      <div
        ref={cursorOutlineRef}
        id="custom-cursor-outline"
        className="fixed w-8 h-8 border-2 border-glimpse-blue rounded-full -translate-x-1/2 -translate-y-1/2 transition-colors duration-150"
      ></div>
    </>
  );
};

export default CustomCursor;