import React, { useEffect, useRef, useState, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { ProjectData } from '../../types/os';
import ProjectDetailCard from './ProjectDetailCard';

gsap.registerPlugin(ScrollTrigger);

interface GitGraphProps {
  projects: ProjectData[];
  maxNodes?: number;
}

const GitGraphSection: React.FC<GitGraphProps> = ({ projects, maxNodes = 5 }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  // Memoize project nodes for consistent layout
  const projectNodes = useMemo(() => {
    // This is a simplified layout. A real Git graph would calculate positions based on branch logic.
    // For now, distribute them vertically.
    return projects.slice(0, maxNodes).map((project, index) => ({
      ...project,
      x: index % 2 === 0 ? 30 : 70, // Alternate left/right for visual interest
      y: (index + 0.5) * (100 / maxNodes), // Vertical position in percentage
    }));
  }, [projects, maxNodes]);

  useEffect(() => {
    if (!sectionRef.current || !svgRef.current) return;

    const svg = svgRef.current;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top center", // When top of section hits center of viewport
        end: "bottom center", // When bottom of section leaves center of viewport
        scrub: 1, // Smoothly link animation to scroll
        // markers: true, // For debugging scroll trigger
      }
    });

    // Animate the SVG paths (conceptual, actual paths need to be defined)
    // Here, we'll draw placeholder paths
    // You'd generate these paths dynamically or use your Illustroke SVGs
    const mainBranchPath = "M 50 0 V 100"; // Simple vertical path
    const branch1Path = "M 30 20 C 30 30, 50 30, 50 40"; // Example curve
    const branch2Path = "M 70 60 C 70 70, 50 70, 50 80"; // Example curve

    // Placeholder path elements
    const createPath = (d: string, stroke: string, id: string) => {
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute("d", d);
      path.setAttribute("stroke", stroke);
      path.setAttribute("stroke-width", "2");
      path.setAttribute("fill", "none");
      path.setAttribute("class", "git-path"); // Add class for selection
      path.setAttribute("id", id);
      svg.appendChild(path);
      return path;
    };

    const paths = [
      createPath(mainBranchPath, 'url(#blueGradient)', 'main-branch'),
      createPath(branch1Path, 'url(#purpleGradient)', 'branch-1'),
      createPath(branch2Path, 'url(#blueGradient)', 'branch-2')
    ];

    paths.forEach(path => {
      // For each path, animate its stroke-dashoffset to draw it in
      const length = path.getTotalLength();
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
      tl.to(path, { strokeDashoffset: 0, duration: 1.5, ease: "none" }, "<");
    });

    // Animate the nodes
    projectNodes.forEach((node, _index) => {
      const nodeId = `node-${node.id}`;
      // Animate node opacity and scale as it appears
      tl.from(`#${nodeId}`, { opacity: 0, scale: 0.5, ease: "back.out(1.7)", duration: 0.8 }, `<+0.2`);
    });

    // Cleanup for GSAP ScrollTrigger
    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      svg.innerHTML = ''; // Clear dynamically added paths
    };
  }, [projectNodes]); // Rerun if projects change

  const handleNodeClick = (project: ProjectData) => {
    setSelectedProject(project);
    gsap.to(window, {
      duration: 0.8,
      scrollTo: {
        y: sectionRef.current?.offsetTop || 0,
        offsetY: 100 // Adjust to show the section clearly
      },
      ease: "power2.inOut",
      onComplete: () => {
        // Optionally animate the detail card in
        gsap.fromTo("#project-detail-card",
          { opacity: 0, y: 50, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "back.out(1.7)" }
        );
      }
    });
  };

  const closeProjectDetails = () => {
    gsap.to("#project-detail-card", {
      opacity: 0, y: 50, scale: 0.9, duration: 0.3, ease: "power2.in",
      onComplete: () => setSelectedProject(null)
    });
  };


  return (
    <section id="git-graph-viz" ref={sectionRef} className="relative min-h-screen py-20 bg-glimpse-bg text-glimpse-text overflow-hidden">
      <h2 className="text-4xl font-bold text-center mb-16 text-glimpse-blue z-20 sticky top-20 mix-blend-screen hover-target">
        My Development Journey
      </h2>

      <div className="relative w-full h-[60vh] max-w-6xl mx-auto z-10">
        <svg ref={svgRef} className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
          <defs>
            {/* Linear Gradient for paths */}
            <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00FFFF" stopOpacity="0"/>
              <stop offset="50%" stopColor="#00FFFF" stopOpacity="1"/>
              <stop offset="100%" stopColor="#00FFFF" stopOpacity="0"/>
            </linearGradient>
            <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#BF00FF" stopOpacity="0"/>
              <stop offset="50%" stopColor="#BF00FF" stopOpacity="1"/>
              <stop offset="100%" stopColor="#BF00FF" stopOpacity="0"/>
            </linearGradient>

            {/* Filter for node glow */}
            <filter id="nodeGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur"/>
              <feFlood floodColor="#00FFFF" floodOpacity="1" result="color"/>
              <feComposite in="color" in2="blur" operator="in" result="glow"/>
              <feMerge>
                <feMergeNode in="glow"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Render Nodes */}
          {projectNodes.map((project) => (
            <g
              key={project.id}
              id={`node-${project.id}`}
              className="cursor-pointer hover-target"
              onClick={() => handleNodeClick(project)}
            >
              {/* Glow effect */}
              <circle
                cx={project.x} cy={project.y} r="3" fill="url(#blueGradient)"
                className="opacity-50 blur-sm" style={{filter: 'url(#nodeGlow)'}}
              />
              {/* Main node dot */}
              <circle
                cx={project.x} cy={project.y} r="2" fill="#00FFFF"
                className="transition-transform duration-200 hover:scale-150"
              />
              {/* Optional text label */}
              <text
                x={project.x + (project.x > 50 ? -5 : 5)} // Adjust position based on node side
                y={project.y - 5}
                textAnchor={project.x > 50 ? "end" : "start"}
                fill="#E0E0E0"
                fontSize="2.5"
                className="opacity-0 transition-opacity duration-200 hover:opacity-100 font-mono"
              >
                {project.title}
              </text>
            </g>
          ))}
        </svg>
      </div>

      {selectedProject && (
        <ProjectDetailCard project={selectedProject} onClose={closeProjectDetails} />
      )}
    </section>
  );
};

export default GitGraphSection;