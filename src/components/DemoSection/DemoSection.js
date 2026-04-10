'use client';

import { useEffect, useRef } from 'react';
import styles from './DemoSection.module.css';

const features = [
  'Multilingual',
  'Emotion-aware',
  'Calendar sync',
  'CRM integration',
  'Instant Escalation',
];

export default function DemoSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.15 }
    );

    const elements = sectionRef.current?.querySelectorAll('.reveal');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section className={`section ${styles.demo}`} ref={sectionRef}>
      <div className={`container ${styles.inner}`}>
        {/* 3D Visual / Avatar Area */}
        <div className={`${styles.visual} reveal`}>
          <div className={styles.avatar}>
            <div className={styles.rings}>
              <div className={styles.ring1} />
              <div className={styles.ring2} />
              <div className={styles.ring3} />
            </div>
            <div className={styles.avatarCore}>
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                <circle cx="40" cy="28" r="14" stroke="#00F5FF" strokeWidth="2" />
                <path d="M16 68c0-13.255 10.745-24 24-24s24 10.745 24 24" stroke="#00F5FF" strokeWidth="2" strokeLinecap="round" />
                <circle cx="40" cy="28" r="6" fill="#00F5FF" opacity="0.2" />
                <circle cx="34" cy="26" r="2" fill="#00F5FF" opacity="0.5" />
                <circle cx="46" cy="26" r="2" fill="#00F5FF" opacity="0.5" />
                <path d="M36 33c2 2 6 2 8 0" stroke="#00F5FF" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <div className={styles.statusDot} />
          </div>
        </div>

        {/* Text Content */}
        <div className={`${styles.content} reveal reveal-delay-2`}>
          <span className="label">Interactive AI</span>
          <h2 className={styles.title}>
            Meet <span className={styles.ariaName}>ARIA</span> — Your AI Receptionist
          </h2>
          <p className={styles.desc}>
            ARIA is our flagship AI receptionist, built with state-of-the-art language models. 
            She understands context, handles complex queries, and delivers a seamless experience 
            that your callers won&apos;t believe isn&apos;t human.
          </p>
          <div className={styles.features}>
            {features.map((feat, i) => (
              <div key={i} className={styles.featureItem}>
                <span className={styles.featureCheck}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8l3.5 3.5L13 5" stroke="#00F5FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                {feat}
              </div>
            ))}
          </div>
          <a href="/contact" className="btn btn-primary btn-lg btn-pulse" style={{ marginTop: '32px' }}>
            Try a Live Demo
          </a>
        </div>
      </div>
    </section>
  );
}
