'use client';

import { useEffect, useRef, useState } from 'react';

export default function SplineScene() {
  const containerRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    // Check if spline-viewer is already defined
    if (customElements.get('spline-viewer')) {
      setLoaded(true);
      return;
    }

    // Load spline-viewer script dynamically
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://unpkg.com/@splinetool/viewer@1.9.82/build/spline-viewer.js';
    script.onload = () => setLoaded(true);
    document.head.appendChild(script);

    return () => {
      // Cleanup if needed
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        opacity: loaded ? 0.85 : 0,
        transition: 'opacity 1.5s ease',
        pointerEvents: 'auto',
      }}
    >
      <spline-viewer
        url="https://prod.spline.design/6Wq1Q7YGyM-uBzHj/scene.splinecode"
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}
