'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function HeroScene() {
  const mountRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!mountRef.current) return;

    const container = mountRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Create neural network sphere
    const geometry = new THREE.IcosahedronGeometry(2, 3);
    const positions = geometry.attributes.position;
    const nodePositions = [];

    for (let i = 0; i < positions.count; i++) {
      nodePositions.push(new THREE.Vector3(
        positions.getX(i),
        positions.getY(i),
        positions.getZ(i)
      ));
    }

    // Nodes (points)
    const nodeGeometry = new THREE.BufferGeometry();
    const nodeVerts = new Float32Array(nodePositions.length * 3);
    const nodeSizes = new Float32Array(nodePositions.length);

    nodePositions.forEach((pos, i) => {
      nodeVerts[i * 3] = pos.x;
      nodeVerts[i * 3 + 1] = pos.y;
      nodeVerts[i * 3 + 2] = pos.z;
      nodeSizes[i] = Math.random() * 3 + 2;
    });

    nodeGeometry.setAttribute('position', new THREE.BufferAttribute(nodeVerts, 3));
    nodeGeometry.setAttribute('size', new THREE.BufferAttribute(nodeSizes, 1));

    const nodeMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color(0x00F5FF) },
      },
      vertexShader: `
        attribute float size;
        uniform float uTime;
        varying float vAlpha;
        void main() {
          vAlpha = 0.5 + 0.5 * sin(uTime * 2.0 + position.x * 3.0 + position.y * 2.0);
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (200.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        varying float vAlpha;
        void main() {
          float dist = length(gl_PointCoord - vec2(0.5));
          if (dist > 0.5) discard;
          float glow = 1.0 - dist * 2.0;
          glow = pow(glow, 1.5);
          gl_FragColor = vec4(uColor, glow * vAlpha * 0.9);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const nodes = new THREE.Points(nodeGeometry, nodeMaterial);
    scene.add(nodes);

    // Connections (lines between nearby nodes)
    const linePositions = [];
    const threshold = 0.95;

    for (let i = 0; i < nodePositions.length; i++) {
      for (let j = i + 1; j < nodePositions.length; j++) {
        const dist = nodePositions[i].distanceTo(nodePositions[j]);
        if (dist < threshold) {
          linePositions.push(
            nodePositions[i].x, nodePositions[i].y, nodePositions[i].z,
            nodePositions[j].x, nodePositions[j].y, nodePositions[j].z
          );
        }
      }
    }

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));

    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x00F5FF,
      transparent: true,
      opacity: 0.12,
      blending: THREE.AdditiveBlending,
    });

    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

    // Group for rotation
    const group = new THREE.Group();
    group.add(nodes);
    group.add(lines);
    scene.add(group);
    scene.remove(nodes);
    scene.remove(lines);

    // Mouse tracking
    const handleMouseMove = (e) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation
    const clock = new THREE.Clock();
    let animId;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      nodeMaterial.uniforms.uTime.value = time;

      // Auto rotation
      group.rotation.y = time * 0.15;
      group.rotation.x = Math.sin(time * 0.1) * 0.1;

      // Mouse parallax
      const targetRotX = mouseRef.current.y * 0.3;
      const targetRotY = mouseRef.current.x * 0.3;
      group.rotation.x += (targetRotX - group.rotation.x + Math.sin(time * 0.1) * 0.1) * 0.02;
      group.rotation.y += (targetRotY + time * 0.15 - group.rotation.y) * 0.02;

      renderer.render(scene, camera);
    };
    animate();

    // Resize
    const handleResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} style={{ position: 'absolute', inset: 0, zIndex: 0 }} />;
}
