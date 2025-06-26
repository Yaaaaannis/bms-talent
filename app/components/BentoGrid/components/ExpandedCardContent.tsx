import React from 'react';
import MainCardExpanded from './MainCardExpanded';
import FilmingCardExpanded from './FilmingCardExpanded';
import MusicCardExpanded from './MusicCardExpanded';
import ArtCardExpanded from './ArtCardExpanded';
import WritingCardExpanded from './WritingCardExpanded';

// Composant principal qui switche entre les différents designs
interface ExpandedCardContentProps {
  cardId: string;
  isExpanded: boolean;
}

const ExpandedCardContent: React.FC<ExpandedCardContentProps> = ({ cardId, isExpanded }) => {
  if (!isExpanded) return null;

  const componentMap = {
    main: MainCardExpanded,
    filming: FilmingCardExpanded,
    music: MusicCardExpanded,
    art: ArtCardExpanded,
    writing: WritingCardExpanded,
  };

  const Component = componentMap[cardId as keyof typeof componentMap];
  
  return Component ? <Component /> : null;
};

export default ExpandedCardContent; 