import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, ContactShadows, Float, useTexture } from '@react-three/drei';
import { useRef, Suspense } from 'react';
import * as THREE from 'three';

function WavyFabric() {
  const meshRef = useRef();
  // Memuat tekstur kain dari folder public
  const texture = useTexture('/fabric2.jpg'); 
  
  // Membuat lipatan kain melengkung
  const geometry = new THREE.PlaneGeometry(10, 10, 64, 64);
  const positionAttribute = geometry.attributes.position;
  for (let i = 0; i < positionAttribute.count; i++) {
    const x = positionAttribute.getX(i);
    const y = positionAttribute.getY(i);
    // Rumus gelombang agar kain terlihat melengkung 3D
    const z = Math.sin(x * 0.5) * Math.cos(y * 0.5) * 1.5; 
    positionAttribute.setZ(i, z);
  }
  geometry.computeVertexNormals();

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      // Animasi bergerak sangat pelan
      meshRef.current.rotation.z = Math.sin(time * 0.1) * 0.1;
      meshRef.current.rotation.y = Math.cos(time * 0.15) * 0.1;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={meshRef} geometry={geometry}>
        <meshPhysicalMaterial
          map={texture}
          color="#2A0A3A" // Sentuhan warna ungu gelap (Deep Purple)
          metalness={0.4}
          roughness={0.7}
          clearcoat={0.5}
          side={THREE.DoubleSide}
        />
      </mesh>
    </Float>
  );
}

export default function Hero3D() {
  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
      <ambientLight intensity={0.2} />
      {/* Pencahayaan dramatis seperti di studio foto */}
      <directionalLight position={[5, 10, 5]} intensity={2} color="#ffffff" />
      <directionalLight position={[-10, -5, -5]} intensity={1} color="#C9A227" />
      <spotLight position={[0, 5, 5]} intensity={3} penumbra={1} castShadow color="#8A2BE2" />
      
      <Suspense fallback={null}>
        <WavyFabric />
        {/* Bayangan di bawah kain agar terlihat nyata */}
        <ContactShadows position={[0, -3, 0]} opacity={0.8} scale={15} blur={3} far={10} color="#000000" />
        <Environment preset="studio" />
      </Suspense>
    </Canvas>
  );
}