import React from 'react';
import styled from '@emotion/styled';
import type { GlimpseTheme } from '../../theme';

// --- Styled Components ---

const FolderContainer = styled.button<{ theme?: GlimpseTheme }>`
  background: transparent;
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 130px; /* Fixed width for grid consistency */
  height: 100px; /* Fixed height */
  padding: 0.5rem;
  border-radius: 0.375rem; /* rounded-md */
  cursor: pointer;
  transition: background-color 0.15s ease;
  color: ${props => props.theme.colors.textLight};

  &:hover {
    background-color: ${props => props.theme.colors.blue}30; /* 30 = ~18% opacity */
  }

  &:focus, &:focus-visible {
    outline: 2px solid ${props => props.theme.colors.blue};
    background-color: ${props => props.theme.colors.blue}30;
  }
`;

const FolderIconImage = styled.img`
  width: 4rem; /* w-16 */
  height: 4rem; /* h-16 */
  margin-bottom: 0.25rem;
`;

const FolderName = styled.span`
  font-family: ${props => props.theme.fonts.sans};
  font-size: 0.75rem; /* text-xs */
  font-weight: 500;
  text-align: center;
  /* Prevent long names from wrapping weirdly */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
`;

// --- Component ---

interface FolderIconProps {
  name: string;
  icon: string; // Path to the folder icon
  onDoubleClick: () => void;
}

const FolderIcon: React.FC<FolderIconProps> = ({ name, icon, onDoubleClick }) => {
  return (
    <FolderContainer onDoubleClick={onDoubleClick} className="os-interactable">
      <FolderIconImage src={icon} alt={name} draggable="false" />
      <FolderName>{name}</FolderName>
    </FolderContainer>
  );
};

export default FolderIcon;
