import React, { useRef, useEffect } from 'react';
import type { ProjectData } from '../../types/os';
import gsap from 'gsap';
import { FaGithub } from 'react-icons/fa'; // Example icon

interface ProjectDetailCardProps {
  project: ProjectData;
  onClose: () => void;
}

const ProjectDetailCard: React.FC<ProjectDetailCardProps> = ({ project, onClose }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animation for card entry (already handled by GitGraphSection, but good to have a dedicated hook)
    if (cardRef.current) {
      gsap.fromTo(cardRef.current,
        { opacity: 0, y: 50, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "back.out(1.7)" }
      );
    }
  }, [project]);

  return (
    <div id="project-detail-card" ref={cardRef} className="fixed inset-0 bg-glimpse-bg bg-opacity-80 backdrop-blur-md flex items-center justify-center p-8 z-40">
      <div className="bg-glimpse-component-bg border border-glimpse-blue p-8 rounded-lg shadow-2xl max-w-3xl w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-glimpse-blue hover:text-glimpse-purple text-2xl hover-target transition-colors"
        >
          &times;
        </button>
        
        <img src={project.imageUrl} alt={project.title} className="w-full h-64 object-cover rounded-md mb-6 border border-glimpse-dark-text" />
        <h3 className="text-3xl font-bold text-glimpse-blue mb-3">{project.title}</h3>
        <p className="text-glimpse-dark-text mb-6 text-lg">{project.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {project.techStack.map(tech => (
            <span key={tech} className="px-3 py-1 bg-gray-800 text-glimpse-text text-xs rounded-full border border-glimpse-dark-text">
              {tech}
            </span>
          ))}
        </div>

        <div className="flex justify-start gap-4">
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 bg-glimpse-blue text-glimpse-bg font-bold rounded hover:bg-opacity-80 transition-colors hover-target"
          >
            View Live
          </a>
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 border-2 border-glimpse-blue text-glimpse-blue rounded flex items-center gap-2
                         hover:bg-glimpse-blue hover:text-glimpse-bg transition-colors hover-target"
            >
              <FaGithub /> GitHub
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailCard;