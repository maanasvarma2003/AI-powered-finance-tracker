import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function ParticleField() {
  const ref = useRef<THREE.Points>(null);
  
  const particlesCount = 5000;
  const positions = useMemo(() => {
    const pos = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount; i++) {
      const radius = 30 + Math.random() * 30;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      const time = state.clock.elapsedTime;
      ref.current.rotation.x = Math.sin(time * 0.1) * 0.2;
      ref.current.rotation.y = time * 0.03;
      
      const positions = ref.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particlesCount; i++) {
        const i3 = i * 3;
        const x = positions[i3];
        const y = positions[i3 + 1];
        const z = positions[i3 + 2];
        
        positions[i3 + 1] = y + Math.sin(time + x * 0.1) * 0.02;
      }
      ref.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#7c3aed"
        size={0.2}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.8}
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
    return Array.from({ length: 25 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 50
      ] as [number, number, number],
      rotation: Math.random() * Math.PI * 2,
      scale: 0.4 + Math.random() * 0.7,
      speed: 0.5 + Math.random() * 1.5
    }));
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime;
      groupRef.current.rotation.y = time * 0.05;
      groupRef.current.children.forEach((child, i) => {
        const symbol = symbols[i];
        child.position.y = symbol.position[1] + Math.sin(time * symbol.speed + i) * 3;
        child.rotation.x = time * 0.5 + i;
        child.rotation.z = time * 0.3 + i;
        
        // Pulsing effect
        const scale = symbol.scale + Math.sin(time * 2 + i) * 0.1;
        child.scale.set(scale, scale, scale);
      });
    }
  });

  return (
    <group ref={groupRef}>
      {symbols.map((symbol, i) => (
        <mesh key={i} position={symbol.position} rotation={[symbol.rotation, symbol.rotation, 0]} scale={symbol.scale}>
          <octahedronGeometry args={[1, 0]} />
          <meshBasicMaterial
            color={i % 3 === 0 ? '#10b981' : i % 3 === 1 ? '#0ea5e9' : '#7c3aed'}
            transparent
            opacity={0.4}
            wireframe
          />
        </mesh>
      ))}
    </group>
  );
}

function DataStreams() {
  const groupRef = useRef<THREE.Group>(null);
  
  const streams = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => ({
      angle: (i / 8) * Math.PI * 2,
      radius: 15 + i * 2,
      speed: 0.5 + Math.random() * 1
    }));
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime;
      groupRef.current.children.forEach((line, i) => {
        const stream = streams[i];
        const angle = stream.angle + time * stream.speed * 0.2;
        const x = Math.cos(angle) * stream.radius;
        const z = Math.sin(angle) * stream.radius;
        line.position.set(x, 0, z);
        line.rotation.y = angle + Math.PI / 2;
      });
    }
  });

  return (
    <group ref={groupRef}>
      {streams.map((_, i) => (
        <mesh key={i}>
          <boxGeometry args={[0.1, 30, 0.1]} />
          <meshBasicMaterial
            color="#7c3aed"
            transparent
            opacity={0.3}
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
      <Canvas camera={{ position: [0, 0, 30], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#7c3aed" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#0ea5e9" />
        <ParticleField />
        <WaveGrid />
        <FloatingRupeeSymbols />
        <CoinRings />
        <DataStreams />
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_hsl(var(--background))_100%)] pointer-events-none" />
    </div>
  );
}
