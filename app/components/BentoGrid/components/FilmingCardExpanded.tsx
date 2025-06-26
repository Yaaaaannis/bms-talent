import React from 'react';

const FilmingCardExpanded: React.FC = () => (
  <div className="text-center animate-fade-in max-w-6xl">
    <p className="text-lg opacity-80 mb-8">
      Apprenez les techniques de réalisation avec des professionnels du cinéma et de la télévision.
    </p>
    
    {/* Design cinématique avec timeline */}
    <div className="space-y-8">
      <div className="relative">
        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-white/30"></div>
        
        <div className="space-y-12">
          <div className="flex items-center">
            <div className="flex-1 text-right pr-8">
              <h5 className="text-xl font-bold mb-2">Pré-production</h5>
              <p className="text-sm opacity-70">Scénarisation, storyboard, casting</p>
            </div>
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center relative z-10">
              <span className="text-black text-sm font-bold">1</span>
            </div>
            <div className="flex-1 pl-8"></div>
          </div>
          
          <div className="flex items-center">
            <div className="flex-1 pr-8"></div>
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center relative z-10">
              <span className="text-black text-sm font-bold">2</span>
            </div>
            <div className="flex-1 text-left pl-8">
              <h5 className="text-xl font-bold mb-2">Production</h5>
              <p className="text-sm opacity-70">Tournage, direction d&apos;acteurs, cadrage</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="flex-1 text-right pr-8">
              <h5 className="text-xl font-bold mb-2">Post-production</h5>
              <p className="text-sm opacity-70">Montage, effets, colorimétrie</p>
            </div>
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center relative z-10">
              <span className="text-black text-sm font-bold">3</span>
            </div>
            <div className="flex-1 pl-8"></div>
          </div>
        </div>
      </div>
      
      {/* Instructeurs vedettes */}
      <div className="mt-12">
        <h4 className="text-2xl font-bold mb-6">Instructeurs Vedettes</h4>
        <div className="grid grid-cols-3 gap-6">
          {['Martin Scorsese', 'Christopher Nolan', 'Denis Villeneuve'].map((name, i) => (
            <div key={i} className="p-4 bg-white/10 rounded-xl">
              <div className="w-16 h-16 bg-white/20 rounded-full mx-auto mb-3"></div>
              <h6 className="font-bold">{name}</h6>
            </div>
          ))}
        </div>
      </div>
      
      {/* Équipement de tournage */}
      <div className="mt-12">
        <h4 className="text-2xl font-bold mb-6">Matériel Professionnel</h4>
        <div className="grid grid-cols-4 gap-4">
          {['📹 Caméras', '🎬 Clapboard', '🎙️ Audio', '💡 Éclairage'].map((equipment, i) => (
            <div key={i} className="p-4 bg-gradient-to-br from-white/20 to-white/5 rounded-xl text-center">
              <div className="text-2xl mb-2">{equipment.split(' ')[0]}</div>
              <span className="text-sm font-medium">{equipment.split(' ')[1]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default FilmingCardExpanded; 