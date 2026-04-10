'use client';

import { useEffect, useRef } from 'react';
import styles from './HowItWorks.module.css';

const steps = [
  {
    num: '01',
    title: 'Discovery Call',
    desc: 'We learn your workflow, pain points, and goals through a deep-dive consultation.',
  },
  {
    num: '02',
    title: 'AI Training',
    desc: 'We fine-tune and integrate AI models specifically calibrated for your business processes.',
  },
  {
    num: '03',
    title: 'Go Live',
    desc: 'Deploy in days, not months. Full support, monitoring, and continuous optimization.',
  },
];

export default function HowItWorks() {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            const title = entry.target.querySelector('.section-title');
            if (title) title.classList.add('revealed');
            if (lineRef.current) {
              lineRef.current.style.strokeDashoffset = '0';
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    const cards = sectionRef.current?.querySelectorAll('.reveal');
    cards?.forEach((c) => observer.observe(c));

    return () => observer.disconnect();
  }, []);

  return (
    <section className={`section ${styles.howItWorks}`} ref={sectionRef}>
      <div className="container">
        <div className="section-header reveal">
          <span className="label">The Process</span>
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">
            From first call to full deployment — a streamlined path to AI-powered operations.
          </p>
        </div>

        <div className={styles.timeline}>
          {/* SVG connector line */}
          <svg className={styles.connector} viewBox="0 0 800 4" preserveAspectRatio="none">
            <line
              ref={lineRef}
              x1="0" y1="2" x2="800" y2="2"
              stroke="url(#lineGradient)"
              strokeWidth="2"
              strokeDasharray="800"
              strokeDashoffset="800"
              className={styles.connectorLine}
            />
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00F5FF" stopOpacity="0.1" />
                <stop offset="50%" stopColor="#00F5FF" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#00F5FF" stopOpacity="0.1" />
              </linearGradient>
            </defs>
          </svg>

          {steps.map((step, i) => (
            <div key={i} className={`${styles.step} reveal reveal-delay-${i + 1}`}>
              <div className={styles.numCircle}>
                <span>{step.num}</span>
              </div>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDesc}>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
