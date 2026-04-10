'use client';

import { useEffect, useRef } from 'react';
import styles from './ServicesPreview.module.css';

const services = [
  {
    id: 'receptionist',
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="16" r="8" stroke="currentColor" strokeWidth="2"/>
        <path d="M12 40c0-6.627 5.373-12 12-12s12 5.373 12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M36 12l4-4M36 12l4 4M36 12H32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="38" cy="8" r="3" fill="currentColor" opacity="0.3"/>
      </svg>
    ),
    title: 'AI Receptionist',
    description: 'Never miss a call. Our AI handles scheduling, FAQs, transfers, and follow-ups 24/7 in a natural human voice.',
    span: 'wide',
  },
  {
    id: 'automation',
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="24" r="10" stroke="currentColor" strokeWidth="2"/>
        <circle cx="24" cy="24" r="4" fill="currentColor" opacity="0.3"/>
        <path d="M24 4v6M24 38v6M4 24h6M38 24h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M10 10l4.5 4.5M33.5 33.5l4.5 4.5M10 38l4.5-4.5M33.5 14.5L38 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Workflow Automation',
    description: 'Automate repetitive tasks — emails, CRM updates, reminders, reports — while your team focuses on growth.',
    span: 'normal',
  },
  {
    id: 'leads',
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <path d="M8 8l16 8 16-8v24l-16 8-16-8V8z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
        <path d="M24 16v24M8 8l16 8 16-8" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" opacity="0.5"/>
        <circle cx="24" cy="28" r="4" fill="currentColor" opacity="0.3"/>
      </svg>
    ),
    title: 'Lead Qualification',
    description: 'AI filters and qualifies leads in real-time, books meetings, and delivers summaries straight to your inbox.',
    span: 'normal',
  },
  {
    id: 'agents',
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <rect x="8" y="8" width="32" height="32" rx="4" stroke="currentColor" strokeWidth="2"/>
        <path d="M16 16h4v4h-4zM28 16h4v4h-4zM16 28h4v4h-4zM28 28h4v4h-4z" fill="currentColor" opacity="0.3"/>
        <path d="M20 18h8M20 30h8M18 20v8M30 20v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="24" cy="24" r="3" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
    title: 'Custom AI Agents',
    description: 'We build bespoke AI agents tailored to your industry workflows, APIs, and business logic.',
    span: 'wide',
  },
];

export default function ServicesPreview() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            const title = entry.target.querySelector('.section-title');
            if (title) title.classList.add('revealed');
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = sectionRef.current?.querySelectorAll(`.${styles.card}, .reveal`);
    cards?.forEach((card) => observer.observe(card));
    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section className={`section ${styles.services}`} ref={sectionRef}>
      <div className="container">
        <div className="section-header reveal">
          <span className="label">Our Capabilities</span>
          <h2 className="section-title">What We Do</h2>
          <p className="section-subtitle">
            End-to-end AI solutions that transform how your business operates, communicates, and grows.
          </p>
        </div>

        <div className={styles.grid}>
          {services.map((service, i) => (
            <div
              key={service.id}
              className={`${styles.card} reveal reveal-delay-${i + 1} ${service.span === 'wide' ? styles.cardWide : ''}`}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width - 0.5;
                const y = (e.clientY - rect.top) / rect.height - 0.5;
                e.currentTarget.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-4px)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) translateY(0)';
              }}
            >
              <div className={styles.iconWrap}>{service.icon}</div>
              <h3 className={styles.cardTitle}>{service.title}</h3>
              <p className={styles.cardDesc}>{service.description}</p>
              <div className={styles.cardGlow} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
