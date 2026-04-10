'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './Testimonials.module.css';

const testimonials = [
  {
    quote: "A&T Solutions transformed our front desk operations. We went from missing 40% of calls to handling every single one — even at 2AM. The AI receptionist sounds so natural, our clients don't realize it's AI.",
    name: 'Sarah Mitchell',
    role: 'Operations Director',
    company: 'Apex Medical Group',
    stars: 5,
  },
  {
    quote: "The workflow automation saved our team 20+ hours per week. Reports that took a full day now generate automatically. The ROI was visible within the first month.",
    name: 'James Thornton',
    role: 'CEO',
    company: 'Thornton & Partners LLC',
    stars: 5,
  },
  {
    quote: "Their custom AI agent handles our entire lead pipeline — qualifying, scheduling, and following up. Our conversion rate jumped 35% in the first quarter. Absolutely game-changing.",
    name: 'Priya Kapoor',
    role: 'VP of Sales',
    company: 'NovaTech Industries',
    stars: 5,
  },
  {
    quote: "We evaluated five different AI solutions before choosing A&T. None came close in terms of voice quality, integration depth, and support responsiveness. They're the real deal.",
    name: 'Michael Chen',
    role: 'CTO',
    company: 'Riverstone Ventures',
    stars: 5,
  },
];

export default function Testimonials() {
  const sectionRef = useRef(null);
  const scrollRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);

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

    if (sectionRef.current) observer.observe(sectionRef.current);
    const elements = sectionRef.current?.querySelectorAll('.reveal');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      const card = scrollRef.current.children[activeIdx];
      if (card) {
        card.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    }
  }, [activeIdx]);

  return (
    <section className={`section ${styles.testimonials}`} ref={sectionRef}>
      <div className="container">
        <div className="section-header reveal">
          <span className="label">Testimonials</span>
          <h2 className="section-title">What Our Clients Say</h2>
        </div>

        <div className={styles.carouselWrap}>
          <div className={styles.carousel} ref={scrollRef}>
            {testimonials.map((t, i) => (
              <div
                key={i}
                className={`${styles.card} ${i === activeIdx ? styles.cardActive : ''}`}
                onClick={() => setActiveIdx(i)}
              >
                <div className={styles.stars}>
                  {Array.from({ length: t.stars }).map((_, si) => (
                    <svg key={si} width="16" height="16" viewBox="0 0 16 16" fill="#FFD700">
                      <path d="M8 0l2.47 4.94L16 5.76l-4 3.88.94 5.48L8 12.68l-4.94 2.44.94-5.48-4-3.88 5.53-.82z"/>
                    </svg>
                  ))}
                </div>
                <p className={styles.quote}>&ldquo;{t.quote}&rdquo;</p>
                <div className={styles.author}>
                  <div className={styles.authorAvatar}>
                    {t.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className={styles.authorName}>{t.name}</div>
                    <div className={styles.authorRole}>{t.role}, {t.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className={styles.dots}>
          {testimonials.map((_, i) => (
            <button
              key={i}
              className={`${styles.dot} ${i === activeIdx ? styles.dotActive : ''}`}
              onClick={() => setActiveIdx(i)}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
