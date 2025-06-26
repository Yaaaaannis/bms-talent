import React from 'react';

interface BackButtonProps {
  onClick: () => void;
}

const BackButton: React.FC<BackButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed top-8 left-8 z-[1001] flex items-center space-x-2 px-4 py-2 bg-black/20 backdrop-blur-sm rounded-full border border-white/30 text-white hover:bg-black/40 transition-all duration-300 group"
    >
      <svg 
        className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-300" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M10 19l-7-7m0 0l7-7m-7 7h18" 
        />
      </svg>
      <span className="text-sm font-medium">Retour</span>
    </button>
  );
};

export default BackButton; 