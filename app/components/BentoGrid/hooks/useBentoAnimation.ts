import { useState, useEffect } from 'react';
import { gsap } from 'gsap';

interface UseBentoAnimationProps {
  cardRefs: Record<string, React.RefObject<HTMLDivElement | null>>;
  setHoveredCard: (card: { id: string; color: string; bounds: DOMRect } | null) => void;
}

export const useBentoAnimation = ({ cardRefs, setHoveredCard }: UseBentoAnimationProps) => {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleCardClick = (cardId: string) => {
    if (isAnimating) return;
    
    // Ne permettre l'ouverture que si aucune carte n'est déjà ouverte
    if (expandedCard === null) {
      // Ouvrir la carte - animation d'expansion
      setIsAnimating(true);
      setHoveredCard(null);
      
      const cardElement = cardRefs[cardId].current;
      
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

  const closeExpandedCard = () => {
    if (!expandedCard || isAnimating) return;
    
    // Fermer la carte - animation de retour
    setIsAnimating(true);
    const cardElement = cardRefs[expandedCard].current;
    
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
        if (key !== expandedCard && ref.current) {
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
  };

  // Gérer l'échap pour fermer
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && expandedCard && !isAnimating) {
        closeExpandedCard();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [expandedCard, isAnimating]);

  return {
    expandedCard,
    isAnimating,
    handleCardClick,
    closeExpandedCard
  };
}; 