'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Points, PointMaterial, Text, Billboard, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

function ParticleGlobe({ count = 2000 }) {
  const points = useRef();
  const mat = useRef();

  // Create particles on a sphere surface
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        const theta = Math.random() * 2 * Math.PI;
        const phi = Math.acos((Math.random() * 2) - 1);
        const radius = 2.4 + (Math.random() * 0.1); 

        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.sin(phi) * Math.sin(theta);
        const z = radius * Math.cos(phi);

        positions.set([x, y, z], i * 3);
    }
    return positions;
  }, [count]);

  useFrame((state, delta) => {
    if (points.current) {
        points.current.rotation.y += delta * 0.05;
        points.current.rotation.x += delta * 0.02;
    }
    const t = (Math.sin(state.clock.elapsedTime) + 1) / 2;
    if(mat.current) mat.current.color.lerpColors(new THREE.Color(0xFFFFFF), new THREE.Color(0x888888), t);
  });

  return (
    <Points ref={points} positions={particlesPosition} stride={3} frustumCulled={false}>
      <PointMaterial
        ref={mat}
        transparent
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.8}
      />
    </Points>
  );
}

function ConnectionLines({ count = 100 }) {
   const groupRef = useRef();
   const mat = useRef();

   const lines = useMemo(() => {
     const pts = [];
     for(let i = 0; i < count; i++) {
        const theta = Math.random() * 2 * Math.PI;
        const phi = Math.acos((Math.random() * 2) - 1);
        const r = 2.5;
        pts.push(new THREE.Vector3(
            r * Math.sin(phi) * Math.cos(theta),
            r * Math.sin(phi) * Math.sin(theta),
            r * Math.cos(phi)
        ));
     }

     const geometry = new THREE.BufferGeometry();
     const vertices = [];
     for(let i=0; i<pts.length; i++){
         for(let j=i+1; j<pts.length; j++){
             if(pts[i].distanceTo(pts[j]) < 1.3) {
                 vertices.push(pts[i].x, pts[i].y, pts[i].z);
                 vertices.push(pts[j].x, pts[j].y, pts[j].z);
             }
         }
     }
     geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
     return geometry;
   }, [count]);

   useFrame((state, delta) => {
       if(groupRef.current){
           groupRef.current.rotation.y += delta * 0.04;
           groupRef.current.rotation.z += delta * 0.01;
       }
       const t = (Math.sin(state.clock.elapsedTime) + 1) / 2;
       if(mat.current) mat.current.color.lerpColors(new THREE.Color(0xFFFFFF), new THREE.Color(0x666666), t);
   });

   return (
       <lineSegments ref={groupRef} geometry={lines}>
           <lineBasicMaterial 
               ref={mat}
               transparent 
               opacity={0.15} 
               blending={THREE.AdditiveBlending} 
           />
       </lineSegments>
   );
}

function CoreSpheres() {
    const distortMat = useRef();
    const innerMat = useRef();

    useFrame(({ clock }) => {
        const t = (Math.sin(clock.elapsedTime) + 1) / 2;
        if(distortMat.current) {
            distortMat.current.color.lerpColors(new THREE.Color(0xFFFFFF), new THREE.Color(0x666666), t);
            distortMat.current.emissive.lerpColors(new THREE.Color(0xAAAAAA), new THREE.Color(0x333333), t);
        }
        if(innerMat.current) {
            innerMat.current.color.lerpColors(new THREE.Color(0xFFFFFF), new THREE.Color(0x888888), t);
            innerMat.current.emissive.lerpColors(new THREE.Color(0x666666), new THREE.Color(0x222222), t);
        }
    });

    return (
        <group>
            {/* Core pulsing abstract sphere */}
            <Sphere args={[1.5, 64, 64]} >
              <MeshDistortMaterial
                ref={distortMat}
                emissiveIntensity={0.5}
                distort={0.4}
                speed={2}
                roughness={0.2}
                metalness={0.8}
                wireframe={true}
              />
            </Sphere>

            <Sphere args={[1.2, 32, 32]}>
                 <meshStandardMaterial 
                    ref={innerMat}
                    emissiveIntensity={1}
                    transparent 
                    opacity={0.1}
                 />
            </Sphere>
        </group>
    );
}

function FloatingBubbles() {
  const groupRef = useRef();
  const P_DATA = [
    { text: "24/7 Active", radius: 1.8, speed: 0.8, phase: 0, yOffset: 0.9, colorType: 'gradient' },
    { text: "No Missed Calls", radius: 2.1, speed: 0.6, phase: Math.PI / 3, yOffset: 0.15, colorType: 'pink' },
    { text: "Time Saving", radius: 1.9, speed: 0.7, phase: Math.PI / 1.5, yOffset: -0.9, colorType: 'purple' },
    { text: "Always Polite", radius: 2.2, speed: 0.65, phase: Math.PI, yOffset: 0.6, colorType: 'gradient' },
    { text: "Infinite Memory", radius: 2.0, speed: 0.75, phase: Math.PI * 1.33, yOffset: -0.4, colorType: 'pink' },
    { text: "Instant Analysis", radius: 2.3, speed: 0.55, phase: Math.PI * 1.66, yOffset: 0.3, colorType: 'purple' }
  ];

  useFrame(({ clock }) => {
     if(groupRef.current) {
        groupRef.current.rotation.y = clock.elapsedTime * 0.15;
     }
  });

  return (
    <group ref={groupRef}>
      {P_DATA.map((d, i) => (
         <ParticleBubble key={i} data={d} />
      ))}
    </group>
  );
}

function ParticleBubble({ data }) {
   const ref = useRef();
   const matRef = useRef();
   const bgRef = useRef();

   useFrame(({ clock }) => {
       const time = clock.elapsedTime;
       // Use a slight bounce effect on scale
       const rawScale = Math.sin(time * data.speed + data.phase);
       const scale = Math.max(0, rawScale) * 1.0; 
       
       if(ref.current) {
           ref.current.scale.setScalar(scale);
       }
       if(matRef.current) {
           matRef.current.fillOpacity = Math.min(1, scale);
           // Color logic handling
           if (data.colorType === 'gradient') {
               const colorShift = (Math.sin(time * 1.5 + data.phase) + 1) / 2;
               const tempColor = new THREE.Color("#ff007f");
               tempColor.lerp(new THREE.Color("#00f5ff"), colorShift);
               matRef.current.color = tempColor;
           }
       }
       if(bgRef.current) {
           bgRef.current.opacity = Math.min(0.25, scale * 0.25);
       }
   });

   const x = Math.cos(data.phase) * data.radius;
   const z = Math.sin(data.phase) * data.radius;
   
   // Approximate badge physical width based on characters
   const badgeWidth = data.text.length * 0.12 + 0.3;

   return (
      <group position={[x, data.yOffset || 0, z]} ref={ref}>
         <Billboard follow={true}>
             {/* Text Layer */}
             <Text 
                ref={matRef}
                fontSize={0.2}
                color={data.colorType === 'pink' ? "#ff007f" : (data.colorType === 'purple' ? "#a855f7" : "#ffffff")}
                anchorX="center"
                anchorY="middle"
                position={[0, 0, 0.05]}
                letterSpacing={0.05}
                fontWeight="bold"
             >
                {data.text}
             </Text>
             
             {/* 3D Glass Bubble Container Layer */}
             <RoundedBox args={[badgeWidth, 0.45, 0.05]} radius={0.2} smoothness={8} position={[0, 0, 0]}>
                 <meshStandardMaterial 
                    ref={bgRef}
                    color="#ffffff" 
                    transparent 
                    opacity={0.25} 
                    roughness={0} 
                    metalness={0.9}
                    emissive="#ffffff"
                    emissiveIntensity={0.2}
                 />
             </RoundedBox>
         </Billboard>
      </group>
   );
}

export default function Contact3D() {
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'auto', cursor: 'grab' }}>
      <Canvas
        camera={{ position: [0, 0, 7], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          autoRotate 
          autoRotateSpeed={0.5}
        />

        <CoreSpheres />

        {/* Global Particles */}
        <ParticleGlobe count={3000} />

        {/* Neural Network Lines connecting around the globe */}
        <ConnectionLines count={120} />

        {/* Floating Bubble Text Nodes */}
        <FloatingBubbles />
      </Canvas>
    </div>
  );
}
