import React from 'react';

const ArtCardExpanded: React.FC = () => (
  <div className="text-center animate-fade-in max-w-6xl">
    <p className="text-lg opacity-80 mb-8">
      Explorez différentes techniques artistiques et développez votre style unique.
    </p>
    
    {/* Design galerie avec cadres */}
    <div className="space-y-8">
      <div className="grid grid-cols-3 gap-6 mb-8">
        {[
          {title: 'Peinture à l&apos;huile', color: 'from-red-500/20 to-orange-500/20'},
          {title: 'Aquarelle', color: 'from-blue-500/20 to-cyan-500/20'},
          {title: 'Sculpture', color: 'from-gray-500/20 to-stone-500/20'},
          {title: 'Art numérique', color: 'from-purple-500/20 to-pink-500/20'},
          {title: 'Photographie', color: 'from-yellow-500/20 to-amber-500/20'},
          {title: 'Dessin', color: 'from-green-500/20 to-emerald-500/20'}
        ].map((item, i) => (
          <div key={i} className="relative group">
            <div className={`aspect-square bg-gradient-to-br ${item.color} rounded-lg border-4 border-white/30 p-6 flex items-center justify-center`}>
              <span className="text-3xl opacity-60">🎨</span>
            </div>
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">{item.title}</span>
            </div>
          </div>
        ))}
      </div>
      
      {/* Palette de couleurs */}
      <div className="flex justify-center space-x-2 mb-8">
        {['bg-red-500', 'bg-blue-500', 'bg-yellow-500', 'bg-green-500', 'bg-purple-500', 'bg-pink-500', 'bg-orange-500'].map((color, i) => (
          <div key={i} className={`w-8 h-8 ${color} rounded-full border-2 border-white/50`}></div>
        ))}
      </div>
      
      <div className="text-center">
        <h4 className="text-2xl font-bold mb-4">Techniques Enseignées</h4>
        <div className="grid grid-cols-2 gap-4 text-left">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span className="text-sm">Perspective et proportion</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span className="text-sm">Théorie des couleurs</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span className="text-sm">Composition visuelle</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span className="text-sm">Techniques mixtes</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span className="text-sm">Style personnel</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span className="text-sm">Portfolio professionnel</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Galerie d'œuvres d'étudiants */}
      <div className="mt-12">
        <h4 className="text-2xl font-bold mb-6">Galerie Étudiants</h4>
        <div className="grid grid-cols-4 gap-4">
          {Array.from({length: 8}).map((_, i) => (
            <div key={i} className="aspect-square bg-gradient-to-br from-white/10 to-white/5 rounded-lg border border-white/20 flex items-center justify-center">
              <span className="text-2xl opacity-40">🖼️</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default ArtCardExpanded; 