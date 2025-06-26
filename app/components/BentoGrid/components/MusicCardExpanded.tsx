import React from 'react';

const MusicCardExpanded: React.FC = () => (
  <div className="text-center animate-fade-in max-w-6xl">
    <p className="text-lg opacity-80 mb-8">
      Maîtrisez votre instrument et développez votre créativité musicale.
    </p>
    
    {/* Design studio avec égaliseur visuel */}
    <div className="space-y-8">
      {/* Faux égaliseur */}
      <div className="flex justify-center space-x-2 mb-8">
        {Array.from({length: 20}).map((_, i) => (
          <div 
            key={i} 
            className="w-3 bg-white/30 rounded-full"
            style={{height: `${Math.random() * 60 + 20}px`}}
          ></div>
        ))}
      </div>
      
      {/* Genres musicaux en cercle */}
      <div className="relative w-80 h-80 mx-auto mb-8">
        <div className="absolute inset-0 border-2 border-white/30 rounded-full"></div>
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 p-3 bg-white/20 rounded-lg">
          <span className="text-sm font-bold">Jazz</span>
        </div>
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-white/20 rounded-lg">
          <span className="text-sm font-bold">Rock</span>
        </div>
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 p-3 bg-white/20 rounded-lg">
          <span className="text-sm font-bold">Classique</span>
        </div>
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-white/20 rounded-lg">
          <span className="text-sm font-bold">Électronique</span>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-24 bg-white/30 rounded-full flex items-center justify-center">
            <span className="text-2xl">🎵</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="p-6 bg-white/10 rounded-xl">
          <h5 className="text-lg font-bold mb-3">🎹 Instruments</h5>
          <p className="text-sm opacity-70">Piano, Guitare, Batterie, Violon</p>
        </div>
        <div className="p-6 bg-white/10 rounded-xl">
          <h5 className="text-lg font-bold mb-3">🎛️ Production</h5>
          <p className="text-sm opacity-70">Logic Pro, Ableton, Pro Tools</p>
        </div>
      </div>
      
      {/* Niveaux de cours */}
      <div className="space-y-4">
        <h4 className="text-2xl font-bold mb-6">Parcours d&apos;Apprentissage</h4>
        <div className="space-y-3">
          {[
            { level: 'Débutant', color: 'bg-green-500/20', skills: 'Bases, solfège, premiers accords' },
            { level: 'Intermédiaire', color: 'bg-yellow-500/20', skills: 'Techniques avancées, improvisation' },
            { level: 'Expert', color: 'bg-red-500/20', skills: 'Composition, arrangement, production' }
          ].map((course, i) => (
            <div key={i} className={`p-4 ${course.color} rounded-xl border border-white/20 flex justify-between items-center`}>
              <div className="text-left">
                <h6 className="font-bold">{course.level}</h6>
                <p className="text-sm opacity-70">{course.skills}</p>
              </div>
              <div className="text-2xl">🎼</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default MusicCardExpanded; 