import React, { useState } from 'react';
import styled from '@emotion/styled';
// We import the project data directly from os-content
import { placeholderProjects } from '../../../data/os-content';
import type { ProjectData } from '../../../types/os'; // Import ProjectData type
import FolderIcon from '../FolderIcon'; // Import the new FolderIcon
import ProjectBlogView from './ProjectBlogView'; // Import the new Blog View

// --- Styled Components ---

const AppWindow = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Header = styled.h2`
  font-size: 1.5rem; /* text-2xl */
  font-weight: 700; /* font-bold */
  color: ${props => props.theme.colors.blue};
  margin-bottom: 1rem; /* mb-4 */
  flex-shrink: 0;
  padding: 0 1rem; /* Match blog view padding */
`;

const ContentGrid = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  padding: 1rem;
  display: flex; /* Use flex for wrapping grid */
  flex-wrap: wrap; /* Allow items to wrap */
  align-content: flex-start; /* Align items to the top */
  gap: 1.5rem; /* gap-6 */
`;

// --- Component ---

type ViewState = 'grid' | 'detail';

interface AppProps {
  windowId: string;
}

const ProjectsApp: React.FC<AppProps> = ({ windowId: _windowId }) => {
  // State to manage the view
  const [currentView, setCurrentView] = useState<ViewState>('grid');
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  const handleFolderDoubleClick = (project: ProjectData) => {
    setSelectedProject(project);
    setCurrentView('detail');
  };

  const handleBack = () => {
    setSelectedProject(null);
    setCurrentView('grid');
  };

  return (
    <AppWindow>
      {/* Conditionally render the header OR the blog view */}
      {currentView === 'grid' ? (
        <>
          <Header>My Projects</Header>
          <ContentGrid className="os-scrollable">
            {placeholderProjects.map(project => (
              <FolderIcon
                key={project.id}
                name={project.title}
                // Use a generic folder icon, or specify one in your project data
                icon="/os-icons/folder-projects.svg" 
                onDoubleClick={() => handleFolderDoubleClick(project)}
              />
            ))}
          </ContentGrid>
        </>
      ) : selectedProject ? (
        // Render the blog post view
        <ProjectBlogView project={selectedProject} onBack={handleBack} />
      ) : null}
    </AppWindow>
  );
};

export default ProjectsApp;