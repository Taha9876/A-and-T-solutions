'use client';

import { useEffect, useRef } from 'react';
import styles from './StatsBar.module.css';

const stats = [
  { value: 10000, suffix: '+', label: 'Calls Handled' },
  { value: 99.97, suffix: '%', label: 'Uptime', decimals: 2 },
  { value: 3, suffix: 'min', label: 'Avg Response' },
  { value: 50, suffix: '+', label: 'Businesses Automated' },
];

function animateCounter(el, target, suffix, decimals = 0) {
  const duration = 2000;
  const start = performance.now();

  const tick = (now) => {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = eased * target;

    if (decimals > 0) {
      el.textContent = current.toFixed(decimals) + suffix;
    } else {
      el.textContent = Math.floor(current).toLocaleString() + suffix;
    }

    if (progress < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

export default function StatsBar() {
  const containerRef = useRef(null);
  const animated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animated.current) {
            animated.current = true;
            const counters = containerRef.current.querySelectorAll('[data-counter]');
            counters.forEach((el) => {
              const target = parseFloat(el.dataset.target);
              const suffix = el.dataset.suffix || '';
              const decimals = parseInt(el.dataset.decimals || '0');
              animateCounter(el, target, suffix, decimals);
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.statsBar} ref={containerRef}>
      <div className={styles.inner}>
        {stats.map((stat, i) => (
          <div key={i} className={styles.stat}>
            <span
              className={styles.value}
              data-counter
              data-target={stat.value}
              data-suffix={stat.suffix}
              data-decimals={stat.decimals || 0}
            >
              0
            </span>
            <span className={styles.label}>{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
