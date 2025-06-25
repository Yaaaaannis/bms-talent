'use client'
import React from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import { BmsModel } from './3D/BmsModel'

function Lights() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 0, -5]} intensity={3} color="#4fd1c7" />
      <pointLight position={[5, 5, 0]} intensity={2} color="#ff6b6b" />
      <pointLight position={[-5, -5, 0]} intensity={2} color="#4ecdc4" />
      <pointLight position={[0, 5, 3]} intensity={1.5} color="#ffffff" />
      <pointLight position={[0, -5, 3]} intensity={1.5} color="#ffffff" />
      <spotLight
        position={[3, 3, 5]}
        angle={0.4}
        penumbra={1}
        intensity={2}
        castShadow
        color="#ffffff"
      />
      <spotLight
        position={[-3, -3, 5]}
        angle={0.4}
        penumbra={1}
        intensity={2}
        castShadow
        color="#ffffff"
      />
    </>
  )
}

export default function ThreeScene() {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 2], fov: 75 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'black' }}
      >
        <Lights />
        <BmsModel position={[0, 0, -2]} />
        <Environment preset="studio" environmentIntensity={0.8} />
      </Canvas>
    </div>
  )
} 