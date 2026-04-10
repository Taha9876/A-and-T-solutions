'use client';

import { useEffect, useRef } from 'react';
import styles from './CustomCursor.module.css';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const trailRef = useRef(null);

  useEffect(() => {
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let trailX = 0, trailY = 0;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      cursorX += (mouseX - cursorX) * 0.15;
      cursorY += (mouseY - cursorY) * 0.15;
      trailX += (mouseX - trailX) * 0.08;
      trailY += (mouseY - trailY) * 0.08;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${cursorX - 6}px, ${cursorY - 6}px)`;
      }
      if (trailRef.current) {
        trailRef.current.style.transform = `translate(${trailX - 18}px, ${trailY - 18}px)`;
      }

      requestAnimationFrame(animate);
    };

    // Only show custom cursor on desktop
    const isMobile = window.matchMedia('(max-width: 900px)').matches || 'ontouchstart' in window;
    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove);
      animate();
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      <div className={styles.cursor} ref={cursorRef} />
      <div className={styles.trail} ref={trailRef} />
    </>
  );
}
