// src/data/os-content.ts
import type { ProjectData, OsAppData, OsDesktopItem, DiscardedIdea } from '../types/os'; // <-- FIX: Removed 'AppId'
// FIX: Removed unused 'React' import
// import glimpseImg from 'src/assets/projectData/glimpseOS.png';
// import gitSmartImg from 'src/assets/projectData/gitSmart.png';
// import messiahImg from 'src/assets/projectData/messiah.png';
// Import your app components (create these placeholder files)
import AboutApp from '../components/os/apps/AboutApp';
import ProjectsApp from '../components/os/apps/ProjectsApp';
import ResumeApp from '../components/os/apps/ResumeApp';
import ContactApp from '../components/os/apps/ContactApp';
import SettingsApp from '../components/os/apps/SettingsApp';
import RecycleBinApp from '../components/os/apps/RecycleBinApp';


// Define your OS Applications
export const osApps: OsAppData[] = [
  {
    id: 'about',
    name: 'About Me',
    icon: '/os-icons/user-profile.svg', // Placeholder icon
    component: AboutApp,
    defaultSize: { width: 700, height: 500 },
  },
  {
    id: 'projects',
    name: 'My Projects',
    icon: '/os-icons/folder-projects.svg', // Placeholder icon
    component: ProjectsApp,
    defaultSize: { width: 900, height: 500 },
  },
  {
    id: 'resume',
    name: 'Resume.pdf',
    icon: '/os-icons/file-pdf.svg', // Placeholder icon
    component: ResumeApp,
    defaultSize: { width: 800, height: 550 },
  },
  {
    id: 'contact',
    name: 'Contact Me',
    icon: '/os-icons/mail.svg', // Placeholder icon
    component: ContactApp,
    defaultSize: { width: 600, height: 400 },
  },
  {
    id: 'settings',
    name: 'OS Settings',
    icon: '/os-icons/settings.svg', // Placeholder icon
    component: SettingsApp,
    defaultSize: { width: 600, height: 400 },
    isSystemApp: true,
  },
  {
    id: 'recycle-bin',
    name: 'Recycle Bin',
    icon: '/os-icons/recycle-bin-full.svg', // Placeholder icon
    component: RecycleBinApp,
    defaultSize: { width: 800, height: 500 },
    isSystemApp: true,
  },
];

// Define your desktop icons and their positions
export const desktopItems: OsDesktopItem[] = [
  {
    id: 'desktop-about',
    type: 'app',
    data: osApps.find(app => app.id === 'about')!,
    position: { x: 50, y: 50 },
  },
  {
    id: 'desktop-projects',
    type: 'app',
    data: osApps.find(app => app.id === 'projects')!,
    position: { x: 50, y: 150 },
  },
  {
    id: 'desktop-recycle-bin',
    type: 'app',
    data: osApps.find(app => app.id === 'recycle-bin')!,
    position: { x: 50, y: 250 },
  },
];

// Content for the Recycle Bin / Discarded Ideas
export const discardedIdeas: DiscardedIdea[] = [
  {
    id: 'idea-spaceweb',
    title: 'Space Web Explorer',
    description: 'An idea for a portfolio where navigation feels like exploring constellations. Each star is a project, connected by animated lines. Abandoned due to complexity vs. impact.',
    imageUrl: 'https://placehold.co/400x300/3A3A3A/00FFFF?text=Space+Web+Explorer',
    status: 'abandoned',
    tags: ['animation', 'd3.js', 'webgl'],
  },
  {
    id: 'idea-retro-terminal',
    title: 'Retro Terminal Portfolio',
    description: 'A command-line interface based portfolio, where users type commands to navigate and view content. Prototype built, but felt too niche for general audience.',
    imageUrl: 'https://placehold.co/400x300/3A3A3A/00FF00?text=Retro+Terminal',
    status: 'prototype',
    tags: ['cli', 'text-ui', 'bash'],
  },
];

// This placeholder data is needed by ProjectsApp.tsx
export const placeholderProjects: ProjectData[] = [
  {
    id: 'proj-glimpse-os',
    title: 'Glimpse OS (This Portfolio)',
    description: 'An immersive, OS-in-a-browser portfolio simulating a modern desktop environment. It features a draggable window manager, app launcher, global state management with Zustand, and a custom UI component library built with Emotion.js. This project is a testament to my passion for creating unique and highly interactive user interfaces.',
    imageUrl: '/assets/glimpseOS.png',
    link: '#', // You can change this to your live URL when deployed
    githubLink: 'https://github.com/AEGON247/GlimpseOS', // Replace with your actual repo
    techStack: ['React', 'TypeScript', 'Emotion.js', 'Framer Motion', 'Zustand', 'Vite'],
  },
  {
    id: 'proj-git-smart',
    title: 'git-smart (CLI Tool)',
    description: 'A command-line utility built in Go that automates the tedious 7-step Git workflow of syncing a feature branch with the default branch. The tool intelligently detects the default branch, stashes uncommitted changes, pulls the latest, rebases, and pops the stash, all in one command.',
    imageUrl: '/assets/gitSmart.png',
    link: 'https://github.com/AEGON247/git-smart', // Replace with your actual repo
    githubLink: 'https://github.com/AEGON247/git-smart', // Replace with your actual repo
    techStack: ['Go (Golang)', 'Cobra', 'CLI', 'Git'],
  },
  {
    id: 'proj-messiah',
    title: 'Messiah (Food Wastage Tracker)',
    description: 'A conceptual full-stack application for food detection, classification, and wastage tracking. Designed to help users monitor and reduce food waste, this project involved UI/UX design in Figma and planning for a complete system architecture.',
    imageUrl: '/assets/messiah.png',
    link: '#', // Use '#' for concept projects with no live link
    githubLink: '#', // Use '#' if no public repo
    techStack: ['Concept', 'UI/UX Design', 'Figma', 'Full-Stack Architecture'],
  },
];