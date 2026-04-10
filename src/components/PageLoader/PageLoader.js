'use client';

import { useEffect, useRef } from 'react';
import styles from './PageLoader.module.css';

export default function PageLoader() {
  const loaderRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (loaderRef.current) {
        loaderRef.current.classList.add(styles.done);
      }
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles.loader} ref={loaderRef}>
      <div className={styles.letters}>
        <span className={styles.letter} style={{ animationDelay: '0.1s' }}>A</span>
        <span className={`${styles.letter} ${styles.amp}`} style={{ animationDelay: '0.3s' }}>&</span>
        <span className={styles.letter} style={{ animationDelay: '0.5s' }}>T</span>
      </div>
    </div>
  );
}
