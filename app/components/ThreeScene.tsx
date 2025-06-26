'use client'
import React from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import { BmsModel } from './3D/BmsModel'

function Lights() {
  return (
    <>
      {/* Ambient light très faible pour un effet dramatique */}
      <ambientLight intensity={0.1} />
      
      {/* Éclairage principal pour créer l'effet de contour */}
      <directionalLight 
        position={[0, 0, 5]} 
        intensity={1.5} 
        color="#ffffff"
        castShadow
      />
      
      {/* Éclairage de rim/contour pour l'effet lumineux */}
      <pointLight 
        position={[3, 3, 2]} 
        intensity={2} 
        color="#ffffff" 
        distance={10}
        decay={2}
      />
      <pointLight 
        position={[-3, -3, 2]} 
        intensity={2} 
        color="#ffffff" 
        distance={10}
        decay={2}
      />
      
      {/* Éclairage subtil pour les détails */}
      <spotLight
        position={[0, 5, 3]}
        target-position={[0, 0, 0]}
        angle={0.3}
        penumbra={1}
        intensity={1}
        color="#ffffff"
        castShadow
      />
    </>
  )
}

export default function ThreeScene() {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 2], fov: 75 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance"
        }}
        style={{ background: '#000000' }}
        shadows
      >
        <Lights />
        <BmsModel position={[0, 0, -2]} />
        {/* Environnement minimal pour l'effet wireframe */}
        <Environment preset="night" environmentIntensity={6} />
        <fog attach="fog" args={['#000000', 5, 15]} />
      </Canvas>
    </div>
  )
} 