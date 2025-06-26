import React from 'react';

const MainCardExpanded: React.FC = () => (
  <div className="text-center animate-fade-in max-w-6xl pt-[100px]">
    <p className="text-xl opacity-80 mb-12">
      Découvrez notre collection complète de masterclasses dispensées par les plus grands experts dans leur domaine.
    </p>
    <button className="px-12 py-6 bg-white/20 rounded-xl backdrop-blur-sm border border-white/30 hover:bg-white/30 transition-colors text-lg mb-12">
      Commencer maintenant
    </button>
    
    {/* Design unique avec grandes catégories */}
    <div className="mt-8 space-y-8">
      <h4 className="text-3xl font-bold mb-8">Nos Catégories Principales</h4>
      <div className="grid grid-cols-2 gap-8 mb-12">
        <div className="p-8 bg-gradient-to-br from-white/20 to-white/5 rounded-2xl backdrop-blur-sm border border-white/20">
          <div className="w-16 h-16 bg-white/30 rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-2xl">💼</span>
          </div>
          <h5 className="text-xl font-bold mb-3">Business & Entrepreneuriat</h5>
          <p className="text-sm opacity-70">Développez vos compétences en leadership et stratégie</p>
        </div>
        <div className="p-8 bg-gradient-to-br from-white/20 to-white/5 rounded-2xl backdrop-blur-sm border border-white/20">
          <div className="w-16 h-16 bg-white/30 rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-2xl">🎨</span>
          </div>
          <h5 className="text-xl font-bold mb-3">Arts Créatifs</h5>
          <p className="text-sm opacity-70">Explorez votre potentiel artistique</p>
        </div>
        <div className="p-8 bg-gradient-to-br from-white/20 to-white/5 rounded-2xl backdrop-blur-sm border border-white/20">
          <div className="w-16 h-16 bg-white/30 rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-2xl">⚗️</span>
          </div>
          <h5 className="text-xl font-bold mb-3">Sciences & Technologie</h5>
          <p className="text-sm opacity-70">Maîtrisez les technologies d&apos;avenir</p>
        </div>
        <div className="p-8 bg-gradient-to-br from-white/20 to-white/5 rounded-2xl backdrop-blur-sm border border-white/20">
          <div className="w-16 h-16 bg-white/30 rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-2xl">🧠</span>
          </div>
          <h5 className="text-xl font-bold mb-3">Développement Personnel</h5>
          <p className="text-sm opacity-70">Atteignez vos objectifs personnels</p>
        </div>
      </div>
      
      {/* Section stats */}
      <div className="grid grid-cols-3 gap-8 text-center mb-12">
        <div>
          <div className="text-4xl font-bold mb-2">500+</div>
          <div className="text-sm opacity-70">Masterclasses</div>
        </div>
        <div>
          <div className="text-4xl font-bold mb-2">100+</div>
          <div className="text-sm opacity-70">Instructeurs</div>
        </div>
        <div>
          <div className="text-4xl font-bold mb-2">50K+</div>
          <div className="text-sm opacity-70">Étudiants</div>
        </div>
      </div>
    </div>
  </div>
);

export default MainCardExpanded; 