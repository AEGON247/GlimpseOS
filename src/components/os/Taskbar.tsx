import React, { useState, useEffect } from 'react';
import { useOsStore } from './OsContext';
import { motion, AnimatePresence } from 'framer-motion';
import type { AppId } from '../../types/os';
import { IoHomeOutline } from 'react-icons/io5';
import styled from '@emotion/styled';
import type { GlimpseTheme } from '../../theme';

// --- Styled Components ---

const TaskbarContainer = styled.div<{ theme?: GlimpseTheme }>`
  position: absolute; /* Changed from fixed */
  bottom: 0;
  left: 0;
  right: 0;
  height: 3rem; /* h-12 */
  background-color: ${props => props.theme.colors.surface};
  backdrop-filter: blur(10px);
  border-top: 1px solid ${props => props.theme.colors.border};
  display: flex;
  align-items: center;
  padding: 0 1rem;
  z-index: 9999;
  justify-content: space-between;
`;

const StartButton = styled.button<{ theme?: GlimpseTheme }>`
  /* --- FIX 2: Remove default browser button styling --- */
  background: transparent;
  border: none;
  /* --- End Fix --- */

  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem; /* w-10 */
  height: 2.5rem; /* h-10 */
  border-radius: 0.375rem; /* rounded-md */
  transition: background-color 0.15s ease;
  
  color: ${props => props.theme.colors.blue}; 
  font-size: 1.25rem; /* text-xl */

  &:hover {
    background-color: ${props => props.theme.colors.blue}30; /* 30 = ~18% opacity */
  }
`;

const AppIconContainer = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: center;
  height: 100%;
  gap: 0.5rem; /* space-x-2 */
`;

const TaskbarButton = styled(motion.button)<{ isActive?: boolean; isRunning?: boolean; theme?: GlimpseTheme }>`
  /* --- FIX 2: Remove default browser button styling --- */
  background: transparent;
  border: none;
  /* --- End Fix --- */

  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 0.5rem; /* p-2 */
  border-radius: 0.375rem; /* rounded-md */
  transition: background-color 0.15s ease;
  position: relative;
  height: 100%;
  min-width: 40px;
  background-color: ${props => 
    props.isActive ? `${props.theme.colors.blue}80` : // 80 = 50% opacity
    props.isRunning ? `${props.theme.colors.surface}B3` : // B3 = 70% opacity
    'transparent'};
  
  &:hover {
    background-color: ${props => !props.isActive && `${props.theme.colors.blue}30`};
  }
`;

const AppIconImage = styled.img`
  width: 1.5rem; /* w-6 */
  height: 1.5rem; /* h-6 */
`;

const RunningIndicator = styled.span<{ isActive?: boolean; theme?: GlimpseTheme }>`
  position: absolute;
  bottom: 4px;
  width: ${props => (props.isActive ? '1.5rem' : '0.25rem')}; /* w-6 or w-1 */
  height: 0.25rem; /* h-1 */
  border-radius: 9999px;
  background-color: ${props => props.isActive ? props.theme.colors.blue : props.theme.colors.textDark};
  transition: all 0.2s ease;
`;

const SystemTray = styled.div`
  margin-left: auto; /* ml-auto */
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  background-color: ${props => props.theme.colors.surface}80; /* 80 = 50% opacity */
  padding: 0.25rem 0.75rem; /* px-3 py-1 */
  border-radius: 0.375rem; /* rounded-md */
  color: ${props => props.theme.colors.textDark};
  font-size: 0.75rem; /* text-xs */
  white-space: nowrap;
`;

const StartMenu = styled(motion.div)<{ theme?: GlimpseTheme }>`
  position: absolute;
  bottom: 3.5rem; /* bottom-14 */
  left: 50%;
  transform: translateX(-50%);
  width: 20rem; /* w-80 */
  height: 24rem; /* h-96 */
  background-color: ${props => props.theme.colors.surface};
  backdrop-filter: blur(10px);
  border-radius: 0.5rem; /* rounded-lg */
  box-shadow: ${props => props.theme.shadows.xl};
  border: 1px solid ${props => props.theme.colors.border};
  padding: 1rem;
  display: flex;
  flex-direction: column;
`;

const StyledList = styled.ul`
  list-style: none;
  padding-left: 0;
`;

const StartMenuButton = styled.button<{ theme?: GlimpseTheme }>`
  /* --- FIX 2: Remove default browser button styling --- */
  background: transparent;
  border: none;
  /* --- End Fix --- */

  display: flex;
  align-items: center;
  gap: 0.75rem; /* space-x-3 */
  width: 100%;
  padding: 0.5rem; /* p-2 */
  border-radius: 0.375rem; /* rounded-md */
  transition: background-color 0.15s ease;
  color: ${props => props.theme.colors.textLight};
  text-align: left; /* Ensure text aligns left */

  &:hover {
    background-color: ${props => props.theme.colors.blue}30;
  }
`;

const StartMenuIconImage = styled.img`
  width: 1.25rem; /* w-5 */
  height: 1.25rem; /* h-5 */
`;

// --- Component ---

const Taskbar: React.FC = () => {
  const { 
    openWindows, 
    taskbarApps, 
    openApp, 
    focusWindow, 
    restoreWindow, 
    allApps, 
    activeWindowId, 
    minimizeWindow 
  } = useOsStore();
  
  const [showStartMenu, setShowStartMenu] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    // Update time every second
    const timerId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(timerId);
  }, []);

  const getAppById = (appId: AppId) => allApps.find(app => app.id === appId);

  const handleTaskbarIconClick = (appId: AppId) => {
    const existingWindow = openWindows.find(win => win.appId === appId);
    
    if (existingWindow) {
      if (existingWindow.minimized) {
        restoreWindow(existingWindow.id);
      } else if (existingWindow.id === activeWindowId) {
        minimizeWindow(existingWindow.id);
      } else {
        focusWindow(existingWindow.id);
      }
    } else {
      openApp(appId);
    }
  };

  const formattedTime = currentDateTime.toLocaleString('en-US', {
    hour: '2-digit', minute: '2-digit', hour12: true,
  });
  const formattedDate = currentDateTime.toLocaleString('en-US', {
    day: '2-digit', month: '2-digit', year: 'numeric'
  });

  return (
    <>
      {/* Click-away catcher for start menu */}
      {showStartMenu && (
        <div 
          className="fixed inset-0 z-[9998]" // Sits just below taskbar
          onClick={() => setShowStartMenu(false)}
        />
      )}

      <TaskbarContainer>
        {/* Start Button */}
        <StartButton
          className="os-interactable"
          onClick={(e: React.MouseEvent) => {
            e.stopPropagation(); // Stop click from propagating
            setShowStartMenu(!showStartMenu);
          }}
          title="Start Menu"
        >
          <IoHomeOutline className="text-xl" />
        </StartButton>

        {/* Taskbar Pinned and Running Apps */}
        <AppIconContainer>
          {taskbarApps.map(appId => {
            const app = getAppById(appId);
            if (!app) return null;
            
            const isRunning = openWindows.some(win => win.appId === appId);
            const isActive = openWindows.some(win => win.appId === appId && win.id === activeWindowId && !win.minimized);

            return (
              <TaskbarButton
                key={app.id}
                isActive={isActive}
                isRunning={isRunning}
                className="os-interactable"
                onClick={() => handleTaskbarIconClick(app.id)}
                whileTap={{ scale: 0.95 }}
                title={app.name}
              >
                <AppIconImage src={app.icon} alt={app.name} />
                {isRunning && (
                  <RunningIndicator isActive={isActive} />
                )}
              </TaskbarButton>
            );
          })}
        </AppIconContainer>

        {/* System Tray (Date/Time) */}
        <SystemTray className="ml-auto flex flex-col items-end">
          <div>{formattedTime}</div>
          <div>{formattedDate}</div>
        </SystemTray>

        {/* Start Menu Overlay */}
        <AnimatePresence>
          {showStartMenu && (
            <StartMenu
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              <h3 className="text-lg font-bold text-os-text-light mb-4 px-2">Start Menu</h3>
              <StyledList className="flex flex-col space-y-2 os-scrollable pr-2 overflow-y-auto">
                {allApps.map(app => (
                  <li key={`start-${app.id}`}>
                    <StartMenuButton
                      className="os-interactable"
                      onClick={() => {
                        openApp(app.id);
                        setShowStartMenu(false);
                      }}
                    >
                      <StartMenuIconImage src={app.icon} alt={app.name} />
                      <span>{app.name}</span>
                    </StartMenuButton>
                  </li>
                ))}
              </StyledList>
            </StartMenu>
          )}
        </AnimatePresence>
      </TaskbarContainer>
    </>
  );
};

export default Taskbar;