import React from 'react';
import styled from '@emotion/styled';
import { FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa';
import { IoMail } from 'react-icons/io5';

// --- Styled Components ---

const AppWindow = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
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

const ContactList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ContactLink = styled.a`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background-color: ${props => props.theme.colors.surface}80;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 0.5rem;
  color: ${props => props.theme.colors.textLight};
  text-decoration: none;
  font-weight: 600;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${props => props.theme.colors.blue};
    color: ${props => props.theme.colors.blue};
    transform: translateX(4px);
    box-shadow: ${props => props.theme.shadows.lg};
  }

  svg {
    font-size: 1.75rem;
  }
`;

// --- Component ---

interface AppProps {
  windowId: string;
}

// Placeholder Links (Replace with your actual links)
const socials = {
  linkedin: "https://www.linkedin.com/in/sachin-mehta-785704272/",
  github: "https://github.com/AEGON247",
  instagram: "https://www.instagram.com/sachin.mehta_247",
  gmail: "mailto:sachinmehta247@gmail.com"
};

const ContactApp: React.FC<AppProps> = ({ windowId: _windowId }) => {
  return (
    <AppWindow>
      <Header>Get In Touch</Header>
      <Content className="os-scrollable">
        <ContactList>
          
          <li>
            <ContactLink href={socials.linkedin} target="_blank" rel="noopener noreferrer" className="os-interactable">
              <FaLinkedin style={{ color: '#0A66C2' }} />
              <span>LinkedIn</span>
            </ContactLink>
          </li>
          
          <li>
            <ContactLink href={socials.github} target="_blank" rel="noopener noreferrer" className="os-interactable">
              <FaGithub style={{ color: '#FFFFFF' }} />
              <span>GitHub</span>
            </ContactLink>
          </li>
          
          <li>
            <ContactLink href={socials.gmail} target="_blank" rel="noopener noreferrer" className="os-interactable">
              <IoMail style={{ color: '#EA4335' }} />
              <span>Email</span>
            </ContactLink>
          </li>
          
          <li>
            <ContactLink href={socials.instagram} target="_blank" rel="noopener noreferrer" className="os-interactable">
              <FaInstagram style={{ color: '#E1306C' }} />
              <span>Instagram</span>
            </ContactLink>
          </li>

        </ContactList>
      </Content>
    </AppWindow>
  );
};

export default ContactApp;