import { create } from 'zustand';
// Import 'type' for all type-only imports
import type { OsWindow, OsAppData, AppId, DiscardedIdea } from '../../types/os';
// Import values (actual data and components)
import { osApps, discardedIdeas } from '../../data/os-content';
import React from 'react'; // <-- CRITICAL: Must import React to use React.createElement

interface OsState {
  openWindows: OsWindow[];
  taskbarApps: AppId[]; // Apps pinned to taskbar
  activeWindowId: string | null;
  maxZIndex: number;
  allApps: OsAppData[];
  discardedIdeas: DiscardedIdea[];
  
  // --- NEW STATE FOR SETTINGS ---
  isDarkMode: boolean;
  accentColorOverlay: string | null;
  // --- END NEW STATE ---

  openApp: (appId: AppId, customContent?: React.ReactNode) => void;
  closeWindow: (windowId: string) => void;
  minimizeWindow: (windowId: string) => void;
  maximizeWindow: (windowId: string) => void;
  restoreWindow: (windowId: string) => void;
  focusWindow: (windowId: string) => void;

  // --- NEW ACTIONS FOR SETTINGS ---
  toggleDarkMode: () => void;
  setAccentColorOverlay: (colorHex: string | null) => void;
  // --- END NEW ACTIONS ---
}

export const useOsStore = create<OsState>((set, get) => ({
  openWindows: [],
  taskbarApps: ['about', 'projects', 'resume', 'contact'], // Default pinned apps
  activeWindowId: null,
  maxZIndex: 100, // Initial Z-index
  allApps: osApps,
  discardedIdeas: discardedIdeas,

  // --- NEW STATE DEFAULTS ---
  isDarkMode: false,
  accentColorOverlay: null,
  // --- END NEW STATE DEFAULTS ---

  openApp: (appId, customContent = null) => {
    const { openWindows, allApps, maxZIndex, focusWindow, restoreWindow } = get();
    const app = allApps.find(a => a.id === appId);

    if (!app) {
      console.error(`App with ID ${appId} not found.`);
      return;
    }

    // 1. Check if window is already open but minimized
    const minimizedWindow = openWindows.find(win => win.appId === appId && win.minimized);
    if (minimizedWindow) {
      restoreWindow(minimizedWindow.id);
      return;
    }

    // 2. Check if window is already open and not minimized
    const existingWindow = openWindows.find(win => win.appId === appId && !win.minimized);
    if (existingWindow) {
      focusWindow(existingWindow.id);
      return;
    }

    // 3. If not open at all, create a new window
    const newZIndex = maxZIndex + 1;
    set({ maxZIndex: newZIndex }); 

    // Calculate initial position (centered)
    const defaultWidth = app.defaultSize?.width ?? 700;
    const defaultHeight = app.defaultSize?.height ?? 500;
    const initialX = app.defaultPosition?.x ?? (window.innerWidth / 2 - defaultWidth / 2);
    const initialY = app.defaultPosition?.y ?? (window.innerHeight / 2 - defaultHeight /2 - 50); 

    const windowId = `${appId}-${Date.now()}`;
    const newWindow: OsWindow = {
      id: windowId,
      appId: appId,
      title: app.name,
      icon: app.icon,
      minimized: false,
      maximized: false,
      zIndex: newZIndex,
      x: initialX,
      y: initialY,
      width: defaultWidth,
      height: defaultHeight,
      // Create the React element for the app's content
      content: customContent || React.createElement(app.component, { windowId: windowId }),
    };

    set(state => ({
      openWindows: [...state.openWindows, newWindow],
      activeWindowId: newWindow.id,
    }));
  },

  closeWindow: (windowId) => {
    set(state => ({
      openWindows: state.openWindows.filter(win => win.id !== windowId),
      activeWindowId: state.activeWindowId === windowId ? null : state.activeWindowId,
    }));
  },

  minimizeWindow: (windowId) => {
    set(state => ({
      openWindows: state.openWindows.map(win =>
        win.id === windowId ? { ...win, minimized: true, maximized: false } : win
      ),
      activeWindowId: state.activeWindowId === windowId ? null : state.activeWindowId,
    }));
  },

  maximizeWindow: (windowId) => {
    const { maxZIndex } = get();
    set(state => ({
      openWindows: state.openWindows.map(win =>
        win.id === windowId ? { ...win, maximized: true, minimized: false, zIndex: maxZIndex + 1 } : win
      ),
      maxZIndex: maxZIndex + 1,
      activeWindowId: windowId,
    }));
  },

  restoreWindow: (windowId) => {
    const { maxZIndex } = get();
    set(state => ({
      openWindows: state.openWindows.map(win =>
        win.id === windowId ? { ...win, minimized: false, maximized: false, zIndex: maxZIndex + 1 } : win
      ),
      maxZIndex: maxZIndex + 1,
      activeWindowId: windowId,
    }));
  },

  focusWindow: (windowId) => {
    const { openWindows, maxZIndex, activeWindowId } = get();
    
    // If it's already the active window, do nothing.
    if (windowId === activeWindowId) return;

    const newZIndex = maxZIndex + 1;

    set({
      openWindows: openWindows.map(win =>
        win.id === windowId ? { ...win, zIndex: newZIndex, minimized: false } : win
      ),
      activeWindowId: windowId,
      maxZIndex: newZIndex,
    });
  },

  // --- NEW ACTION IMPLEMENTATIONS ---
  toggleDarkMode: () => {
    set(state => ({ isDarkMode: !state.isDarkMode }));
  },
  
  setAccentColorOverlay: (colorHex) => {
    set({ accentColorOverlay: colorHex });
  },
}));