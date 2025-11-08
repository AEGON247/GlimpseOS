import React, { useRef, useEffect } from 'react';
// import gsap from 'gsap'; // Not used in this component, remove this line

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  alpha: number;
  color: string;
}

const BackgroundParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number>(null);
  // IMPORTANT: particles should be a mutable ref or a state variable if you want to persist across renders
  // or re-initialized inside useEffect
  const particlesRef = useRef<Particle[]>([]); // Use a ref for particles array
  const numParticles = 50;
  const particleColors = ['#00FFFF', '#BF00FF', '#33FFFF'];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Clear previous particles and reinitialize on mount
    particlesRef.current = [];
    for (let i = 0; i < numParticles; i++) {
      particlesRef.current.push({ // Push to the ref's current array
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speedX: Math.random() * 0.4 - 0.2,
        speedY: Math.random() * 0.4 - 0.2,
        alpha: Math.random() * 0.5 + 0.3,
        color: particleColors[Math.floor(Math.random() * particleColors.length)],
      });
    }

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particlesRef.current.length; i++) { // Iterate through ref's current array
        const p = particlesRef.current[i];

        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const animate = () => {
      drawParticles();
      animationFrameId.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <canvas ref={canvasRef} className="fixed inset-0 z-0 opacity-10"></canvas>
  );
};

export default BackgroundParticles;