import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { SkillData } from '../../types/os';
import { FaReact, FaJs, FaCss3Alt, FaNodeJs, FaFigma, FaGitAlt, FaDocker, FaDatabase } from 'react-icons/fa'; // Example icons
import { SiTypescript, SiGo, SiTailwindcss, SiGreensock } from 'react-icons/si'; // Example icons

gsap.registerPlugin(ScrollTrigger);

interface SkillsGridProps {
  skills: SkillData[];
}

// Map skill icons
const iconMap: { [key: string]: React.ElementType } = {
  react: FaReact,
  typescript: SiTypescript,
  go: SiGo,
  nodejs: FaNodeJs,
  tailwindcss: SiTailwindcss,
  gsap: SiGreensock,
  figma: FaFigma,
  git: FaGitAlt,
  docker: FaDocker,
  sql: FaDatabase,
  // Add more mappings
  javascript: FaJs, // Assuming for general JS
  css: FaCss3Alt, // Assuming for general CSS
};

const SkillsGrid: React.FC<SkillsGridProps> = ({ skills }) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const skillRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (gridRef.current) {
      gsap.from(skillRefs.current, {
        opacity: 0,
        y: 50,
        scale: 0.8,
        stagger: 0.08, // Staggered reveal
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 80%", // When top of grid enters 80% of viewport
          end: "bottom center",
          // markers: true,
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [skills]);

  return (
    <section id="skills" className="min-h-screen py-20 px-8 relative z-10">
      <h2 className="text-4xl font-bold text-center mb-16 text-glimpse-purple z-20 sticky top-20 mix-blend-screen hover-target">
        My Skillset
      </h2>
      <div ref={gridRef} className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {skills.map((skill, index) => {
          const IconComponent = skill.icon ? iconMap[skill.icon] : null;
          return (
            <div
              key={skill.name}
              ref={el => { if (el) skillRefs.current[index] = el; }}
              className="bg-glimpse-component-bg p-6 rounded-lg border border-gray-700 flex flex-col items-center justify-center
                         text-center hover:border-glimpse-blue hover:shadow-lg hover:shadow-glimpse-blue/20 transition-all duration-300
                         transform hover:scale-105 hover-target"
            >
              {IconComponent && <IconComponent className="text-5xl text-glimpse-blue mb-3" />}
              <span className="font-mono text-lg text-glimpse-text">{skill.name}</span>
              {skill.category && <span className="text-xs text-glimpse-dark-text mt-1">({skill.category})</span>}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default SkillsGrid;