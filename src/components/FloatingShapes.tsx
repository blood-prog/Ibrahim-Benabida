import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function Shape() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <Float speed={2.5} rotationIntensity={1.5} floatIntensity={2}>
      <mesh ref={meshRef} scale={1.8}>
        <icosahedronGeometry args={[1, 1]} />
        <meshPhysicalMaterial 
          color="#E0E0E0"
          roughness={0.1}
          metalness={0.8}
          wireframe={true}
        />
      </mesh>
      
      {/* Inner solid shape */}
      <mesh scale={0.9}>
         <octahedronGeometry args={[1, 0]} />
         <MeshDistortMaterial 
            color="#C9B59C" 
            speed={2} 
            distort={0.3} 
            radius={1} 
            roughness={0.2} 
            metalness={0.8} 
         />
      </mesh>
    </Float>
  );
}

export default function FloatingShapes() {
  return (
    <div style={{ width: '100%', height: '100%', pointerEvents: 'none' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} style={{ pointerEvents: 'auto' }} dpr={[1, 2]}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#C9B59C" />
        <Shape />
      </Canvas>
    </div>
  );
}
