'use client'

import React, { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { useHover } from './3D/BmsModel';

const BentoGrid = () => {
  const { setHoveredCard } = useHover();
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  
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

  const handleCardClick = (cardId: string) => {
    if (isAnimating) return;
    
    if (expandedCard === cardId) {
      // Fermer la carte - animation de retour
      setIsAnimating(true);
      const cardElement = cardRefs[cardId as keyof typeof cardRefs].current;
      
      if (cardElement) {
        // Animer le retour du texte vers le blanc
        const textElements = cardElement.querySelectorAll('h3, h4, p, h5, button');
        gsap.to(textElements, {
          duration: 0.6,
          color: "#ffffff",
          ease: "power2.inOut"
        });
        
        // Animer le retour à la taille originale depuis le centre
        gsap.to(cardElement, {
          duration: 0.6,
          scale: 1,
          x: 0,
          y: 0,
          width: "auto",
          height: "auto",
          backgroundColor: "transparent",
          transformOrigin: "center center",
          ease: "power2.inOut",
          onComplete: () => {
            // Reset seulement les propriétés de transformation, pas les couleurs
            gsap.set(cardElement, { 
              clearProps: "transform,x,y,scale,scaleX,scaleY,width,height,rotation,transformOrigin,zIndex,backgroundColor" 
            });
            setExpandedCard(null);
            setHoveredCard(null);
            setIsAnimating(false);
          }
        });

        // Animer le retour des autres cartes
        Object.entries(cardRefs).forEach(([key, ref]) => {
          if (key !== cardId && ref.current) {
            // Set l'état initial pour l'animation de retour
            gsap.set(ref.current, { 
              opacity: 0, 
              scale: 0.3, 
              rotation: -3,
              transformOrigin: "center center" 
            });
            
            gsap.to(ref.current, {
              duration: 0.5,
              opacity: 1,
              scale: 1,
              rotation: 0,
              ease: "back.out(1.7)",
              delay: 0.1 + (Math.random() * 0.2) // Délai aléatoire pour effet décalé
            });
          }
        });
      }
    } else {
      // Ouvrir la carte - animation d'expansion
      setIsAnimating(true);
      setHoveredCard(null);
      
      const cardElement = cardRefs[cardId as keyof typeof cardRefs].current;
      
      if (cardElement) {
        // D'abord faire disparaître les autres cartes
        Object.entries(cardRefs).forEach(([key, ref]) => {
          if (key !== cardId && ref.current) {
            // Set transform-origin center pour compression centrée
            gsap.set(ref.current, { 
              transformOrigin: "center center" 
            });
            
            gsap.to(ref.current, {
              duration: 0.4,
              opacity: 0,
              scale: 0,
              rotation: 5, // Légère rotation pour plus de dynamisme
              ease: "power2.in"
            });
          }
        });

        // Ensuite animer l'agrandissement depuis le centre
        gsap.delayedCall(0.3, () => {
          setExpandedCard(cardId);
          
          // Obtenir les dimensions actuelles et cibles
          const rect = cardElement.getBoundingClientRect();
          const targetWidth = window.innerWidth; // Toute la largeur
          const targetHeight = window.innerHeight; // Toute la hauteur
          
          // Calculer les centres cibles
          const targetCenterX = window.innerWidth / 2;
          const targetCenterY = window.innerHeight / 2;
          
          // Calculer la position finale du coin supérieur gauche pour centrer la carte agrandie
          const finalLeft = targetCenterX - targetWidth / 2;
          const finalTop = targetCenterY - targetHeight / 2;
          
          // Calculer le déplacement total depuis la position actuelle
          const deltaX = finalLeft - rect.left;
          const deltaY = finalTop - rect.top;
          
          // Pour que l'animation parte du centre, on doit ajuster progressivement
          // la position pendant que les dimensions changent
          gsap.set(cardElement, { 
            zIndex: 1000 
          });
          
          // Animer aussi la couleur du texte pour la lisibilité sur fond blanc
          const textElements = cardElement.querySelectorAll('h3, h4, p, h5, button');
          gsap.to(textElements, {
            duration: 0.8,
            color: "#000000",
            ease: "power2.inOut"
          });
          
          gsap.to(cardElement, {
            duration: 0.8,
            width: targetWidth,
            height: targetHeight,
            x: deltaX,
            y: deltaY,
            overflowY: "auto",
            overflowX: "hidden",
            backgroundColor: "white",
            ease: "power2.inOut",
            onComplete: () => {
              setIsAnimating(false);
            }
          });
        });
      }
    }
  };

  // Gérer l'échap pour fermer
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && expandedCard && !isAnimating) {
        handleCardClick(expandedCard);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [expandedCard, isAnimating]);

  const getCardClasses = (cardId: string, baseClasses: string) => {
    if (expandedCard && expandedCard !== cardId) {
      return `${baseClasses} opacity-0 pointer-events-none transition-opacity duration-300`;
    }
    if (expandedCard === cardId) {
      return `${baseClasses} cursor-pointer`;
    }
    return `${baseClasses} transition-all duration-300`;
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-8 relative z-10">
      <div className="grid grid-cols-12 grid-rows-8 gap-6 h-[600px]">
        {/* Grande case à gauche */}
        <div 
          ref={cardRefs.main}
          className={getCardClasses('main', 'col-span-6 row-span-8 rounded-2xl border border-white/30 shadow-xl hover:shadow-2xl relative overflow-hidden group cursor-pointer')}
          style={{
            background: `linear-gradient(135deg, ${colors.primary}30, ${colors.primary}50)`,
            boxShadow: '0 0 30px rgba(79, 209, 199, 0.3), inset 0 0 20px rgba(255, 255, 255, 0.1)'
          }}
          onMouseEnter={() => handleCardHover('main', colors.primary, cardRefs.main)}
          onMouseLeave={handleCardLeave}
          onClick={() => handleCardClick('main')}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
          <div className={`relative z-10 h-full flex flex-col justify-center items-center text-white transition-all duration-500 ${expandedCard === 'main' ? 'p-16' : 'p-8'}`}>
            <h3 className={`font-bold mb-6 text-center transition-all duration-500 ${expandedCard === 'main' ? 'text-7xl' : 'text-4xl'}`}>EXPLORE 500+</h3>
            <h3 className={`font-bold mb-4 text-center transition-all duration-500 ${expandedCard === 'main' ? 'text-7xl' : 'text-4xl'}`}>MASTERCLASSES</h3>
            <p className={`text-center opacity-90 font-semibold transition-all duration-500 ${expandedCard === 'main' ? 'text-2xl mb-16' : 'text-xl'}`}>
              AND GAIN NEW SKILLS
            </p>
            {expandedCard === 'main' && (
              <div className="text-center animate-fade-in max-w-4xl">
                <p className="text-xl opacity-80 mb-12">
                  Découvrez notre collection complète de masterclasses dispensées par les plus grands experts dans leur domaine.
                </p>
                <button className="px-12 py-6 bg-white/20 rounded-xl backdrop-blur-sm border border-white/30 hover:bg-white/30 transition-colors text-lg mb-12">
                  Commencer maintenant
                </button>
                
                {/* Contenu supplémentaire pour tester le scroll */}
                <div className="mt-8 space-y-6">
                  <h4 className="text-2xl font-bold mb-6">Nos Catégories Principales</h4>
                  <div className="grid grid-cols-2 gap-6 mb-8">
                    <div className="p-6 bg-white/10 rounded-xl backdrop-blur-sm">
                      <h5 className="text-lg font-bold mb-3">Business & Entrepreneuriat</h5>
                      <p className="text-sm opacity-70">Développez vos compétences en leadership</p>
                    </div>
                    <div className="p-6 bg-white/10 rounded-xl backdrop-blur-sm">
                      <h5 className="text-lg font-bold mb-3">Arts Créatifs</h5>
                      <p className="text-sm opacity-70">Explorez votre potentiel artistique</p>
                    </div>
                    <div className="p-6 bg-white/10 rounded-xl backdrop-blur-sm">
                      <h5 className="text-lg font-bold mb-3">Sciences & Technologie</h5>
                      <p className="text-sm opacity-70">Maîtrisez les technologies d&apos;avenir</p>
                    </div>
                    <div className="p-6 bg-white/10 rounded-xl backdrop-blur-sm">
                      <h5 className="text-lg font-bold mb-3">Développement Personnel</h5>
                      <p className="text-sm opacity-70">Atteignez vos objectifs personnels</p>
                    </div>
                  </div>
                  
                  <h4 className="text-2xl font-bold mb-6">Pourquoi Choisir Nos Masterclasses ?</h4>
                  <div className="text-left max-w-3xl mx-auto space-y-4">
                    <div className="flex items-start space-x-4">
                      <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-base opacity-80">Instructeurs reconnus mondialement dans leur domaine</p>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-base opacity-80">Contenu premium avec accès à vie</p>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-base opacity-80">Communauté active d&apos;apprenants passionnés</p>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-base opacity-80">Certificats de completion reconnus</p>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-base opacity-80">Support technique 24/7</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 group-hover:translate-x-full transition-transform duration-1000" />
        </div>

        {/* Petite case 1 - Haut gauche */}
        <div 
          ref={cardRefs.filming}
          className={getCardClasses('filming', 'col-span-3 row-span-4 rounded-2xl border border-white/30 shadow-lg hover:shadow-xl relative overflow-hidden group cursor-pointer')}
          style={{
            background: `linear-gradient(135deg, ${colors.secondary}30, ${colors.secondary}50)`,
            boxShadow: '0 0 20px rgba(89, 205, 144, 0.2), inset 0 0 15px rgba(255, 255, 255, 0.1)'
          }}
          onMouseEnter={() => handleCardHover('filming', colors.secondary, cardRefs.filming)}
          onMouseLeave={handleCardLeave}
          onClick={() => handleCardClick('filming')}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
          <div className={`relative z-10 h-full flex flex-col justify-center items-center text-white transition-all duration-500 ${expandedCard === 'filming' ? 'p-12' : 'p-6'}`}>
            <h4 className={`font-bold mb-3 transition-all duration-500 ${expandedCard === 'filming' ? 'text-6xl mb-8' : 'text-2xl'}`}>FILMING</h4>
            <p className={`text-center opacity-90 font-medium transition-all duration-500 ${expandedCard === 'filming' ? 'text-xl mb-12' : 'text-base'}`}>COURSES</p>
            {expandedCard === 'filming' && (
              <div className="text-center animate-fade-in max-w-5xl">
                <p className="text-lg opacity-80 mb-8">
                  Apprenez les techniques de réalisation avec des professionnels du cinéma et de la télévision.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                  <div className="p-6 bg-white/10 rounded-xl backdrop-blur-sm">
                    <h5 className="text-xl font-bold mb-3">Direction d&apos;acteurs</h5>
                    <p className="text-sm opacity-70">Maîtrisez l&apos;art de diriger vos comédiens</p>
                  </div>
                  <div className="p-6 bg-white/10 rounded-xl backdrop-blur-sm">
                    <h5 className="text-xl font-bold mb-3">Cadrage et composition</h5>
                    <p className="text-sm opacity-70">Créez des images percutantes</p>
                  </div>
                  <div className="p-6 bg-white/10 rounded-xl backdrop-blur-sm">
                    <h5 className="text-xl font-bold mb-3">Post-production</h5>
                    <p className="text-sm opacity-70">Finalisez vos projets comme un pro</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Petite case 2 - Haut droite */}
        <div 
          ref={cardRefs.music}
          className={getCardClasses('music', 'col-span-3 row-span-4 rounded-2xl border border-white/30 shadow-lg hover:shadow-xl relative overflow-hidden group cursor-pointer')}
          style={{
            background: `linear-gradient(135deg, ${colors.tertiary}30, ${colors.tertiary}50)`,
            boxShadow: '0 0 20px rgba(63, 167, 214, 0.2), inset 0 0 15px rgba(255, 255, 255, 0.1)'
          }}
          onMouseEnter={() => handleCardHover('music', colors.tertiary, cardRefs.music)}
          onMouseLeave={handleCardLeave}
          onClick={() => handleCardClick('music')}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
          <div className={`relative z-10 h-full flex flex-col justify-center items-center text-white transition-all duration-500 ${expandedCard === 'music' ? 'p-12' : 'p-6'}`}>
            <h4 className={`font-bold mb-3 transition-all duration-500 ${expandedCard === 'music' ? 'text-6xl mb-8' : 'text-2xl'}`}>MUSIC</h4>
            <p className={`text-center opacity-90 font-medium transition-all duration-500 ${expandedCard === 'music' ? 'text-xl mb-12' : 'text-base'}`}>COURSES</p>
            {expandedCard === 'music' && (
              <div className="text-center animate-fade-in max-w-5xl">
                <p className="text-lg opacity-80 mb-8">
                  Maîtrisez votre instrument et développez votre créativité musicale.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                  <div className="p-6 bg-white/10 rounded-xl backdrop-blur-sm">
                    <h5 className="text-xl font-bold mb-3">Composition</h5>
                    <p className="text-sm opacity-70">Créez vos propres mélodies</p>
                  </div>
                  <div className="p-6 bg-white/10 rounded-xl backdrop-blur-sm">
                    <h5 className="text-xl font-bold mb-3">Production</h5>
                    <p className="text-sm opacity-70">Produisez des tracks professionnels</p>
                  </div>
                  <div className="p-6 bg-white/10 rounded-xl backdrop-blur-sm">
                    <h5 className="text-xl font-bold mb-3">Performance</h5>
                    <p className="text-sm opacity-70">Performez sur scène avec confiance</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Petite case 3 - Bas gauche */}
        <div 
          ref={cardRefs.art}
          className={getCardClasses('art', 'col-span-3 row-span-4 rounded-2xl border border-white/30 shadow-lg hover:shadow-xl relative overflow-hidden group cursor-pointer')}
          style={{
            background: `linear-gradient(135deg, ${colors.quaternary}30, ${colors.quaternary}50)`,
            boxShadow: '0 0 20px rgba(250, 192, 94, 0.2), inset 0 0 15px rgba(255, 255, 255, 0.1)'
          }}
          onMouseEnter={() => handleCardHover('art', colors.quaternary, cardRefs.art)}
          onMouseLeave={handleCardLeave}
          onClick={() => handleCardClick('art')}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
          <div className={`relative z-10 h-full flex flex-col justify-center items-center text-white transition-all duration-500 ${expandedCard === 'art' ? 'p-12' : 'p-6'}`}>
            <h4 className={`font-bold mb-3 transition-all duration-500 ${expandedCard === 'art' ? 'text-6xl mb-8' : 'text-2xl'}`}>ART</h4>
            <p className={`text-center opacity-90 font-medium transition-all duration-500 ${expandedCard === 'art' ? 'text-xl mb-12' : 'text-base'}`}>COURSES</p>
            {expandedCard === 'art' && (
              <div className="text-center animate-fade-in max-w-5xl">
                <p className="text-lg opacity-80 mb-8">
                  Explorez différentes techniques artistiques et développez votre style unique.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                  <div className="p-6 bg-white/10 rounded-xl backdrop-blur-sm">
                    <h5 className="text-xl font-bold mb-3">Peinture & Dessin</h5>
                    <p className="text-sm opacity-70">Maîtrisez les techniques traditionnelles</p>
                  </div>
                  <div className="p-6 bg-white/10 rounded-xl backdrop-blur-sm">
                    <h5 className="text-xl font-bold mb-3">Art numérique</h5>
                    <p className="text-sm opacity-70">Créez dans l&apos;univers digital</p>
                  </div>
                  <div className="p-6 bg-white/10 rounded-xl backdrop-blur-sm">
                    <h5 className="text-xl font-bold mb-3">Sculpture</h5>
                    <p className="text-sm opacity-70">Donnez vie à vos créations en 3D</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Petite case 4 - Bas droite */}
        <div 
          ref={cardRefs.writing}
          className={getCardClasses('writing', 'col-span-3 row-span-4 rounded-2xl border border-white/30 shadow-lg hover:shadow-xl relative overflow-hidden group cursor-pointer')}
          style={{
            background: `linear-gradient(135deg, ${colors.quinary}30, ${colors.quinary}50)`,
            boxShadow: '0 0 20px rgba(247, 157, 132, 0.2), inset 0 0 15px rgba(255, 255, 255, 0.1)'
          }}
          onMouseEnter={() => handleCardHover('writing', colors.quinary, cardRefs.writing)}
          onMouseLeave={handleCardLeave}
          onClick={() => handleCardClick('writing')}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
          <div className={`relative z-10 h-full flex flex-col justify-center items-center text-white transition-all duration-500 ${expandedCard === 'writing' ? 'p-12' : 'p-6'}`}>
            <h4 className={`font-bold mb-3 transition-all duration-500 ${expandedCard === 'writing' ? 'text-6xl mb-8' : 'text-2xl'}`}>WRITING</h4>
            <p className={`text-center opacity-90 font-medium transition-all duration-500 ${expandedCard === 'writing' ? 'text-xl mb-12' : 'text-base'}`}>COURSES</p>
            {expandedCard === 'writing' && (
              <div className="text-center animate-fade-in max-w-5xl">
                <p className="text-lg opacity-80 mb-8">
                  Affinez votre plume et apprenez les secrets de l&apos;écriture créative.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                  <div className="p-6 bg-white/10 rounded-xl backdrop-blur-sm">
                    <h5 className="text-xl font-bold mb-3">Écriture créative</h5>
                    <p className="text-sm opacity-70">Développez votre imagination</p>
                  </div>
                  <div className="p-6 bg-white/10 rounded-xl backdrop-blur-sm">
                    <h5 className="text-xl font-bold mb-3">Scénarisation</h5>
                    <p className="text-sm opacity-70">Écrivez pour l&apos;écran</p>
                  </div>
                  <div className="p-6 bg-white/10 rounded-xl backdrop-blur-sm">
                    <h5 className="text-xl font-bold mb-3">Journalisme</h5>
                    <p className="text-sm opacity-70">Informez avec impact</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
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
  );
};

export default BentoGrid; 