'use client';

import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/* ─── WebGL Particle Text Morphing Utilities ─── */
const getTextTargets = (text, count, centered = false) => {
  if (typeof document === 'undefined') return new Float32Array(count * 3);

  const canvas = document.createElement('canvas');
  canvas.width = 1000;
  canvas.height = 250;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });

  ctx.clearRect(0, 0, 1000, 250);
  ctx.fillStyle = 'white';

  const fontSize = text.length > 12 ? 65 : 115;
  ctx.font = `800 ${fontSize}px "Outfit", "Inter", sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.letterSpacing = '-3px';

  ctx.fillText(text.toUpperCase(), 500, 125);

  const imgData = ctx.getImageData(0, 0, 1000, 250).data;
  const validPixels = [];

  for (let y = 0; y < 250; y++) {
    for (let x = 0; x < 1000; x++) {
      const alpha = imgData[(y * 1000 + x) * 4 + 3];
      if (alpha > 40) {
        // Desktop default is shifted right (+3.2) to not overlap hero text
        // Mobile/Small screen should be centered (0)
        const dx = centered ? ((x / 1000) - 0.5) * 8.0 : (((x / 1000) - 0.5) * 8.0) + 3.2;
        const dy = -(((y / 250) - 0.5) * 2.5);
        validPixels.push({ x: dx, y: dy });
      }
    }
  }

  const targets = new Float32Array(count * 3);
  if (validPixels.length === 0) return targets;

  for (let i = 0; i < count; i++) {
    const pixel = validPixels[(i * 17) % validPixels.length] || { x: 0, y: 0 };
    targets[i * 3] = pixel.x + (Math.random() - 0.5) * 0.02;
    targets[i * 3 + 1] = pixel.y + (Math.random() - 0.5) * 0.02;
    targets[i * 3 + 2] = (Math.random() - 0.5) * 0.02;
  }

  return targets;
};

/* ─── Elite Dynamic Prism Stardust ─── */
function CircularParticles({ count = 10000 }) {
  const mesh = useRef();
  const materialRef = useRef();

  // Scratch variables
  const _color = useMemo(() => new THREE.Color(), []);
  const _baseColor = useMemo(() => new THREE.Color(), []);
  const _textColor = useMemo(() => new THREE.Color(), []);

  const system = useMemo(() => {
    // Standard check during initialization
    const isSmall = typeof window !== 'undefined' && window.innerWidth < 1024;
    
    const tA = getTextTargets('A&T SOLUTIONS', count, isSmall);
    const tB = getTextTargets('24/7 AVAILABILITY', count, isSmall);
    const tC = getTextTargets('NO MISSED CALLS', count, isSmall);

    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const mathData = [];

    for (let i = 0; i < count; i++) {
      const radius = 6.0 + Math.random() * 12.0;
      const yOffset = -9.0 + (Math.random() * 18.0);

      mathData.push({
        radius: radius || 1,
        yOffset: yOffset || 0,
        speed: 0.1 + Math.random() * 0.3,
        offset: Math.random() * 1000,
        delay: Math.random() * 0.6
      });

      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }

    return { targets: [tA, tB, tC], positions, colors, mathData };
  }, [count]);

  useEffect(() => {
    if (mesh.current) mesh.current.geometry.computeBoundingSphere();
  }, [system]);

  useFrame((state) => {
    if (!mesh.current || !mesh.current.geometry) return;

    const t = state.clock.elapsedTime;
    const { positions, colors, mathData, targets } = system;

    const phaseDuration = 7;
    const tCycle = t % phaseDuration;
    const phaseIndex = Math.floor((t % (phaseDuration * 3)) / phaseDuration) % 3;
    const currentTarget = targets[phaseIndex];

    // Responsive Camera and Vertical Positioning
    const isMobile = state.size.width < 768;
    const cameraZ = isMobile ? 15 : 10;
    const cameraY = isMobile ? 2.5 : -1;
    
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, cameraZ, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, cameraY, 0.05);
    state.camera.updateProjectionMatrix();

    let masterAssembly = 0;
    let masterDissolve = 0;

    if (tCycle > 1.2 && tCycle <= 3.2) {
      masterAssembly = (tCycle - 1.2) / 2.0;
    } else if (tCycle > 3.2 && tCycle <= 5.5) {
      masterAssembly = 1;
    } else if (tCycle > 5.5 && tCycle <= 7.0) {
      masterDissolve = 1 - ((tCycle - 5.5) / 1.5);
    }

    mesh.current.rotation.y = THREE.MathUtils.lerp(mesh.current.rotation.y, (state.pointer.x * Math.PI) / 18, 0.04);
    mesh.current.rotation.x = THREE.MathUtils.lerp(mesh.current.rotation.x, -(state.pointer.y * Math.PI) / 18, 0.04);

    const geoPos = mesh.current.geometry.attributes.position.array;
    const geoCol = mesh.current.geometry.attributes.color.array;

    for (let i = 0; i < count; i++) {
      const data = mathData[i];
      const i3 = i * 3;

      const angle = t * data.speed + data.offset;
      const swirlX = Math.cos(angle) * data.radius;
      const swirlY = data.yOffset + Math.sin(angle * 0.4) * 1.5;
      const swirlZ = Math.sin(angle) * (data.radius * 0.4);

      const tx = currentTarget[i3];
      const ty = currentTarget[i3 + 1];
      const tz = currentTarget[i3 + 2];

      let localP = 0;
      if (tCycle > 1.2 && tCycle <= 5.5) {
        const linearP = Math.max(0, Math.min(1, (masterAssembly * 1.6) - data.delay));
        localP = tCycle > 3.2 ? 1 : (1 - Math.pow(2, -10 * linearP));
      } else if (tCycle > 5.5 && tCycle <= 7.0) {
        const x = Math.max(0, Math.min(1, (masterDissolve * 1.6) - data.delay));
        localP = x < 0.5 ? 16 * x * x * x * x * x : 1 - Math.pow(-2 * x + 2, 5) / 2;
      }

      geoPos[i3] = swirlX + (tx - swirlX) * localP;
      geoPos[i3 + 1] = swirlY + (ty - swirlY) * localP;
      geoPos[i3 + 2] = swirlZ + (tz - swirlZ) * localP;

      // --- Unified Professional Color Sync ---
      const themeHue = (t * 0.05 + 0.58) % 1;

      _baseColor.setHSL(themeHue, 0.9, 0.4);
      _textColor.setHSL(themeHue, 1.0, 0.5 + localP * 0.3);

      const bloom = 0.5 + localP * 0.5;
      _color.lerpColors(_baseColor, _textColor, localP);
      _color.multiplyScalar(bloom);

      geoCol[i3] = _color.r;
      geoCol[i3 + 1] = _color.g;
      geoCol[i3 + 2] = _color.b;
    }

    mesh.current.geometry.attributes.position.needsUpdate = true;
    mesh.current.geometry.attributes.color.needsUpdate = true;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={system.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={system.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        ref={materialRef}
        size={0.03}
        vertexColors
        transparent
        opacity={1.0}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export default function Hero3D() {
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
      <Canvas
        camera={{ position: [0, -1, 10], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <group position={[0, -0.5, 0]}>
          <CircularParticles count={10000} />
        </group>
      </Canvas>
    </div>
  );
}
