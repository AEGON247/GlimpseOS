import React from 'react'; // <-- FIX: 'React' is needed for useState
import styled from '@emotion/styled';
import { useOsStore } from '../OsContext'; // Import the store
// FIX: Removed unused icons, kept the ones that are used.
import { IoColorPaletteOutline, IoImageOutline, IoMoonOutline, IoSunnyOutline } from 'react-icons/io5';
import type { GlimpseTheme } from '../../../theme'; // Import theme type for styled component

// --- Styled Components ---

const AppWindow = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  color: ${props => props.theme.colors.textLight};
`;

const Header = styled.h2`
  font-size: 1.5rem; /* text-2xl */
  font-weight: 700; /* font-bold */
  color: ${props => props.theme.colors.blue};
  margin-bottom: 1rem; /* mb-4 */
`;

const Content = styled.div`
  flex-grow: 1;
  overflow-y: auto; /* Handled by os-scrollable */
  padding-right: 0.5rem; /* pr-2 */
`;

const SettingsSection = styled.div`
  margin-bottom: 2rem;
`;

const SectionHeader = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: ${props => props.theme.colors.textLight};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const OptionRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  background-color: ${props => props.theme.colors.surface}80;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 0.375rem;
  margin-bottom: 0.5rem;
`;

const OptionLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.9rem;
`;

// --- Switch Toggle ---
const ToggleTrack = styled.div<{ isActive: boolean; theme?: GlimpseTheme }>`
  position: relative;
  display: inline-block;
  width: 50px;
  height: 28px;
  border-radius: 28px;
  background-color: ${props => (props.isActive ? props.theme.colors.blue : '#555')};
  cursor: pointer;
  transition: background-color 0.4s ease;

  &:before {
    position: absolute;
    content: "";
    height: 20px;
    width: 20px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: transform 0.4s ease;
    border-radius: 50%;
    transform: ${props => (props.isActive ? 'translateX(22px)' : 'translateX(0)')};
  }
`;
// --- End Switch ---

const ColorGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem; /* gap-3 */
`;

const ColorButton = styled.button<{ color: string; isActive: boolean; theme?: GlimpseTheme }>`
  background: transparent;
  border: none;

  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${props => props.color};
  cursor: pointer;
  border: 3px solid ${props => (props.isActive ? props.theme.colors.blue : 'transparent')};
  box-shadow: ${props => (props.isActive ? `0 0 10px ${props.theme.colors.blue}` : 'none')};
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

// --- Component ---

interface AppProps {
  windowId: string;
}

// FIX: Corrected the function definition syntax
const SettingsApp: React.FC<AppProps> = ({ windowId: _windowId }) => {
  // --- Connect to global state ---
  const { 
    isDarkMode, 
    toggleDarkMode, // This variable is now used
    accentColorOverlay, 
    setAccentColorOverlay 
  } = useOsStore();
  
  // FIX: Rename 'setWallpaper' to '_setWallpaper' to silence warning
  const [wallpaper, _setWallpaper] = React.useState('w11-bg-light.png'); 
  const accentColors = ['#0078D4', '#BF00FF', '#10B981', '#FFC300', '#E74C3C'];

  const handleColorClick = (color: string) => {
    if (accentColorOverlay === color) {
      setAccentColorOverlay(null);
    } else {
      setAccentColorOverlay(color);
    }
  };

  return (
    // FIX: All these components are now "used"
    <AppWindow>
      <Header>Personalization</Header>
      <Content className="os-scrollable">
        
        <SettingsSection>
          <SectionHeader><IoMoonOutline /> Theme</SectionHeader>
          <OptionRow>
            <OptionLabel>
              {isDarkMode ? <IoMoonOutline /> : <IoSunnyOutline />}
              <span>{isDarkMode ? 'Dark Mode (Overlay)' : 'Light Mode'}</span>
            </OptionLabel>
            <ToggleTrack
              isActive={isDarkMode}
              onClick={toggleDarkMode} // <-- 'toggleDarkMode' is now used
              className="os-interactable"
              role="switch"
              aria-checked={isDarkMode}
            />
          </OptionRow>
        </SettingsSection>

        <SettingsSection>
          <SectionHeader><IoColorPaletteOutline /> Accent Color (Overlay)</SectionHeader>
          <ColorGrid>
            {accentColors.map(color => (
              <ColorButton
                key={color}
                color={color}
                isActive={accentColorOverlay === color}
                onClick={() => handleColorClick(color)}
                title={`Set accent to ${color}`}
                className="os-interactable"
              />
            ))}
          </ColorGrid>
        </SettingsSection>
        
        <SettingsSection>
          <SectionHeader><IoImageOutline /> Desktop</SectionHeader>
          {/* FIX: Properly closed the OptionRow tag */}
          <OptionRow>
            <OptionLabel>Current Wallpaper</OptionLabel>
            <span className="text-sm font-mono text-os-text-dark">{wallpaper}</span>
          </OptionRow>
        </SettingsSection>
        
      </Content>
    </AppWindow>
  );
};

export default SettingsApp;