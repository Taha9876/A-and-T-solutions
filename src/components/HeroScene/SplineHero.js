'use client';

import { useEffect, useRef } from 'react';

export default function SplineHero() {
  const containerRef = useRef(null);

  useEffect(() => {
    // Ensuring the Spline viewer takes up the background fully and doesn't scroll with the flow
    if (containerRef.current) {
      containerRef.current.style.width = '100%';
      containerRef.current.style.height = '100%';
    }
  }, []);

  return (
    <div 
      ref={containerRef} 
      style={{ 
        position: 'absolute', 
        inset: 0, 
        zIndex: 0,
        pointerEvents: 'auto', // Allow interaction with the 3D model
        opacity: 0.8 // Darken slightly to let text pop
      }}
    >
      <spline-viewer url="https://prod.spline.design/qZzTzW6NMBjT-HwT/scene.splinecode"></spline-viewer>
      {/* 
        Note: The URL above is a cool robotic object/environment from Spline. 
        A placeholder URL from Spline that's an animated robot core. 
       */}
    </div>
  );
}
