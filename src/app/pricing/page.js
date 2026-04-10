'use client';

import { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCinematicReveal, TiltCard, Counter } from '@/components/GSAPEffects/GSAPEffects';
import styles from './page.module.css';

gsap.registerPlugin(ScrollTrigger);

const plans = [
  {
    name: 'Starter',
    monthlyPrice: 299,
    annualPrice: 239,
    tier: 'Tactical',
    desc: 'The essential toolkit for businesses launching their first AI automation.',
    features: [
      '1 Multi-Modal AI Voice',
      'Up to 1,000 Actionable Minutes',
      'Standard Calendar Integration',
      'Real-time Call Transcripts',
      'Basic Performance Analytics'
    ]
  },
  {
    name: 'Growth',
    monthlyPrice: 599,
    annualPrice: 479,
    popular: true,
    tier: 'Strategic',
    desc: 'Advanced architectures for scaling operations and lead generation.',
    features: [
      '3 Specialized Industry Engines',
      'Up to 10,000 Actionable Minutes',
      'Advanced Lead Qualification',
      'Direct CRM Synchronization',
      'Priority Response & Support',
      'Multi-Step Logic Sequences'
    ]
  },
  {
    name: 'Enterprise',
    monthlyPrice: 'Custom',
    annualPrice: 'Custom',
    tier: 'Empire',
    desc: 'Full-spectrum AI transformation for complex organizational needs.',
    features: [
      'Unlimited Neural Agents',
      'Private RAG Data Training',
      'Proprietary Tool Integration',
      'Dedicated Solution Architects',
      'Custom SLA & Compliance',
      'Executive BI Dashboard'
    ]
  }
];

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(true);

  // Apply Animations
  useCinematicReveal(`.${styles.header} > *`, `.${styles.header}`);
  useCinematicReveal(`.${styles.card}`, `.${styles.grid}`, 0.2);

  return (
    <>
      <Navbar />

      <main className={styles.main}>
        <div className={styles.bgGlow} />
        <div className="container">
          <header className={styles.header}>
            <div className={styles.badge}>
              <span className="label color-shift-text">Investment Tiers</span>
            </div>
            <h1 className={styles.title}>
              Scalable <span className="gradient-text">Intelligence.</span>
            </h1>
            <p className={styles.subtitle}>
              Transparent pricing models designed to deliver immediate ROI.
              Zero implementation friction. Infinite architectural scale.
            </p>

            <div className={styles.toggleWrap}>
              <span className={`${styles.toggleLabel} ${!isAnnual ? styles.activeLabel : ''}`}>Monthly</span>
              <button
                className={`${styles.toggleBtn} ${isAnnual ? styles.toggled : ''}`}
                onClick={() => setIsAnnual(!isAnnual)}
                aria-label="Toggle billing lifecycle"
              >
                <div className={styles.toggleThumb} />
              </button>
              <span className={`${styles.toggleLabel} ${isAnnual ? styles.activeLabel : ''}`}>
                Annual <span className={styles.discount}>Save 20%</span>
              </span>
            </div>
          </header>

          <div className={styles.grid}>
            {plans.map((plan, i) => (
              <TiltCard
                key={i}
                className={`${styles.card} ${plan.popular ? styles.popular : ''}`}
                data-tier={plan.name}
              >
                {plan.popular && (
                  <div className={styles.popularBadge}>
                    <span className={styles.popularDot} />
                    Most Deployed
                  </div>
                )}

                <div className={styles.cardHeader}>
                  <div className={styles.tierName}>{plan.tier} Architecture</div>
                  <h3 className={styles.planName}>{plan.name}</h3>
                  <p className={styles.planDesc}>{plan.desc}</p>
                </div>

                <div className={styles.priceWrap}>
                  {typeof (isAnnual ? plan.annualPrice : plan.monthlyPrice) === 'number' ? (
                    <div className={styles.priceContainer}>
                      <span className={styles.currency}>$</span>
                      <Counter
                        value={isAnnual ? plan.annualPrice : plan.monthlyPrice}
                        className={styles.price}
                      />
                      <span className={styles.period}>/mo</span>
                    </div>
                  ) : (
                    <div className={styles.priceText}>{isAnnual ? plan.annualPrice : plan.monthlyPrice}</div>
                  )}
                  <div className={styles.billingNote}>
                    {typeof plan.monthlyPrice === 'number' && isAnnual
                      ? `Billed yearly ($${(plan.annualPrice * 12).toLocaleString()})`
                      : <>&nbsp;</>}
                  </div>
                </div>

                <div className={styles.divider} />

                <ul className={styles.featureList}>
                  {plan.features.map((feat, fi) => (
                    <li key={fi} className={styles.featureItem}>
                      <div className={styles.checkWrap}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/contact"
                  className={`btn ${plan.popular ? 'btn-primary' : 'btn-outline'} ${styles.planBtn}`}
                >
                  {plan.name === 'Enterprise' ? 'Contact Architecture' : 'Get Started'}
                </Link>

                <div className={styles.cardGlow} />
              </TiltCard>
            ))}
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}


