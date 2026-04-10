'use client';

import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import styles from './LoadingScreen.module.css';

export default function LoadingScreen() {
  const [percent, setPercent] = useState(0);
  const screenRef = useRef(null);
  const logoRef = useRef(null);
  const barRef = useRef(null);

  useEffect(() => {
    // Simulated Progress
    const interval = setInterval(() => {
      setPercent(p => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        return p + Math.floor(Math.random() * 5) + 2;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (percent >= 100) {
      // Exit Animation
      const tl = gsap.timeline();
      tl.to(logoRef.current, { opacity: 0, scale: 1.1, duration: 0.6, ease: 'power2.in' })
        .to(screenRef.current, { 
          yPercent: -100, 
          duration: 1, 
          ease: 'power4.inOut',
          onComplete: () => {
             if (screenRef.current) screenRef.current.style.display = 'none';
          }
        }, '-=0.2');
    }
  }, [percent]);

  return (
    <div className={styles.container} ref={screenRef}>
      <div className={styles.content}>
        <div className={styles.logo} ref={logoRef}>
          <span className={styles.letterA}>A</span>
          <span className={styles.amp}>&</span>
          <span className={styles.letterT}>T</span>
          <div className={styles.logoGlow} />
        </div>
        
        <div className={styles.progressWrap}>
          <div className={styles.progressBar} ref={barRef} style={{ width: `${percent}%` }} />
          <div className={styles.progressText}>{percent}%</div>
        </div>
        
        <div className={styles.tagline}>INTELLIGENT AUTOMATION. UNMATCHED SCALE.</div>
      </div>
      
      <div className={styles.noise} />
    </div>
  );
}
