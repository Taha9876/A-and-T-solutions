'use client';

import { useState } from 'react';
import styles from './UseCases.module.css';

const cases = [
  {
    id: 'healthcare',
    title: 'Healthcare',
    headline: 'Zero Missed Patient Calls',
    desc: 'Medical practices lose revenue when the front desk is overwhelmed. Our AI handles appointment booking, rescheduling, and common triage questions 24/7, securely integrating with your EHR.',
    metrics: ['40% increase in after-hours bookings', '99% patient satisfaction rating']
  },
  {
    id: 'realestate',
    title: 'Real Estate',
    headline: 'Instant Lead Qualification',
    desc: 'Zillow and inbound web leads go cold in minutes. Deploy AI agents that instantly call or text new leads, qualify their budget and timeline, and seamlessly hand off hot prospects to your agents.',
    metrics: ['Response time under 30 seconds', '3x increase in qualified showings']
  },
  {
    id: 'ecommerce',
    title: 'E-commerce',
    headline: 'Automated Post-Purchase Support',
    desc: 'Handle "Where is my order?" (WISMO) and return requests autonomously. The AI connects directly to your Shopify/Logistics backend to provide instant updates.',
    metrics: ['70% reduction in support tickets', '24/7 multilingual coverage']
  },
  {
    id: 'finance',
    title: 'Financial Services',
    headline: 'Secure Data Extraction',
    desc: 'Automatically parse unstructured documents, emails, and forms. Extract critical data into your CRM without human error, accelerating loan processing and client onboarding.',
    metrics: ['Hours of manual entry eliminated', '100% compliance tracking']
  }
];

export default function UseCases() {
  const [activeCase, setActiveCase] = useState(cases[0]);

  return (
    <section className={`section ${styles.useCases}`}>
      <div className="container">
        <div className="section-header reveal">
          <span className="label">Industry Solutions</span>
          <h2 className="section-title">Built for Your Vertical</h2>
        </div>

        <div className={styles.layout}>
          {/* Tabs */}
          <div className={styles.tabsCol}>
            {cases.map((c) => (
              <button
                key={c.id}
                className={`${styles.tabBtn} ${activeCase.id === c.id ? styles.activeTab : ''}`}
                onClick={() => setActiveCase(c)}
              >
                {c.title}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className={styles.contentCol}>
            <div className={styles.contentBox}>
              <h3 className={styles.headline}>{activeCase.headline}</h3>
              <p className={styles.desc}>{activeCase.desc}</p>
              
              <div className={styles.metricsRow}>
                {activeCase.metrics.map((m, i) => (
                  <div key={i} className={styles.metricItem}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--cyan)" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>{m}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
