import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'

interface EarthProps {
  target: 'usa' | 'india'
  scale?: number
}

// Helper to convert Lat/Lon to Euler angles for a standard SphereGeometry
function getRotationFromLatLon(lat: number, lon: number): THREE.Euler {
  const latRad = lat * (Math.PI / 180)
  // The texture seam is typically at +Z, center of texture at -Z.
  // We add Math.PI / 2 offset to properly center the texture on the camera.
  // This offset might require a small tweak depending on the exact map, but generally -lon + offset works.
  const lonRad = -lon * (Math.PI / 180) - (Math.PI / 2) 
  
  return new THREE.Euler(latRad, lonRad, 0)
}

const ROTATIONS = {
  // Approximate center of USA (e.g. Kansas: 39°N, 98°W)
  usa: getRotationFromLatLon(39, -98),
  // Approximate center of India (e.g. Madhya Pradesh: 22°N, 78°E)
  india: getRotationFromLatLon(22, 78),
}

export function Earth({ target, scale = 1 }: EarthProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const texture = useTexture('/earth.jpg')

  // Smooth rotation using MathUtils.damp
  useFrame((_state, delta) => {
    if (!meshRef.current) return
    const targetRot = ROTATIONS[target]
    
    meshRef.current.rotation.x = THREE.MathUtils.damp(meshRef.current.rotation.x, targetRot.x, 3, delta)
    meshRef.current.rotation.y = THREE.MathUtils.damp(meshRef.current.rotation.y, targetRot.y, 3, delta)
    meshRef.current.rotation.z = THREE.MathUtils.damp(meshRef.current.rotation.z, targetRot.z, 3, delta)
  })

  return (
    <mesh ref={meshRef} scale={scale}>
      <sphereGeometry args={[2.5, 64, 64]} />
      <meshStandardMaterial 
        map={texture} 
        roughness={0.7} 
        metalness={0.1}
      />
    </mesh>
  )
}
