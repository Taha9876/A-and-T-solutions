'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { 
  MeshTransmissionMaterial, 
  Float, 
  Sphere, 
  TorusKnot, 
  Icosahedron, 
  Dodecahedron,
  Octahedron,
  Box,
  Cylinder,
  Center, 
  Points, 
  PointMaterial, 
  Environment
} from '@react-three/drei';
import * as THREE from 'three';

export default function ServiceModel({ type = 'sphere' }) {
  const meshRef = useRef();
  const innerRef = useRef();
  const eyeL = useRef();
  const eyeR = useRef();
  const pointsRef = useRef();
  
  // ULTRA High-End Glass Material Config
  const config = {
    backside: true,
    backsideThickness: 0.5,
    transmission: 1,
    thickness: 1.2,
    roughness: 0,
    chromaticAberration: 0.15,
    anisotropy: 0.4,
    distortion: 0.1,
    distortionScale: 0.5,
    temporalDistortion: 0.2,
    clearcoat: 1,
    attenuationDistance: 1,
    attenuationColor: '#ffffff',
    color: '#ffffff',
    ior: 1.45
  };

  const coreMat = useMemo(() => new THREE.MeshStandardMaterial({
    emissive: '#ff007f',
    emissiveIntensity: 4,
    color: '#ff007f',
    transparent: true,
    opacity: 1
  }), []);

  const glassMat = <MeshTransmissionMaterial {...config} />;

  useFrame(({ clock }) => {
    const time = clock.elapsedTime;
    
    // Core Rotation & Wobble
    if (meshRef.current) {
        if (type === 'receptionist') {
            meshRef.current.rotation.y = Math.sin(time * 0.5) * 0.2;
            meshRef.current.rotation.x = Math.cos(time * 0.3) * 0.1;
        } else {
            meshRef.current.rotation.y = time * 0.15;
            meshRef.current.rotation.z = time * 0.05;
        }
    }
    
    // Floating organic motion for eyes
    if (eyeL.current && eyeR.current) {
        const pulse = (Math.sin(time * 2) + 1) / 2;
        eyeL.current.scale.setScalar(0.8 + pulse * 0.2);
        eyeR.current.scale.setScalar(0.8 + pulse * 0.2);
    }

    if (innerRef.current) {
        innerRef.current.rotation.y = -time * 0.3;
        innerRef.current.scale.setScalar(1 + Math.sin(time * 3) * 0.1);
    }

    // Dynamic Color Shift
    const t = (Math.sin(time * 0.7) + 1) / 2;
    const colorA = new THREE.Color('#ff007f'); 
    const colorB = new THREE.Color('#00f5ff'); 
    const currentColor = new THREE.Color().copy(colorA).lerp(colorB, t);
    
    coreMat.emissive = currentColor;
    coreMat.color = currentColor;
  });

  return (
    <group>
      <Environment preset="city" />
      
      <Float speed={2.5} rotationIntensity={0.8} floatIntensity={1}>
        
        {/* Receptionist: Minimalist Glass Robot */}
        {type === 'receptionist' && (
          <group ref={meshRef}>
            {/* The Head - Glass Rounded Box */}
            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[1.5, 1.2, 1]} />
                <MeshTransmissionMaterial {...config} thickness={1} chromaticAberration={0.05} />
            </mesh>
            
            {/* The "Neck" - Metallic Cylinder */}
            <mesh position={[0, -0.8, 0]}>
                <cylinderGeometry args={[0.3, 0.4, 0.4, 32]} />
                <meshPhysicalMaterial metalness={1} roughness={0.1} color="#333" />
            </mesh>

            {/* Neural Eyes - Glowing Spheres */}
            <mesh ref={eyeL} position={[-0.4, 0.1, 0.5]} material={coreMat}>
                <sphereGeometry args={[0.15, 32, 32]} />
            </mesh>
            <mesh ref={eyeR} position={[0.4, 0.1, 0.5]} material={coreMat}>
                <sphereGeometry args={[0.15, 32, 32]} />
            </mesh>

            {/* Internal Neural Processing Core */}
            <Icosahedron args={[0.2, 0]} position={[0, -0.2, 0]} material={coreMat} />
            
            {/* Antenna */}
            <mesh position={[0.5, 0.6, 0]}>
                <cylinderGeometry args={[0.02, 0.02, 0.5, 8]} />
                <meshStandardMaterial color="#444" />
            </mesh>
            <mesh position={[0.5, 0.85, 0]} material={coreMat}>
                <sphereGeometry args={[0.04, 16, 16]} />
            </mesh>
          </group>
        )}

        {/* Workflow: Recursive Torus Knot */}
        {type === 'torus' && (
          <group>
            <mesh ref={meshRef}>
              <torusKnotGeometry args={[0.7, 0.15, 256, 32, 3, 5]} />
              <MeshTransmissionMaterial {...config} chromaticAberration={0.3} anisotropy={1} />
            </mesh>
            <Octahedron args={[0.2, 0]} ref={innerRef} material={coreMat} />
          </group>
        )}

        {/* Lead Qual: Radiant Geometric Gem (Dodecahedron) */}
        {type === 'ico' && (
          <group>
            <mesh ref={meshRef}>
              <dodecahedronGeometry args={[1.0, 0]} />
              <MeshTransmissionMaterial {...config} thickness={2} chromaticAberration={0.4} />
            </mesh>
            <Icosahedron args={[0.25, 0]} ref={innerRef} material={coreMat} />
          </group>
        )}

        {/* Cognitive Agents: Hyper-Distorted Neural Mass */}
        {type === 'fluid' && (
          <group>
            <mesh ref={meshRef}>
              <sphereGeometry args={[0.9, 128, 128]} />
              <MeshTransmissionMaterial 
                {...config} 
                distortion={1} 
                distortionScale={1} 
                temporalDistortion={0.5} 
                thickness={2.5} 
              />
            </mesh>
            <TorusKnot args={[0.2, 0.08, 64, 8]} ref={innerRef} material={coreMat} />
          </group>
        )}

      </Float>
    </group>
  );
}
