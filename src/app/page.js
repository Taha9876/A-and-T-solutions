'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import ROICalculator from '@/components/ROICalculator/ROICalculator';
import { Counter, TiltCard, useCinematicReveal } from '@/components/GSAPEffects/GSAPEffects';
import styles from './page.module.css';

gsap.registerPlugin(ScrollTrigger);

const Hero3D = dynamic(() => import('@/components/HeroScene/Hero3D'), {
  ssr: false,
  loading: () => <div className={styles.splineFallback} />,
});

/* ─── Data ─── */
const stats = [
  { value: 99.8, suffix: '%', decimals: 1, label: 'Lead Capture Precision' },
  { value: 24, suffix: '/7', label: 'Worldwide Operations' },
  { value: 85, suffix: '%', label: 'Cost Reduction Average' },
  { value: 100, suffix: '%', label: 'Call Recovery Rate' },
];

const services = [
  {
    title: 'AI Receptionist',
    desc: 'Never miss a call again. Our AI voice agents handle scheduling, FAQs, and transfers 24/7 — indistinguishable from a human.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
      </svg>
    ),
  },
  {
    title: 'Workflow Automation',
    desc: 'Automate repetitive tasks — emails, CRM updates, reminders, and reports. Your team focuses on what matters.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
  {
    title: 'Lead Qualification',
    desc: 'AI filters and qualifies leads in real-time, books meetings, and sends summaries straight to your inbox.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
      </svg>
    ),
  },
  {
    title: 'Custom AI Agents',
    desc: 'Bespoke AI agents tailored to your industry. We build solutions that integrate with your APIs and workflows.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M9 9h.01M15 9h.01M9 15h6" />
      </svg>
    ),
  },
];

const process_steps = [
  { step: '01', title: 'Discovery', desc: 'Deep-dive into your workflows, pain points, and goals.' },
  { step: '02', title: 'Build & Train', desc: 'We fine-tune AI models calibrated for your business.' },
  { step: '03', title: 'Deploy', desc: 'Go live in days — full support and continuous optimization.' },
];

const testimonials = [
  {
    quote: "A&T Solutions transformed our front desk. We went from missing 40% of calls to handling every single one — even at 2AM.",
    name: 'Sarah Mitchell',
    role: 'Operations Director, Apex Medical',
  },
  {
    quote: "The automation saved our team 20+ hours per week. ROI was visible within the first month. Game-changing.",
    name: 'James Thornton',
    role: 'CEO, Thornton & Partners',
  },
  {
    quote: "Their AI agent handles our entire lead pipeline. Conversion jumped 35% in Q1. Absolutely incredible.",
    name: 'Priya Kapoor',
    role: 'VP Sales, NovaTech Industries',
  },
];

const brands = ['Acme Corp', 'NovaTech', 'Apex Medical', 'Riverstone', 'Global Dynamics', 'Thornton & Co', 'Quantum'];

/* ════════════════════════════════
   MAIN COMPONENT
   ════════════════════════════════ */
export default function Home() {
  const mainRef = useRef(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  /* ── High Profile GSAP Animations ── */
  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add({
      isDesktop: `(min-width: 1024px)`,
      isMobile: `(max-width: 1023px)`
    }, (context) => {
      const { isDesktop } = context.conditions;

      // Helper for high-end reveal
      const cinematicReveal = (target, trigger, delay = 0) => {
        gsap.fromTo(target,
          { 
            y: isDesktop ? 60 : 30, 
            opacity: 0, 
            filter: isDesktop ? 'blur(10px)' : 'none', 
            scale: isDesktop ? 0.95 : 1, 
            rotationX: isDesktop ? 10 : 0 
          },
          {
            y: 0, opacity: 1, filter: 'none', scale: 1, rotationX: 0,
            duration: isDesktop ? 1.2 : 0.8,
            ease: 'power3.out',
            stagger: 0.15,
            delay,
            scrollTrigger: { trigger, start: 'top 85%' }
          }
        );
      };

      // Hero animations
      const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      heroTl
        .fromTo(`.${styles.heroBadge}`,
          { y: 30, opacity: 0, filter: isDesktop ? 'blur(10px)' : 'none', scale: 0.8 },
          { y: 0, opacity: 1, filter: 'none', scale: 1, duration: 1, delay: 0.2 }
        )
        .fromTo(`.${styles.heroTitle}`,
          { y: isDesktop ? 50 : 30, opacity: 0, filter: isDesktop ? 'blur(10px)' : 'none' },
          { y: 0, opacity: 1, filter: 'none', duration: 1.2 }, '-=0.6'
        )
        .fromTo(`.${styles.heroDesc}`,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 1 }, '-=0.8'
        )
        .fromTo(`.${styles.heroActions}`,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 1 }, '-=0.8'
        )
        .fromTo(`.${styles.heroMeta} > *`,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.1 }, '-=0.6'
        );

      // High profile reveals for sections
      cinematicReveal(`.${styles.brandsSection}`, `.${styles.brandsSection}`);
      cinematicReveal(`.${styles.stat}`, `.${styles.statsSection}`);
      cinematicReveal(`.${styles.sectionHead}`, `.${styles.servicesSection}`);
      cinematicReveal(`.${styles.serviceCard}`, `.${styles.servicesGrid}`, 0.2);

      cinematicReveal(`.${styles.processHead}`, `.${styles.processSection}`);
      cinematicReveal(`.${styles.processStep}`, `.${styles.processSteps}`, 0.2);

      cinematicReveal(`.${styles.testimonialsHead}`, `.${styles.testimonialsSection}`);
      cinematicReveal(`.${styles.testimonialCard}`, `.${styles.testimonialsList}`, 0.2);

      // CTA distinct reveal
      gsap.fromTo(`.${styles.ctaContent}`,
        { y: 80, opacity: 0, filter: isDesktop ? 'blur(15px)' : 'none', scale: 0.9 },
        {
          y: 0, opacity: 1, filter: 'none', scale: 1,
          duration: 1.5, ease: 'expo.out',
          scrollTrigger: { trigger: `.${styles.ctaSection}`, start: 'top 80%' }
        }
      );
    });

    return () => mm.revert();
  }, []);

  // Auto rotate testimonials
  useEffect(() => {
    const iv = setInterval(() => setActiveTestimonial(p => (p + 1) % testimonials.length), 5000);
    return () => clearInterval(iv);
  }, []);

  return (
    <div ref={mainRef}>
      <Navbar />

      {/* ═══════ HERO ═══════ */}
      <section className={styles.hero}>
        {/* Gradient background effect */}
        <div className={styles.heroBg}>
          <div className={styles.gradientOrb1} />
          <div className={styles.gradientOrb2} />
          <div className={styles.gradientOrb3} />
          <div className={styles.gridOverlay} />
        </div>

        {/* 3D Scene */}
        <Hero3D />

        <div className={styles.heroInner}>
          <div className={styles.heroText}>
            <div className={styles.heroBadge}>
              <span className={styles.badgePulse} />
              <span className="color-shift-text">Powered by AI</span>
            </div>

            <h1 className={styles.heroTitle}>
              Your Business
              <br />
              <span className={styles.heroHighlight}>Never Sleeps.</span>
            </h1>

            <p className={styles.heroDesc}>
              AI-powered receptionists and automation that work 24/7.
              Zero downtime. Zero missed calls. Infinite growth.
            </p>

            <div className={styles.heroActions}>
              <Link href="/contact" className={`btn btn-primary btn-lg ${styles.ctaBtn}`}>
                Get a Demo
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <Link href="/services" className="btn btn-outline btn-lg">
                Explore Services
              </Link>
            </div>

            <div className={styles.heroMeta}>
              <div className={styles.metaItem}>
                <svg className="color-shift-stroke" width="16" height="16" viewBox="0 0 24 24" fill="none" strokeWidth="2"><path d="M20 6L9 17l-5-5" /></svg>
                No setup fees
              </div>
              <div className={styles.metaItem}>
                <svg className="color-shift-stroke" width="16" height="16" viewBox="0 0 24 24" fill="none" strokeWidth="2"><path d="M20 6L9 17l-5-5" /></svg>
                Cancel anytime
              </div>
              <div className={styles.metaItem}>
                <svg className="color-shift-stroke" width="16" height="16" viewBox="0 0 24 24" fill="none" strokeWidth="2"><path d="M20 6L9 17l-5-5" /></svg>
                24/7 support
              </div>
            </div>
          </div>
        </div>

        <div className={styles.scrollHint}>
          <div className={styles.scrollLine} />
        </div>
      </section>

      {/* ═══════ BRANDS ═══════ */}
      <section className={styles.brandsSection}>
        <div className={styles.brandsDivider} />
        <p className={styles.brandsLabel}>Trusted by forward-thinking companies</p>
        <div className={styles.brandsTrack}>
          <div className={styles.brandsSlide}>
            {[...brands, ...brands].map((b, i) => (
              <span key={i} className={styles.brandName}>{b}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ STATS ═══════ */}
      <section className={styles.statsSection}>
        <div className={`container ${styles.statsGrid}`}>
          {stats.map((s, i) => (
            <TiltCard key={i} className={styles.stat}>
              <Counter value={s.value} suffix={s.suffix} decimals={s.decimals} label={s.label} numberClassName={styles.statNumber} />
            </TiltCard>
          ))}
        </div>
      </section>

      {/* ═══════ SERVICES ═══════ */}
      <section className={styles.servicesSection}>
        <div className="container">
          <div className={styles.sectionHead}>
            <span className="label color-shift-text">Capabilities</span>
            <h2>Everything you need to<br /><span className="gradient-text">automate & scale.</span></h2>
            <p className={styles.sectionDesc}>
              End-to-end AI solutions that transform how your business operates.
            </p>
          </div>
          <div className={styles.servicesGrid}>
            {services.map((s, i) => (
              <TiltCard key={i}>
                <div className={styles.serviceCard}>
                  <div className={`${styles.serviceIcon} color-shift-stroke`}>{s.icon}</div>
                  <h3 className={styles.serviceTitle}>{s.title}</h3>
                  <p className={styles.serviceDesc}>{s.desc}</p>
                  <div className={styles.serviceHoverGlow} />
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ ROI CALCULATOR ═══════ */}
      <ROICalculator />

      {/* ═══════ PROCESS ═══════ */}
      <section className={styles.processSection}>
        <div className="container">
          <div className={styles.processHead}>
            <span className="label color-shift-text">How it works</span>
            <h2>From discovery to deployment<br /><span className="gradient-text">in days, not months.</span></h2>
          </div>
          <div className={styles.processSteps}>
            {process_steps.map((p, i) => (
              <div key={i} className={styles.processStep}>
                <div className={styles.stepNumber}>{p.step}</div>
                <div className={styles.stepLine} />
                <h3 className={styles.stepTitle}>{p.title}</h3>
                <p className={styles.stepDesc}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ TESTIMONIALS ═══════ */}
      <section className={styles.testimonialsSection}>
        <div className="container">
          <div className={styles.testimonialsHead}>
            <span className="label color-shift-text">Testimonials</span>
            <h2>Loved by teams<br /><span className="gradient-text">worldwide.</span></h2>
          </div>
          <div className={styles.testimonialsList}>
            {testimonials.map((t, i) => (
              <TiltCard key={i}>
                <div className={`${styles.testimonialCard} ${i === activeTestimonial ? styles.testimonialActive : ''}`}>
                  <div className={styles.tStars}>
                    {Array.from({ length: 5 }).map((_, si) => (
                      <svg key={si} width="14" height="14" viewBox="0 0 24 24" fill="none" className="color-shift-fill" stroke="none">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                  <p className={styles.tQuote}>&ldquo;{t.quote}&rdquo;</p>
                  <div className={styles.tAuthor}>
                    <div className={`${styles.tAvatar} color-shift-bg`}>
                      {t.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className={styles.tName}>{t.name}</div>
                      <div className={styles.tRole}>{t.role}</div>
                    </div>
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ CTA ═══════ */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaGlow} />
        <div className={`container ${styles.ctaContent}`}>
          <span className="label color-shift-text">Get started</span>
          <h2 className={styles.ctaTitle}>
            Ready to automate<br /><span className="gradient-text">your business?</span>
          </h2>
          <p className={styles.ctaDesc}>
            Join 50+ companies using A&T Solutions to transform operations.
          </p>
          <div className={styles.ctaBtns}>
            <Link href="/contact" className="btn btn-primary btn-lg">
              Start Free Trial
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <Link href="/pricing" className="btn btn-outline btn-lg">
              View Pricing
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
