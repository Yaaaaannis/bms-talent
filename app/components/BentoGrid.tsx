'use client'

import React, { useRef } from 'react';
import { useHover } from './3D/BmsModel';

const BentoGrid = () => {
  const { setHoveredCard } = useHover();
  const cardRefs = {
    main: useRef<HTMLDivElement>(null),
    filming: useRef<HTMLDivElement>(null),
    music: useRef<HTMLDivElement>(null),
    art: useRef<HTMLDivElement>(null),
    writing: useRef<HTMLDivElement>(null),
  };

  const colors = {
    primary: '#EE6352',
    secondary: '#59CD90', 
    tertiary: '#3FA7D6',
    quaternary: '#FAC05E',
    quinary: '#F79D84'
  };

  const handleCardHover = (cardId: string, color: string, ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref.current) {
      const bounds = ref.current.getBoundingClientRect();
      setHoveredCard({ id: cardId, color, bounds });
    }
  };

  const handleCardLeave = () => {
    setHoveredCard(null);
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-8 relative z-10">
      <div className="grid grid-cols-12 grid-rows-8 gap-6 h-[600px]">
        {/* Grande case à gauche */}
        <div 
          ref={cardRefs.main}
          className="col-span-6 row-span-8 rounded-2xl border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden group"
          style={{
            background: `linear-gradient(135deg, ${colors.primary}30, ${colors.primary}50)`,
            boxShadow: '0 0 30px rgba(79, 209, 199, 0.3), inset 0 0 20px rgba(255, 255, 255, 0.1)'
          }}
          onMouseEnter={() => handleCardHover('main', colors.primary, cardRefs.main)}
          onMouseLeave={handleCardLeave}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
          <div className="relative z-10 p-8 h-full flex flex-col justify-center items-center text-white">
            <h3 className="text-4xl font-bold mb-6 text-center">EXPLORE 500+</h3>
            <h3 className="text-4xl font-bold mb-4 text-center">MASTERCLASSES</h3>
            <p className="text-xl text-center opacity-90 font-semibold">
              AND GAIN NEW SKILLS
            </p>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 group-hover:translate-x-full transition-transform duration-1000" />
        </div>

        {/* Petite case 1 - Haut gauche */}
        <div 
          ref={cardRefs.filming}
          className="col-span-3 row-span-4 rounded-2xl border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
          style={{
            background: `linear-gradient(135deg, ${colors.secondary}30, ${colors.secondary}50)`,
            boxShadow: '0 0 20px rgba(89, 205, 144, 0.2), inset 0 0 15px rgba(255, 255, 255, 0.1)'
          }}
          onMouseEnter={() => handleCardHover('filming', colors.secondary, cardRefs.filming)}
          onMouseLeave={handleCardLeave}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
          <div className="relative z-10 p-6 h-full flex flex-col justify-center items-center text-white">
            <h4 className="text-2xl font-bold mb-3">FILMING</h4>
            <p className="text-base text-center opacity-90 font-medium">COURSES</p>
          </div>
        </div>

        {/* Petite case 2 - Haut droite */}
        <div 
          ref={cardRefs.music}
          className="col-span-3 row-span-4 rounded-2xl border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
          style={{
            background: `linear-gradient(135deg, ${colors.tertiary}30, ${colors.tertiary}50)`,
            boxShadow: '0 0 20px rgba(63, 167, 214, 0.2), inset 0 0 15px rgba(255, 255, 255, 0.1)'
          }}
          onMouseEnter={() => handleCardHover('music', colors.tertiary, cardRefs.music)}
          onMouseLeave={handleCardLeave}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
          <div className="relative z-10 p-6 h-full flex flex-col justify-center items-center text-white">
            <h4 className="text-2xl font-bold mb-3">MUSIC</h4>
            <p className="text-base text-center opacity-90 font-medium">COURSES</p>
          </div>
        </div>

        {/* Petite case 3 - Bas gauche */}
        <div 
          ref={cardRefs.art}
          className="col-span-3 row-span-4 rounded-2xl border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
          style={{
            background: `linear-gradient(135deg, ${colors.quaternary}30, ${colors.quaternary}50)`,
            boxShadow: '0 0 20px rgba(250, 192, 94, 0.2), inset 0 0 15px rgba(255, 255, 255, 0.1)'
          }}
          onMouseEnter={() => handleCardHover('art', colors.quaternary, cardRefs.art)}
          onMouseLeave={handleCardLeave}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
          <div className="relative z-10 p-6 h-full flex flex-col justify-center items-center text-white">
            <h4 className="text-2xl font-bold mb-3">ART</h4>
            <p className="text-base text-center opacity-90 font-medium">COURSES</p>
          </div>
        </div>

        {/* Petite case 4 - Bas droite */}
        <div 
          ref={cardRefs.writing}
          className="col-span-3 row-span-4 rounded-2xl border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
          style={{
            background: `linear-gradient(135deg, ${colors.quinary}30, ${colors.quinary}50)`,
            boxShadow: '0 0 20px rgba(247, 157, 132, 0.2), inset 0 0 15px rgba(255, 255, 255, 0.1)'
          }}
          onMouseEnter={() => handleCardHover('writing', colors.quinary, cardRefs.writing)}
          onMouseLeave={handleCardLeave}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
          <div className="relative z-10 p-6 h-full flex flex-col justify-center items-center text-white">
            <h4 className="text-2xl font-bold mb-3">WRITING</h4>
            <p className="text-base text-center opacity-90 font-medium">COURSES</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BentoGrid; 