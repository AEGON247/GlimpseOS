import React from 'react';
import { motion } from 'framer-motion';
import { useOsStore } from './OsContext';
import type { AppId } from '../../types/os';
import styled from '@emotion/styled';

// --- Styled Components ---

const IconWrapper = styled(motion.div)`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0.5rem; /* p-2 */
  text-align: center;
  user-select: none;
  cursor: pointer;
  width: 5rem; /* w-20 */
  height: 5rem; /* h-20 */
  border-radius: 0.375rem; /* rounded-md */
  transition: background-color 0.1s ease-in-out;

  &:hover {
    background-color: ${props => props.theme.colors.blue + '4D'}; /* bg-os-blue/30 */
  }
`;

const IconImage = styled.img`
  width: 2.5rem; /* w-10 */
  height: 2.5rem; /* h-10 */
  margin-bottom: 0.25rem; /* mb-1 */
  -webkit-user-drag: none; /* Disables image dragging */
`;

const IconName = styled.span`
  font-size: 0.75rem; /* text-xs */
  color: ${props => props.theme.colors.textLight};
  font-family: ${props => props.theme.fonts.sans};
  word-break: break-word;
`;

// --- Component ---

interface DesktopIconProps {
  id: string;
  name: string;
  icon: string;
  onDoubleClick: (appId: AppId) => void;
  appId: AppId;
  x: number;
  y: number;
}

const DesktopIcon: React.FC<DesktopIconProps> = ({ 
  id: _id, // Rename unused id
  name, 
  icon, 
  onDoubleClick, 
  appId, 
  x, 
  y 
}) => {
  const { openWindows, focusWindow, restoreWindow } = useOsStore();

  const handleClick = (_e: React.MouseEvent) => {
    // Single click logic (e.g., selection)
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const existingWindow = openWindows.find(win => win.appId === appId);
    if (existingWindow && existingWindow.minimized) {
      restoreWindow(existingWindow.id);
      focusWindow(existingWindow.id);
    } else {
      onDoubleClick(appId);
    }
  };

  return (
    <IconWrapper
      className="os-interactable" // For cursor hover effect
      style={{ left: x, top: y }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
    >
      <IconImage src={icon} alt={name} draggable="false" />
      <IconName>{name}</IconName>
    </IconWrapper>
  );
};

export default DesktopIcon;