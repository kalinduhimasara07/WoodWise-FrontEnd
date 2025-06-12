// src/ThreeDScene.jsx
import React from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Model from './Model'


export default function ThreeDScene() {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight />
      <directionalLight position={[10, 10, 5]} />
      <Model />
      <OrbitControls />
    </Canvas>
  )
}
