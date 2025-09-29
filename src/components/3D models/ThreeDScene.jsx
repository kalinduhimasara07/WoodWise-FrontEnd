import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Model from './Model'

export default function ThreeDScene({ modelPath }) {
  return (
    <Canvas 
      camera={{ position: [0, 0, 5], fov: 50 }} shadows>
      <ambientLight intensity={1.2} />

      <hemisphereLight
        intensity={2}
        color="#ffffff"
        groundColor="#ffffff"
      />

      <directionalLight
        position={[5, 5, 5]}
        intensity={3}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      <directionalLight position={[-5, 3, 5]} intensity={2.5} />

      <directionalLight position={[0, 3, -5]} intensity={2} />

      <directionalLight position={[0, -5, 0]} intensity={2} />

      <pointLight position={[0, 0, 5]} intensity={3} />
      
      <pointLight position={[5, 0, 0]} intensity={2} />
      <pointLight position={[-5, 0, 0]} intensity={2} />

      <Suspense fallback={null}>
        <Model url={modelPath} />
      </Suspense>

      <OrbitControls />
    </Canvas>
  )
}