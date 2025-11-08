import '@emotion/react';
import { GlimpseTheme } from './theme'; // Import your theme type

declare module '@emotion/react' {
  export interface Theme extends GlimpseTheme {}
}
