// src/ThreeDScene.jsx
import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Model from './Model'

export default function ThreeDScene({ modelPath }) {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }} shadows>
      {/* Base light */}
      <ambientLight intensity={0.5} />

      {/* Strong directional light from top-right */}
      <directionalLight
        position={[5, 5, 5]}
        intensity={2}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      {/* Fill light from the left to reduce harsh shadows */}
      <directionalLight position={[-5, 5, 5]} intensity={1} />

      {/* Optional spotlight for extra focus */}
      <spotLight
        position={[2, 5, 2]}
        angle={0.3}
        intensity={1.5}
        penumbra={1}
        castShadow
      />

      <Suspense fallback={null}>
        <Model url={modelPath} />
      </Suspense>

      <OrbitControls />
    </Canvas>
  )
}
