import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styled from '@emotion/styled';
import { glimpseTheme } from '../../theme'; // <-- FIX: Import theme from the theme file

// --- Styled Components ---

const CursorDot = styled.div`
  position: fixed;
  width: 4px; /* Slightly smaller for 'dot' feel */
  height: 4px;
  background-color: ${props => props.theme.colors.blue};
  border-radius: 50%;
  transform: translate(-50%, -50%);
  z-index: 99999;
  pointer-events: none;
`;

const CursorOutline = styled.div`
  position: fixed;
  width: 24px; /* 6 * 4 */
  height: 24px;
  border: 2px solid ${props => props.theme.colors.blue};
  border-radius: 50%;
  transform: translate(-50%, -50%);
  z-index: 99998;
  pointer-events: none;
  transition: all 0.15s ease-out;
`;

// --- Component ---

const CustomCursor: React.FC = () => {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorOutlineRef = useRef<HTMLDivElement>(null);
  const pointerRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      pointerRef.current.x = e.clientX;
      pointerRef.current.y = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animateCursor = () => {
      if (cursorDotRef.current && cursorOutlineRef.current) {
        gsap.to(cursorDotRef.current, {
          x: pointerRef.current.x,
          y: pointerRef.current.y,
          duration: 0.1,
          ease: "none",
          overwrite: "auto"
        });

        gsap.to(cursorOutlineRef.current, {
          x: pointerRef.current.x,
          y: pointerRef.current.y,
          duration: 0.3,
          ease: "power2.out",
          overwrite: "auto"
        });
      }
    };

    gsap.ticker.add(animateCursor);

    const handleHover = (e: Event) => {
      const target = e.target as HTMLElement;
      if (cursorOutlineRef.current) {
        if (target.closest('.os-interactable, button, a')) {
          gsap.to(cursorOutlineRef.current, {
            scale: 1.8,
            opacity: 0.7,
            backgroundColor: 'rgba(0, 120, 212, 0.1)',
            borderColor: 'rgba(0, 120, 212, 0.8)',
            duration: 0.2,
            ease: "power2.out"
          });
        } else {
          gsap.to(cursorOutlineRef.current, {
            scale: 1,
            opacity: 1,
            backgroundColor: 'transparent',
            borderColor: glimpseTheme.colors.blue, // <-- FIX: Use imported theme
            duration: 0.2,
            ease: "power2.out"
          });
        }
      }
    };

    // FIX: Removed the 'require' statement from here

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
      <CursorDot ref={cursorDotRef} id="custom-os-cursor-dot" />
      <CursorOutline ref={cursorOutlineRef} id="custom-os-cursor-outline" />
    </>
  );
};

export default CustomCursor;