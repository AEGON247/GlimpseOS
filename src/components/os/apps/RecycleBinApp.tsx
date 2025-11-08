import React from 'react';
import styled from '@emotion/styled';
import { useOsStore } from '../OsContext'; // Import the store

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

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
`;

const IdeaCard = styled.div`
  background-color: rgba(255, 255, 255, 0.05); /* Slightly lighter than bg */
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 0.5rem; /* rounded-lg */
  overflow: hidden;
  box-shadow: ${props => props.theme.shadows.lg};
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${props => props.theme.shadows.xl};
    border-color: ${props => props.theme.colors.blue};
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  background-color: ${props => props.theme.colors.bgLight};
`;

const CardContent = styled.div`
  padding: 1rem;
`;

const CardTitle = styled.h3`
  font-weight: 700;
  color: ${props => props.theme.colors.textLight};
  margin-bottom: 0.5rem;
`;

const CardDescription = styled.p`
  font-size: 0.875rem; /* text-sm */
  color: ${props => props.theme.colors.textDark};
  margin-bottom: 0.75rem;
`;

const Tag = styled.span`
  display: inline-block;
  background-color: ${props => props.theme.colors.blue}20; /* 20 = ~12% opacity */
  color: ${props => props.theme.colors.blue};
  font-family: ${props => props.theme.fonts.mono};
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px; /* rounded-full */
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
`;

// --- Component ---

interface AppProps {
  windowId: string;
}

const RecycleBinApp: React.FC<AppProps> = ({ windowId: _windowId }) => {
  const { discardedIdeas } = useOsStore(); // Get ideas from the store

  return (
    <AppWindow>
      <Header>Recycle Bin (Discarded Ideas)</Header>
      <Content className="os-scrollable">
        <Grid>
          {discardedIdeas.map(idea => (
            <IdeaCard key={idea.id} className="os-interactable">
              <CardImage src={idea.imageUrl} alt={idea.title} />
              <CardContent>
                <CardTitle>{idea.title}</CardTitle>
                <CardDescription>{idea.description}</CardDescription>
                <div>
                  {idea.tags.map(tag => <Tag key={tag}>{tag}</Tag>)}
                </div>
              </CardContent>
            </IdeaCard>
          ))}
        </Grid>
      </Content>
    </AppWindow>
  );
};

export default RecycleBinApp;