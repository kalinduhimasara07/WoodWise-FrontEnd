// src/Model.jsx
import React, { Suspense } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model() {
  const gltf = useGLTF('/models/textured_mesh.glb') // Place the .glb file in the public/models folder
  return <primitive object={gltf.scene} scale={1} />
}
