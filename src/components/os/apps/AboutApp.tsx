import React from 'react';
import styled from '@emotion/styled';

// --- Styled Components ---

const AppWindow = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
`;

const Content = styled.div`
  flex-grow: 1;
  overflow-y: auto; /* Handled by os-scrollable */
  padding-right: 0.5rem; /* pr-2 */
`;

const Header = styled.h2`
  font-size: 1.5rem; /* text-2xl */
  font-weight: 700; /* font-bold */
  color: ${props => props.theme.colors.blue};
  margin-bottom: 1rem; /* mb-4 */
`;

const Paragraph = styled.p`
  margin-bottom: 1rem; /* mb-4 */
  color: ${props => props.theme.colors.textDark};
  line-height: 1.6;
`;

const Footer = styled.div`
  margin-top: 1rem; /* mt-4 */
  padding-top: 1rem; /* pt-4 */
  border-top: 1px solid ${props => props.theme.colors.border};
  font-size: 0.75rem; /* text-xs */
  color: ${props => props.theme.colors.textDark};
`;

// --- Component ---

interface AppProps {
  windowId: string;
}

const AboutApp: React.FC<AppProps> = ({ windowId: _windowId }) => { // Rename unused prop
  return (
    <AppWindow>
      <Content className="os-scrollable">
        <Header>About Sachin Mehta</Header>
        <Paragraph>
          I am Sachin Mehta, a passionate and innovative developer specializing in building immersive digital experiences.
          With a strong foundation in modern web technologies, I love crafting clean, efficient, and visually appealing applications.
        </Paragraph>
        <Paragraph>
          This "Glimpse OS" portfolio is a demonstration of my dedication to creating unique user interfaces,
          combining aesthetics with deep functionality to offer an engaging journey through my work.
        </Paragraph>
        <Paragraph>
          My technical expertise includes React, TypeScript, Go, Node.js, and modern animation libraries like GSAP and Framer Motion. I am always exploring new tools and techniques to push the boundaries of web development.
        </Paragraph>
        <Paragraph>
          Feel free to explore the other "apps" in this OS to see my projects, review my resume, or get in touch!
        </Paragraph>
      </Content>
      <Footer>
        App Version: 1.0.0 (Build 20240320) | Window ID: {_windowId}
      </Footer>
    </AppWindow>
  );
};

export default AboutApp;