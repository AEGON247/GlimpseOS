import React from 'react';
import styled from '@emotion/styled';

// --- Styled Components ---

const AppWindow = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Header = styled.h2`
  font-size: 2.25rem; /* text-4xl */
  font-weight: 700; /* font-bold */
  color: ${props => props.theme.colors.textLight};
  text-align: center;
  margin-bottom: 0.5rem;
  font-family: ${props => props.theme.fonts.sans};
`;

const Subtitle = styled.p`
  text-align: center;
  font-size: 1.125rem; /* text-lg */
  color: ${props => props.theme.colors.textDark};
  margin-bottom: 2rem;
`;

const Content = styled.div`
  flex-grow: 1;
  overflow-y: auto; /* Handled by os-scrollable */
  padding-right: 1rem; /* pr-4 */
  line-height: 1.7;
`;

const Section = styled.section`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h3`
  font-size: 1.25rem; /* text-xl */
  font-weight: 600; /* font-semibold */
  color: ${props => props.theme.colors.blue};
  border-bottom: 2px solid ${props => props.theme.colors.border};
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
  font-family: ${props => props.theme.fonts.mono};
`;

const Summary = styled.p`
  color: ${props => props.theme.colors.textDark};
  font-size: 1rem;
`;

const SkillsList = styled.ul`
  list-style-type: none;
  padding-left: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
`;

const SkillItem = styled.li`
  background-color: ${props => props.theme.colors.surface}80; /* 80 = 50% opacity */
  border: 1px solid ${props => props.theme.colors.border};
  color: ${props => props.theme.colors.textLight};
  padding: 0.5rem 1rem;
  border-radius: 0.375rem; /* rounded-md */
  font-family: ${props => props.theme.fonts.mono};
  font-size: 0.875rem;
`;

const ProjectEntry = styled.div`
  margin-bottom: 1.5rem;
`;

const ProjectTitle = styled.h4`
  font-size: 1.125rem; /* text-lg */
  font-weight: 600;
  color: ${props => props.theme.colors.textLight};
`;

const ProjectDescription = styled.p`
  color: ${props => props.theme.colors.textDark};
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

const ProjectTech = styled.p`
  font-family: ${props => props.theme.fonts.mono};
  font-size: 0.8rem;
  color: ${props => props.theme.colors.blue};
`;

// --- Component ---

interface AppProps {
  windowId: string;
}

const ResumeApp: React.FC<AppProps> = ({ windowId: _windowId }) => {
  return (
    <AppWindow>
      <Header>Sachin Mehta</Header>
      <Subtitle>Frontend Engineer & Interactive Developer</Subtitle>

      <Content className="os-scrollable">
        <Section>
          <SectionTitle>Summary</SectionTitle>
          <Summary>
            Creative and technical Frontend Engineer obsessed with building unique, immersive, and highly performant web experiences.
            Specializes in combining modern frameworks like React and TypeScript with advanced animation libraries (GSAP, Framer Motion)
            and low-level tooling (Go) to create applications that are both functional and delightful.
          </Summary>
        </Section>

        <Section>
          <SectionTitle>Technical Skills</SectionTitle>
          <SkillsList>
            <SkillItem>React</SkillItem>
            <SkillItem>TypeScript</SkillItem>
            <SkillItem>JavaScript (ES6+)</SkillItem>
            <SkillItem>Go (Golang)</SkillItem>
            <SkillItem>GSAP</SkillItem>
            <SkillItem>Framer Motion</SkillItem>
            <SkillItem>Emotion.js</SkillItem>
            <SkillItem>Tailwind CSS</SkillItem>
            <SkillItem>Node.js</SkillItem>
            <SkillItem>UI/UX Design</SkillItem>
            <SkillItem>Git & CLI</SkillItem>
            <SkillItem>Figma</SkillItem>
            <SkillItem>Vite</SkillItem>
          </SkillsList>
        </Section>

        <Section>
          <SectionTitle>Featured Projects</SectionTitle>
          
          <ProjectEntry>
            <ProjectTitle>Glimpse OS (This Portfolio)</ProjectTitle>
            <ProjectDescription>
              A fully interactive, OS-in-a-browser portfolio simulating a modern desktop environment. Features include a draggable window manager,
              dynamic app launcher, global state management with Zustand, and a custom UI component library built with Emotion.js.
            </ProjectDescription>
            <ProjectTech>Tech: React, TypeScript, Emotion.js, Framer Motion, Zustand, Vite</ProjectTech>
          </ProjectEntry>
          
          <ProjectEntry>
            <ProjectTitle>git-smart (CLI Tool)</ProjectTitle>
            <ProjectDescription>
              A command-line utility built in Go that automates common Git workflows. The tool intelligently syncs feature branches
              with the default branch, handling stashing, rebasing, and error reporting in one command.
            </ProjectDescription>
            <ProjectTech>Tech: Go (Golang), Cobra, OS/Exec</ProjectTech>
          </ProjectEntry>

          <ProjectEntry>
            <ProjectTitle>Adaptive Portfolio OS (Concept)</ProjectTitle>
            <ProjectDescription>
              A high-fidelity prototype for a "persona-aware" portfolio website. The UI dynamically morphs in real-time
              (no reload) based on the detected visitor (Recruiter, Designer, Developer) using a JSON-driven layout engine.
            </ProjectDescription>
            <ProjectTech>Tech: React, TypeScript, Framer Motion, React Context</ProjectTech>
          </ProjectEntry>
          
          <ProjectEntry>
            <ProjectTitle>Messiah (Food Wastage Tracker)</ProjectTitle>
            <ProjectDescription>
              A conceptual app for food detection and wastage tracking.
            </ProjectDescription>
            <ProjectTech>Tech: (Concept)</ProjectTech>
          </ProjectEntry>

        </Section>
      </Content>
    </AppWindow>
  );
};

export default ResumeApp;