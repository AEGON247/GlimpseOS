// src/types/os.ts

export type AppId = 'about' | 'projects' | 'resume' | 'contact' | 'settings' | 'recycle-bin';

export interface OsAppData {
  id: AppId;
  name: string;
  icon: string; // Path to SVG/PNG icon
  component: React.FC<any>; // React component to render when app is opened
  isSystemApp?: boolean; // e.g., Recycle Bin
  defaultSize?: { width: number; height: number };
  defaultPosition?: { x: number; y: number };
}

export interface OsFolderData {
  id: string;
  name: string;
  icon: string; // Path to SVG/PNG icon
  contents: (OsAppData | OsFolderData)[]; // Folders can contain apps or other folders
}

export interface OsDesktopItem {
  id: string;
  type: 'app' | 'folder' | 'shortcut';
  data: OsAppData | OsFolderData | { id: string; name: string; icon: string; targetAppId: AppId }; // Shortcut targets an app
  position: { x: number; y: number }; // Relative position on desktop
}

export interface OsWindow {
  id: string; // Unique ID for the window instance
  appId: AppId; // The ID of the app this window belongs to
  title: string;
  icon: string;
  minimized: boolean;
  maximized: boolean;
  zIndex: number;
  // Position and size handled by react-resizable-and-movable, but initial state can be here
  x: number;
  y: number;
  width: number;
  height: number;
  content: React.ReactNode; // The actual component instance
}

export interface DiscardedIdea {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  status: 'idea' | 'prototype' | 'abandoned';
  tags: string[];
}