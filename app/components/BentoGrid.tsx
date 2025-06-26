'use client'

import React, { useRef } from 'react';
import { useHover } from './3D/BmsModel';
import { cardsData } from './BentoGrid/data/cardsContent';
import { useBentoAnimation } from './BentoGrid/hooks/useBentoAnimation';
import ExpandedCardContent from './BentoGrid/components/ExpandedCardContent';
import BackButton from './BentoGrid/components/BackButton';

const BentoGrid = () => {
  const { setHoveredCard } = useHover();
  
  const cardRefs = {
    main: useRef<HTMLDivElement>(null),
    filming: useRef<HTMLDivElement>(null),
    music: useRef<HTMLDivElement>(null),
    art: useRef<HTMLDivElement>(null),
    writing: useRef<HTMLDivElement>(null),
  };

  const { expandedCard, isAnimating, handleCardClick, closeExpandedCard } = useBentoAnimation({
    cardRefs,
    setHoveredCard
  });

  const colors = {
    primary: '#EE6352',
    secondary: '#59CD90', 
    tertiary: '#3FA7D6',
    quaternary: '#FAC05E',
    quinary: '#F79D84'
  };

  const handleCardHover = (cardId: string, color: string, ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref.current && !expandedCard && !isAnimating) {
      const bounds = ref.current.getBoundingClientRect();
      setHoveredCard({ id: cardId, color, bounds });
    }
  };

  const handleCardLeave = () => {
    if (!expandedCard && !isAnimating) {
      setHoveredCard(null);
    }
  };

  const getCardClasses = (cardId: string, baseClasses: string) => {
    if (expandedCard && expandedCard !== cardId) {
      return `${baseClasses} opacity-0 pointer-events-none transition-opacity duration-300`;
    }
    if (expandedCard === cardId) {
      return `${baseClasses}`;
    }
    return `${baseClasses} transition-all duration-300 cursor-pointer`;
  };

  const handleCardClickEvent = (cardId: keyof typeof cardRefs) => {
    if (!expandedCard) {
      handleCardClick(cardId);
    }
  };

  const renderCard = (
    cardId: keyof typeof cardRefs,
    colorKey: keyof typeof colors,
    baseClasses: string
  ) => {
    const cardData = cardsData[cardId];
    const color = colors[colorKey];
    
    return (
      <div 
        ref={cardRefs[cardId]}
        className={getCardClasses(cardId, baseClasses)}
        style={{
          background: `linear-gradient(135deg, ${color}30, ${color}50)`,
          boxShadow: `0 0 ${cardId === 'main' ? '30' : '20'}px ${color}30, inset 0 0 ${cardId === 'main' ? '20' : '15'}px rgba(255, 255, 255, 0.1)`
        }}
        onMouseEnter={() => handleCardHover(cardId, color, cardRefs[cardId])}
        onMouseLeave={handleCardLeave}
        onClick={() => handleCardClickEvent(cardId)}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
        
        {/* Contenu pour cartes étendues */}
        {expandedCard === cardId ? (
          <div className={`relative z-10 h-full flex flex-col justify-center items-center text-white transition-all duration-500 ${cardId === 'main' ? 'p-16' : 'p-12'}`}>
            {/* Titres pour cartes étendues */}
            {cardId === 'main' ? (
              <>
                <h3 className="font-bold mb-6 text-center transition-all duration-500 text-7xl">
                  {cardData.title}
                </h3>
                <h3 className="font-bold mb-4 text-center transition-all duration-500 text-7xl">
                  {cardData.subtitle}
                </h3>
                <p className="text-center opacity-90 font-semibold transition-all duration-500 text-2xl mb-16">
                  {cardData.description}
                </p>
              </>
            ) : (
              <>
                <h4 className="font-bold mb-3 transition-all duration-500 text-6xl mb-8">
                  {cardData.title}
                </h4>
                <p className="text-center opacity-90 font-medium transition-all duration-500 text-xl mb-12">
                  {cardData.subtitle}
                </p>
              </>
            )}

            {/* Contenu étendu */}
            <ExpandedCardContent 
              cardId={cardId}
              isExpanded={expandedCard === cardId}
            />
          </div>
        ) : (
          /* Contenu pour cartes normales - Style Figma */
          <div className="relative z-10 h-full flex flex-col justify-end p-6">
            <div className="text-white">
              {/* Texte principal en bas à gauche */}
              {cardId === 'main' ? (
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-2 leading-tight">
                    {cardData.title}<br />
                    {cardData.subtitle}
                  </h2>
                  <p className="text-sm opacity-80 font-medium uppercase tracking-wider">
                    {cardData.description}
                  </p>
                </div>
              ) : (
                <div>
                  <h3 className="text-xl md:text-2xl font-bold mb-2 leading-tight">
                    {cardData.title}
                  </h3>
                  <p className="text-xs opacity-80 font-medium uppercase tracking-wider">
                    {cardData.subtitle}
                  </p>
                </div>
              )}
              
              {/* Badge "SERVICES & PRIX" style */}
              <div className="flex items-center justify-between mt-4">
                <span className="text-xs opacity-60 uppercase tracking-wider font-medium">
                  SERVICES & PRIX
                </span>
                <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Effet de brillance */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 group-hover:translate-x-full transition-transform duration-1000" />
      </div>
    );
  };

  return (
    <>
      {expandedCard && (
        <BackButton onClick={closeExpandedCard} />
      )}
      
      <div className="w-full max-w-7xl mx-auto p-8 relative z-10">
        <div className="grid grid-cols-12 grid-rows-8 gap-6 h-[600px]">
          
          {/* Grande case à gauche */}
          {renderCard('main', 'primary', 'col-span-6 row-span-8 rounded-2xl border border-white/30 shadow-xl hover:shadow-2xl relative overflow-hidden group')}

          {/* Petite case 1 - Haut gauche */}
          {renderCard('filming', 'secondary', 'col-span-3 row-span-4 rounded-2xl border border-white/30 shadow-lg hover:shadow-xl relative overflow-hidden group')}

          {/* Petite case 2 - Haut droite */}
          {renderCard('music', 'tertiary', 'col-span-3 row-span-4 rounded-2xl border border-white/30 shadow-lg hover:shadow-xl relative overflow-hidden group')}

          {/* Petite case 3 - Bas gauche */}
          {renderCard('art', 'quaternary', 'col-span-3 row-span-4 rounded-2xl border border-white/30 shadow-lg hover:shadow-xl relative overflow-hidden group')}

          {/* Petite case 4 - Bas droite */}
          {renderCard('writing', 'quinary', 'col-span-3 row-span-4 rounded-2xl border border-white/30 shadow-lg hover:shadow-xl relative overflow-hidden group')}
          
        </div>
        
        <style jsx>{`
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
            animation: fade-in 0.6s ease-out;
          }
        `}</style>
      </div>
    </>
  );
};

export default BentoGrid; 