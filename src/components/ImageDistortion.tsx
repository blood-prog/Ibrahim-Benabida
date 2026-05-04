import React, { useRef, useState } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { TextureLoader } from 'three';

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D tDiffuse;
  uniform float uHover;
  uniform float uTime;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;
    // Add wave distortion based on hover and time
    uv.y += sin(uv.x * 10.0 + uTime * 2.0) * 0.05 * uHover;
    uv.x += cos(uv.y * 10.0 + uTime * 2.0) * 0.05 * uHover;
    
    vec4 tex = texture2D(tDiffuse, uv);
    gl_FragColor = tex;
  }
`;

interface ImageDistortionProps {
  src: string;
}

function DistortionMesh({ src }: { src: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const texture = useLoader(TextureLoader, src);
  const [hovered, setHover] = useState(false);
  const targetHover = useRef(0);

  useFrame((state, delta) => {
    targetHover.current = THREE.MathUtils.lerp(targetHover.current, hovered ? 1 : 0, delta * 5);
    if (materialRef.current) {
      materialRef.current.uniforms.uHover.value = targetHover.current;
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh 
      ref={meshRef} 
      onPointerOver={() => setHover(true)} 
      onPointerOut={() => setHover(false)}
    >
      <planeGeometry args={[16, 9]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          tDiffuse: { value: texture },
          uHover: { value: 0 },
          uTime: { value: 0 }
        }}
      />
    </mesh>
  );
}

export default function ImageDistortion({ src }: ImageDistortionProps) {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Canvas camera={{ position: [0, 0, 7.5], fov: 65 }}>
        <React.Suspense fallback={null}>
          <DistortionMesh src={src} />
        </React.Suspense>
      </Canvas>
    </div>
  );
}
