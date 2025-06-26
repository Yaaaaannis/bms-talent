import React from 'react';

const WritingCardExpanded: React.FC = () => (
  <div className="text-center animate-fade-in max-w-6xl">
    <p className="text-lg opacity-80 mb-8">
      Affinez votre plume et apprenez les secrets de l&apos;écriture créative.
    </p>
    
    {/* Design manuscrit avec pages */}
    <div className="space-y-8">
      {/* Simulation de pages d'écriture */}
      <div className="grid grid-cols-2 gap-8 mb-8">
        <div className="bg-white/10 p-6 rounded-lg border-l-4 border-white/50">
          <h5 className="text-lg font-bold mb-4 text-left">📖 Fiction</h5>
          <div className="space-y-2 text-left text-sm opacity-70">
            <div className="h-2 bg-white/20 rounded w-full"></div>
            <div className="h-2 bg-white/20 rounded w-4/5"></div>
            <div className="h-2 bg-white/20 rounded w-5/6"></div>
            <div className="h-2 bg-white/20 rounded w-3/4"></div>
          </div>
        </div>
        
        <div className="bg-white/10 p-6 rounded-lg border-l-4 border-white/50">
          <h5 className="text-lg font-bold mb-4 text-left">📰 Journalisme</h5>
          <div className="space-y-2 text-left text-sm opacity-70">
            <div className="h-2 bg-white/20 rounded w-full"></div>
            <div className="h-2 bg-white/20 rounded w-3/4"></div>
            <div className="h-2 bg-white/20 rounded w-5/6"></div>
            <div className="h-2 bg-white/20 rounded w-4/5"></div>
          </div>
        </div>
      </div>
      
      {/* Processus d'écriture en étapes */}
      <div className="space-y-4">
        <h4 className="text-2xl font-bold">Le Processus Créatif</h4>
        <div className="flex justify-between items-center">
          {['💡 Idée', '✏️ Brouillon', '📝 Rédaction', '✨ Révision', '📚 Publication'].map((step, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-2">
                <span className="text-lg">{step.split(' ')[0]}</span>
              </div>
              <span className="text-xs">{step.split(' ')[1]}</span>
              {i < 4 && <div className="w-8 h-0.5 bg-white/30 mt-2"></div>}
            </div>
          ))}
        </div>
      </div>
      
      {/* Genres littéraires */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {['Roman', 'Nouvelle', 'Poésie', 'Essai'].map((genre, i) => (
          <div key={i} className="p-4 bg-white/10 rounded-lg text-center">
            <h6 className="font-bold text-sm">{genre}</h6>
          </div>
        ))}
      </div>
      
      {/* Outils d'écriture */}
      <div className="space-y-4">
        <h4 className="text-2xl font-bold mb-6">Outils & Ressources</h4>
        <div className="grid grid-cols-3 gap-6">
          <div className="p-4 bg-gradient-to-br from-white/20 to-white/5 rounded-xl text-center">
            <div className="text-3xl mb-3">📚</div>
            <h6 className="font-bold text-sm mb-2">Bibliothèque</h6>
            <p className="text-xs opacity-70">Références et inspiration</p>
          </div>
          <div className="p-4 bg-gradient-to-br from-white/20 to-white/5 rounded-xl text-center">
            <div className="text-3xl mb-3">✍️</div>
            <h6 className="font-bold text-sm mb-2">Exercices</h6>
            <p className="text-xs opacity-70">Pratiques quotidiennes</p>
          </div>
          <div className="p-4 bg-gradient-to-br from-white/20 to-white/5 rounded-xl text-center">
            <div className="text-3xl mb-3">👥</div>
            <h6 className="font-bold text-sm mb-2">Communauté</h6>
            <p className="text-xs opacity-70">Retours et critiques</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default WritingCardExpanded; 