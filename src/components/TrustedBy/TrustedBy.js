'use client';

import { useEffect, useRef } from 'react';
import styles from './TrustedBy.module.css';

export default function TrustedBy() {
  const scrollRef = useRef(null);

  useEffect(() => {
    const scroller = scrollRef.current;
    if (scroller) {
      // Clone children for infinite scroll duplicate
      const inner = scroller.querySelector(`.${styles.scrollerInner}`);
      if (inner && !inner.getAttribute('data-cloned')) {
        const children = Array.from(inner.children);
        children.forEach((item) => {
          const clone = item.cloneNode(true);
          // remove class or attributes if necessary
          inner.appendChild(clone);
        });
        inner.setAttribute('data-cloned', 'true');
      }
    }
  }, []);

  return (
    <section className={styles.trustedBy}>
      <div className="container">
        <p className={styles.label}>Trusted by forward-thinking teams worldwide</p>
      </div>
      <div className={styles.scroller} ref={scrollRef}>
        <div className={styles.scrollerInner}>
          <div className={styles.logoItem}>Acme Corp.</div>
          <div className={styles.logoItem}>NovaTech</div>
          <div className={styles.logoItem}>Apex Medical</div>
          <div className={styles.logoItem}>Riverstone Ventures</div>
          <div className={styles.logoItem}>Global Dynamics</div>
          <div className={styles.logoItem}>Thornton & Co</div>
          <div className={styles.logoItem}>Quantum Robotics</div>
        </div>
      </div>
    </section>
  );
}
