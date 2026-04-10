'use client';

import { useGLTF, Float, Environment, Stage } from '@react-three/drei';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export default function ModelViewer({ url, scale = 1, position = [0, 0, 0], rotation = [0, 0, 0], animation = true }) {
  const { scene } = useGLTF(url);
  const group = useRef();

  useFrame((state) => {
    if (!animation || !group.current) return;
    const t = state.clock.getElapsedTime();
    group.current.position.y = position[1] + Math.sin(t * 0.5) * 0.1;
    group.current.rotation.y = rotation[1] + Math.sin(t * 0.2) * 0.1;
  });

  return (
    <group ref={group} position={position} rotation={rotation} scale={scale}>
      <primitive object={scene} />
    </group>
  );
}
