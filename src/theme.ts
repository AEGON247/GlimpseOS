// src/theme.ts

// This is your new "tailwind.config.js"
export const glimpseTheme = {
  colors: {
    bgDark: '#1a1a1a',
    bgLight: '#2b2b2b',
    blue: '#0078D4',
    textLight: '#f0f0f0',
    textDark: '#b0b0b0',
    surface: 'rgba(45, 45, 45, 0.8)',
    border: 'rgba(100, 100, 100, 0.3)',
    accentGreen: '#10b981',
    accentRed: '#ef4444',
  },
  fonts: {
    sans: 'Segoe UI, Inter, sans-serif',
    mono: 'Cascadia Code, Fira Code, monospace',
  },
  shadows: {
    md: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)',
    lg: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)',
    xl: '0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)',
  }
};

// This type is for TypeScript to understand your theme
export type GlimpseTheme = typeof glimpseTheme;

// This tells Emotion's 'styled' function what your theme looks like
// (You must create this file)
// Create 'src/emotion.d.ts' and paste the content from the next step into it