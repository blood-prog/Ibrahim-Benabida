import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Group } from 'three';
import { Float, Sphere, RoundedBox, Environment } from '@react-three/drei';

function Face() {
  const groupRef = useRef<Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle head bobbing
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.05;
      // Looking around smoothly
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.15;
      groupRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 1.2) * 0.08;
    }
  });

  return (
    <group ref={groupRef} scale={1.2}>
      {/* T-Shirt (Torso) */}
      <RoundedBox args={[1.7, 1.3, 1.1]} radius={0.4} smoothness={4} position={[0, -1.4, -0.1]}>
        <meshStandardMaterial color="#3b82f6" roughness={0.7} />
      </RoundedBox>

      {/* Head Base - More Rounded */}
      <RoundedBox args={[1.15, 1.15, 1.15]} radius={0.5} smoothness={4} position={[0, 0, 0]}>
        <meshStandardMaterial color="#ffd1be" roughness={0.4} />
      </RoundedBox>

      {/* Neck */}
      <RoundedBox args={[0.4, 0.4, 0.4]} radius={0.1} position={[0, -0.65, -0.05]}>
        <meshStandardMaterial color="#ffc1a8" roughness={0.4} />
      </RoundedBox>

      {/* Hair Top */}
      <RoundedBox args={[1.2, 0.35, 1.2]} radius={0.15} smoothness={4} position={[0, 0.52, -0.05]}>
        <meshStandardMaterial color="#1f1a17" roughness={0.7} />
      </RoundedBox>
      
      {/* Hair Back */}
      <RoundedBox args={[1.2, 1.1, 0.4]} radius={0.15} smoothness={4} position={[0, 0.05, -0.45]}>
        <meshStandardMaterial color="#1f1a17" roughness={0.7} />
      </RoundedBox>

      {/* Ears */}
      <Sphere args={[0.15, 32, 32]} position={[-0.55, 0, -0.05]} scale={[0.5, 1, 1]}>
         <meshStandardMaterial color="#ffd1be" roughness={0.4} />
      </Sphere>
      <Sphere args={[0.15, 32, 32]} position={[0.55, 0, -0.05]} scale={[0.5, 1, 1]}>
         <meshStandardMaterial color="#ffd1be" roughness={0.4} />
      </Sphere>

      {/* Eyes - Glossy */}
      <Sphere args={[0.08, 32, 32]} position={[-0.22, 0.1, 0.52]}>
        <meshStandardMaterial color="#0f0f0f" roughness={0.1} metalness={0.8} />
      </Sphere>
      <Sphere args={[0.08, 32, 32]} position={[0.22, 0.1, 0.52]}>
        <meshStandardMaterial color="#0f0f0f" roughness={0.1} metalness={0.8} />
      </Sphere>

      {/* Glasses */}
      {/* Left Frame */}
      <RoundedBox args={[0.35, 0.22, 0.05]} radius={0.03} position={[-0.22, 0.1, 0.58]}>
        <meshStandardMaterial color="#111" roughness={0.2} metalness={0.8} />
      </RoundedBox>
      {/* Left Lens */}
      <RoundedBox args={[0.3, 0.17, 0.06]} radius={0.02} position={[-0.22, 0.1, 0.58]}>
        <meshStandardMaterial color="#60a5fa" transparent opacity={0.6} roughness={0.1} metalness={1} />
      </RoundedBox>

      {/* Right Frame */}
      <RoundedBox args={[0.35, 0.22, 0.05]} radius={0.03} position={[0.22, 0.1, 0.58]}>
        <meshStandardMaterial color="#111" roughness={0.2} metalness={0.8} />
      </RoundedBox>
      {/* Right Lens */}
      <RoundedBox args={[0.3, 0.17, 0.06]} radius={0.02} position={[0.22, 0.1, 0.58]}>
        <meshStandardMaterial color="#60a5fa" transparent opacity={0.6} roughness={0.1} metalness={1} />
      </RoundedBox>

      {/* Bridge */}
      <RoundedBox args={[0.15, 0.04, 0.04]} radius={0.01} position={[0, 0.16, 0.57]}>
        <meshStandardMaterial color="#111" roughness={0.2} metalness={0.8} />
      </RoundedBox>
      {/* Arms */}
      <RoundedBox args={[0.04, 0.04, 0.6]} radius={0.01} position={[-0.4, 0.15, 0.3]}>
        <meshStandardMaterial color="#111" roughness={0.2} metalness={0.8} />
      </RoundedBox>
      <RoundedBox args={[0.04, 0.04, 0.6]} radius={0.01} position={[0.4, 0.15, 0.3]}>
        <meshStandardMaterial color="#111" roughness={0.2} metalness={0.8} />
      </RoundedBox>

      {/* Nose */}
      <RoundedBox args={[0.15, 0.2, 0.15]} radius={0.06} smoothness={4} position={[0, -0.08, 0.54]}>
        <meshStandardMaterial color="#ffbaa3" roughness={0.4} />
      </RoundedBox>

      {/* Mouth */}
      <RoundedBox args={[0.2, 0.03, 0.05]} radius={0.01} position={[0, -0.28, 0.53]}>
        <meshStandardMaterial color="#6e3223" roughness={0.6} />
      </RoundedBox>

    </group>
  );
}

export default function DevFaceModel() {
  return (
    // Framing the neat floating bust with dpr cap for better mobile performance
    <Canvas camera={{ position: [0, -0.5, 5.5], fov: 42 }} gl={{ alpha: true }} dpr={[1, 1.5]}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 6, 5]} intensity={1.5} />
      <pointLight position={[-5, 5, -5]} intensity={0.8} color="#e2f1ff" />
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        {/* Group lifted slightly to recenter the whole model including the body */}
        <group position={[0, 0.4, 0]}>
          <Face />
        </group>
      </Float>
      {/* Realistic lighting environment */}
      <Environment preset="city" />
    </Canvas>
  );
}
