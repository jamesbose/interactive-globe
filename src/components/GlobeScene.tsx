import { Canvas } from '@react-three/fiber'
import { Environment, Stars } from '@react-three/drei'
import { Earth } from './Earth'
import { Suspense, useEffect, useState } from 'react'

interface GlobeSceneProps {
  target: 'usa' | 'india'
}

export function GlobeScene({ target }: GlobeSceneProps) {
  const [cameraZ, setCameraZ] = useState(7)
  const [earthScale, setEarthScale] = useState(1)

  useEffect(() => {
    const updateLayout = () => {
      const width = window.innerWidth

      if (width <= 480) {
        setCameraZ(10)
        setEarthScale(0.85)
      } else if (width <= 768) {
        setCameraZ(8.5)
        setEarthScale(0.95)
      } else {
        setCameraZ(7)
        setEarthScale(1)
      }
    }

    updateLayout()
    window.addEventListener('resize', updateLayout)
    return () => window.removeEventListener('resize', updateLayout)
  }, [])

  return (
    <div className="w-full absolute left-0 right-0 bg-slate-950 z-0 overflow-hidden" style={{ top: 'calc(3.5rem + 20px)', bottom: 0 }}>
      <Canvas camera={{ position: [0, 0, cameraZ], fov: 45 }}>
        <color attach="background" args={['#020617']} />
        
        {/* Cinematic lighting setup */}
        <ambientLight intensity={0.1} />
        <directionalLight 
          position={[5, 3, 5]} 
          intensity={3} 
          color="#ffffff" 
        />
        <directionalLight 
          position={[-5, -3, -5]} 
          intensity={0.5} 
          color="#4f46e5" 
        />
        
        {/* Background stars */}
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        
        {/* Main interactive earth */}
        <Suspense fallback={null}>
          <Earth target={target} scale={earthScale} />
          
          {/* Environment adds realistic reflections/lighting */}
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  )
}
