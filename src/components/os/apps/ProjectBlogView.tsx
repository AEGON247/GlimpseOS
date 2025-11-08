import React from 'react';
import styled from '@emotion/styled';
import type { GlimpseTheme } from '../../../theme';
import type { ProjectData } from '../../../types/os'; // Import your ProjectData type
import { FaGithub, FaExternalLinkAlt, FaArrowLeft } from 'react-icons/fa';

// --- Styled Components ---

const BlogContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  padding: 0 1rem; /* Add some padding */
`;

const BlogHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-shrink: 0;
`;

const BackButton = styled.button<{ theme?: GlimpseTheme }>`
  background: ${props => props.theme.colors.blue}B3;
  border: 1px solid ${props => props.theme.colors.border};
  color: ${props => props.theme.colors.textLight};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 1.25rem;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.theme.colors.surface};
    border-color: ${props => props.theme.colors.blue};
    color: ${props => props.theme.colors.blue};
  }
`;

const BlogTitle = styled.h2`
  font-size: 1.75rem;
  font-weight: 700;
  color: ${props => props.theme.colors.blue};
`;

const BlogContent = styled.div`
  flex-grow: 1;
  overflow-y: auto; /* Handled by os-scrollable */
  padding-right: 0.5rem;
`;

const BlogImage = styled.img`
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  border-radius: 0.5rem;
  border: 1px solid ${props => props.theme.colors.border};
  margin-bottom: 1.5rem;
`;

const BlogText = styled.p`
  font-size: 1rem;
  line-height: 1.7;
  color: ${props => props.theme.colors.textDark};
  margin-bottom: 1.5rem;
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const TechTag = styled.span`
  display: inline-block;
  background-color: ${props => props.theme.colors.bgDark};
  color: ${props => props.theme.colors.blue};
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-family: ${props => props.theme.fonts.mono};
`;

const LinkContainer = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: auto; /* Pushes to the bottom */
`;

const CardLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: ${props => props.theme.colors.surface}B3; /* 70% opacity */
  color: ${props => props.theme.colors.textLight};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${props => props.theme.colors.blue};
    color: ${props => props.theme.colors.bgDark};
  }
`;

// --- Component ---

interface ProjectBlogProps {
  project: ProjectData;
  onBack: () => void; // Function to go back to the grid
}

const ProjectBlogView: React.FC<ProjectBlogProps> = ({ project, onBack }) => {
  return (
    <BlogContainer>
      <BlogHeader>
        <BackButton onClick={onBack} title="Go Back" className="os-interactable">
          <FaArrowLeft />
        </BackButton>
        <BlogTitle>{project.title}</BlogTitle>
      </BlogHeader>

      <BlogContent className="os-scrollable">
        <BlogImage src={project.imageUrl} alt={project.title} />
        
        <TechStack>
          {project.techStack.map(tech => (
            <TechTag key={tech}>{tech}</TechTag>
          ))}
        </TechStack>

        <BlogText>{project.description}</BlogText>

        <LinkContainer>
          {project.link !== '#' && (
            <CardLink href={project.link} target="_blank" rel="noopener noreferrer" className="os-interactable">
              <FaExternalLinkAlt />
              View Live
            </CardLink>
          )}
          {project.githubLink !== '#' && (
            <CardLink href={project.githubLink} target="_blank" rel="noopener noreferrer" className="os-interactable">
              <FaGithub />
              View Code
            </CardLink>
          )}
        </LinkContainer>
      </BlogContent>
    </BlogContainer>
  );
};

export default ProjectBlogView;