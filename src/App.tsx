import React, { useEffect } from 'react';
import { useOsStore } from './components/os/OsContext';
import CustomCursor from './components/os/CustomCursor';
import DesktopIcon from './components/os/DesktopIcon';
import OsWindow from './components/os/OsWindow';
import Taskbar from './components/os/Taskbar';
import { desktopItems } from './data/os-content';
import { AnimatePresence } from 'framer-motion';
import type { AppId } from './types/os';
import styled from '@emotion/styled';
import type { GlimpseTheme } from './theme'; // Import theme type for styled component

// --- Styled Components ---

const OsContainer = styled.div<{ theme?: GlimpseTheme }>`
  position: relative;
  width: 100vw;
  height: 100vh;
  max-width: 100%;
  max-height: 100%;

  /* --- FIX: Make container background transparent so wallpaper shows --- */
  background-color: transparent; 
  
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const BackgroundImage = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0; /* Stays at the bottom */
  background-size: cover;
  background-position: center;
  background-image: url('/os-icons/w11-bg-light.png'); 
`;

const Desktop = styled.div`
  position: relative;
  flex-grow: 1;
  z-index: 10; // Desktop icons are above the background
`;

// --- Overlays for Settings (Issues 1a & 1b) ---
const ThemeOverlay = styled.div<{ active: boolean }>`
  position: absolute;
  inset: 0;
  background-color: #000;
  opacity: ${props => (props.active ? 0.3 : 0)}; /* 30% black overlay */
  transition: opacity 0.5s ease;
  z-index: 5000; /* High z-index */
  pointer-events: none; /* Allows clicks to pass through */
`;

const ColorOverlay = styled.div<{ color: string | null }>`
  position: absolute;
  inset: 0;
  background-color: ${props => props.color || 'transparent'};
  opacity: ${props => (props.color ? 0.15 : 0)}; /* 15% color overlay */
  transition: opacity 0.5s ease, background-color 0.5s ease;
  z-index: 5001; /* Even higher z-index */
  pointer-events: none;
`;

// --- App Component ---

function App() {
  const { openWindows, openApp, focusWindow, isDarkMode, accentColorOverlay } = useOsStore();

  useEffect(() => {
    // Open a welcome app on load
    const timer = setTimeout(() => {
      openApp('about');
    }, 500); // 0.5s delay
    return () => clearTimeout(timer);
  }, [openApp]); 

  const handleDesktopDoubleClick = (appId: AppId) => {
    openApp(appId);
  };

  const handleDesktopClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).id === 'desktop-area') {
      focusWindow(""); 
    }
  };

  return (
    <OsContainer id="os-container">
      <BackgroundImage />
      {/* Add the overlays for Settings to work */}
      <ThemeOverlay active={isDarkMode} />
      <ColorOverlay color={accentColorOverlay??"#FFFFFF"} />
      
      <CustomCursor />

      <Desktop id="desktop-area" onClick={handleDesktopClick}>
        {/* Desktop Icons */}
        {desktopItems.map(item => (
          <DesktopIcon
            key={item.id}
            id={item.id}
            name={item.data.name}
            icon={item.data.icon}
            onDoubleClick={handleDesktopDoubleClick}
            appId={item.data.id as AppId}
            x={item.position.x}
            y={item.position.y}
          />
        ))}

        {/* Render Open Windows */}
        <AnimatePresence>
          {openWindows.map(win => (
            <OsWindow
              key={win.id}
              id={win.id}
              appId={win.appId}
              title={win.title}
              icon={win.icon}
              initialX={win.x}
              initialY={win.y}
              initialWidth={win.width}
              initialHeight={win.height}
              minimized={win.minimized}
              maximized={win.maximized}
              zIndex={win.zIndex}
            >
              {win.content} {/* The actual React component for the app */}
            </OsWindow>
          ))}
        </AnimatePresence>
      </Desktop>

      {/* Taskbar */}
      <Taskbar />
    </OsContainer>
  );
}

export default App;