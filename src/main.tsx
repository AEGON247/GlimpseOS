import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

import { ThemeProvider, Global, css } from '@emotion/react'
import { glimpseTheme } from './theme'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={glimpseTheme}>
      <Global
        styles={css`
          body {
            background-color: ${glimpseTheme.colors.bgDark};
            color: ${glimpseTheme.colors.textLight};
            font-family: ${glimpseTheme.fonts.sans};
            overflow: hidden;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            
          }

          /* Hide cursor for interactive elements too */
          body a, body button, body .os-interactable {
            cursor: none;
          }
          
          .os-scrollable::-webkit-scrollbar {
            width: 8px;
            height: 8px;
          }
          .os-scrollable::-webkit-scrollbar-track {
            background: rgba(60, 60, 60, 0.5);
            border-radius: 4px;
          }
          .os-scrollable::-webkit-scrollbar-thumb {
            background-color: ${glimpseTheme.colors.blue};
            border-radius: 4px;
          }
        `}
      />
      <App />
    </ThemeProvider>
  </StrictMode>,
)