import React, { useRef, useEffect } from 'react';
import { Rnd } from 'react-rnd';
import { useOsStore } from './OsContext';
import { motion } from 'framer-motion';
import type { AppId } from '../../types/os';
import { IoClose, IoRemove, IoSquareOutline } from 'react-icons/io5';
import styled from '@emotion/styled';

// --- Styled Components ---

const WindowFrame = styled(motion.div)<{ isActive: boolean }>`
  background-color: ${props => props.theme.colors.surface};
  backdrop-filter: blur(12px);
  border-radius: 0.5rem; /* rounded-lg */
  box-shadow: ${props => props.theme.shadows.xl};
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  overflow: hidden;
  border: 1px solid ${props => (props.isActive ? props.theme.colors.blue : props.theme.colors.border)};
`;

const TitleBar = styled.div<{ isActive: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem; /* p-2 */
  border-bottom: 1px solid ${props => (props.isActive ? props.theme.colors.blue : props.theme.colors.border)};
  background-color: rgba(45, 45, 45, 0.7); /* bg-os-surface/70 */
  cursor: grab;
`;

const TitleInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem; /* space-x-2 */
  color: ${props => props.theme.colors.textLight};
`;

const TitleIcon = styled.img`
  width: 1rem; /* w-4 */
  height: 1rem; /* h-4 */
`;

const TitleText = styled.span`
  font-family: ${props => props.theme.fonts.sans};
  font-size: 0.875rem; /* text-sm */
  font-weight: 600; /* font-semibold */
`;

const WindowControls = styled.div`
  display: flex;
  gap: 0.25rem; /* space-x-1 */
`;

const ControlButton = styled.button`
  /* --- FIX: Remove default browser button styling --- */
  background: transparent;
  border: none;
  /* --- End Fix --- */

  padding: 0.25rem; /* p-1 */
  border-radius: 0.25rem; /* rounded */
  transition: background-color 0.15s ease;
  color: ${props => props.theme.colors.textLight};

  &:hover {
    background-color: rgba(100, 100, 100, 0.5); /* hover:bg-gray-700 */
  }

  &.close-btn:hover {
    background-color: ${props => props.theme.colors.accentRed};
    color: white;
  }
`;

const WindowContent = styled.div`
  flex-grow: 1; /* flex-grow */
  padding: 1rem; /* p-4 */
  overflow: auto;
  color: ${props => props.theme.colors.textDark};
`;

// --- Component ---

interface OsWindowProps {
  id: string;
  appId: AppId;
  title: string;
  icon: string;
  initialX: number;
  initialY: number;
  initialWidth: number;
  initialHeight: number;
  minimized: boolean;
  maximized: boolean;
  zIndex: number;
  children: React.ReactNode;
}

const OsWindow: React.FC<OsWindowProps> = ({
  id,
  appId: _appId, // Unused prop
  title,
  icon,
  initialX,
  initialY,
  initialWidth,
  initialHeight,
  minimized,
  maximized,
  zIndex,
  children,
}) => {
  const { closeWindow, minimizeWindow, maximizeWindow, restoreWindow, focusWindow, activeWindowId } = useOsStore();
  const isActive = activeWindowId === id;
  const windowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isActive) {
      focusWindow(id);
    }
  }, [id, isActive, focusWindow]);

  if (minimized) {
    return null;
  }

  return (
    <Rnd
      size={maximized ? { width: '100%', height: '100%' } : { width: initialWidth, height: initialHeight }}
      position={maximized ? { x: 0, y: 0 } : { x: initialX, y: initialY }}
      minWidth={300}
      minHeight={200}
      bounds="parent"
      dragHandleClassName="os-window-drag-handle" // Use this class name
      enableResizing={!maximized}
      disableDragging={maximized}
      onDragStart={() => focusWindow(id)}
      onResizeStart={() => focusWindow(id)}
      onResizeStop={(_e: MouseEvent | TouchEvent, _dir: any, _refToElement: HTMLElement, _d: { width: number, height: number }) => {
        // Here you would typically save the new size/position to the store
      }}
      className="absolute" // Rnd adds its own transforms
      style={{ zIndex: zIndex }}
    >
      <WindowFrame
        ref={windowRef}
        isActive={isActive}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        onClick={() => focusWindow(id)}
      >
        <TitleBar className="os-window-drag-handle" isActive={isActive}>
          <TitleInfo>
            <TitleIcon src={icon} alt={title} />
            <TitleText>{title}</TitleText>
          </TitleInfo>
          <WindowControls>
            <ControlButton onClick={() => minimizeWindow(id)} className="os-interactable" title="Minimize">
              <IoRemove />
            </ControlButton>
            <ControlButton onClick={() => (maximized ? restoreWindow(id) : maximizeWindow(id))} className="os-interactable" title={maximized ? "Restore Down" : "Maximize"}>
              <IoSquareOutline />
            </ControlButton>
            <ControlButton onClick={() => closeWindow(id)} className="os-interactable close-btn" title="Close">
              <IoClose />
            </ControlButton>
          </WindowControls>
        </TitleBar>

        <WindowContent className="os-scrollable">
          {children}
        </WindowContent>
      </WindowFrame>
    </Rnd>
  );
};

export default OsWindow;