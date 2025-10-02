import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function ParticleField() {
  const ref = useRef<THREE.Points>(null);
  
  const particlesCount = 3000;
  const positions = useMemo(() => {
    const pos = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 60;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 60;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 60;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
      ref.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#7c3aed"
        size={0.15}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

function WaveGrid() {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ref.current) {
      const time = state.clock.elapsedTime;
      const geometry = ref.current.geometry;
      const position = geometry.attributes.position;
      
      for (let i = 0; i < position.count; i++) {
        const x = position.getX(i);
        const z = position.getZ(i);
        const wave = Math.sin(x * 0.5 + time) * Math.cos(z * 0.5 + time) * 2;
        position.setY(i, wave);
      }
      
      position.needsUpdate = true;
    }
  });

  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]} position={[0, -10, 0]}>
      <planeGeometry args={[50, 50, 50, 50]} />
      <meshBasicMaterial
        color="#0ea5e9"
        wireframe
        transparent
        opacity={0.15}
      />
    </mesh>
  );
}

function FloatingRupeeSymbols() {
  const groupRef = useRef<THREE.Group>(null);
  
  const symbols = useMemo(() => {
    return Array.from({ length: 15 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 40
      ] as [number, number, number],
      rotation: Math.random() * Math.PI * 2,
      scale: 0.3 + Math.random() * 0.5
    }));
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      groupRef.current.children.forEach((child, i) => {
        child.position.y = symbols[i].position[1] + Math.sin(state.clock.elapsedTime + i) * 2;
      });
    }
  });

  return (
    <group ref={groupRef}>
      {symbols.map((symbol, i) => (
        <mesh key={i} position={symbol.position} rotation={[symbol.rotation, symbol.rotation, 0]} scale={symbol.scale}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshBasicMaterial
            color="#10b981"
            transparent
            opacity={0.3}
            wireframe
          />
        </mesh>
      ))}
    </group>
  );
}

function CoinRings() {
  const ringsRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (ringsRef.current) {
      ringsRef.current.rotation.z = state.clock.elapsedTime * 0.2;
      ringsRef.current.children.forEach((ring, i) => {
        ring.rotation.x = state.clock.elapsedTime * 0.3 * (i % 2 === 0 ? 1 : -1);
      });
    }
  });

  return (
    <group ref={ringsRef} position={[0, 0, -20]}>
      {[0, 1, 2].map((i) => (
        <mesh key={i} rotation={[0, 0, (i * Math.PI) / 3]}>
          <torusGeometry args={[8 + i * 3, 0.3, 16, 100]} />
          <meshBasicMaterial
            color={i === 0 ? '#7c3aed' : i === 1 ? '#0ea5e9' : '#10b981'}
            transparent
            opacity={0.2}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function EnhancedParticleBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 25], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <ParticleField />
        <WaveGrid />
        <FloatingRupeeSymbols />
        <CoinRings />
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background pointer-events-none" />
    </div>
  );
}
