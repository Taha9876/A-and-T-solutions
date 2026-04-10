'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import Link from 'next/link';
import { useCinematicReveal } from '@/components/GSAPEffects/GSAPEffects';
import styles from './page.module.css';

export default function ServicesPage() {
  // Pre-fill selection so the deploy bar has readable state instantly
  const [config, setConfig] = useState({ 
    role: 'receptionist', 
    voice: 'agent', 
    integration: 'crm', 
    telephony: 'existing',
    languageType: 'multi',
    specificLanguage: ''
  });
  
  // Cinematic scroll reveal tags
  useCinematicReveal(`.${styles.header} > *`, `.${styles.header}`, 0.1);
  useCinematicReveal(`.${styles.serviceSection}`, `.${styles.servicesContainer}`, 0.1);
  useCinematicReveal(`.${styles.configSection}`, `.${styles.configContainer}`, 0.1);

  const handleSelect = (key, value) => {
    setConfig(c => ({ ...c, [key]: value }));
  };

  // Static Services Array (Now rendered as High-Profile Image Sections)
  const servicesList = [
    {
      id: 'receptionist',
      label: 'Voice AI',
      title: 'Precision AI Receptionist',
      imagePath: '/images/services/receptionist.jpg',
      desc: 'Transform your customer experience with an AI that sounds human, understands context, and executes tasks. Our voice agents handle calls site-wide with 99.8% accuracy.',
      features: ['Natural Language Processing', 'Real-time Calendar Integration', 'Instant Lead Escalation']
    },
    {
      id: 'automation',
      label: 'Ecosystem',
      title: 'Enterprise Workflow Automation',
      imagePath: '/images/services/workflow.png',
      desc: 'Connect your entire tech stack into a single, high-performance engine. We eliminate manual overhead by automating complex cross-platform logic.',
      features: ['CRM Sync', 'Automated Processing', 'Custom API Middleware']
    },
    {
      id: 'leads',
      label: 'Pipeline',
      title: 'Smart Lead Qualification',
      imagePath: '/images/services/leads.png',
      desc: 'Never waste time on a dead lead again. Our AI scores and qualifies every prospect based on your unique BANT criteria before they reach your sales team.',
      features: ['Self-Learning Scoring', 'Interactive Chat Qualification', 'Seamless Sales Handoff']
    },
    {
      id: 'agents',
      label: 'Intelligence',
      title: 'Custom Cognitive Agents',
      imagePath: '/images/services/agents.png',
      desc: 'Bespoke AI architectures trained on your proprietary data. From internal knowledge bases to complex decision engines, we build agents that think like your best employees.',
      features: ['Private Data Training (RAG)', 'End-to-End Encryption', 'Multi-Step Reasoning']
    }
  ];

  // Configurator Content
  const roleOptions = [
    { id: 'booking', title: 'Booking Agent', desc: 'Outbound sales, qualification, and calendar slot injection.' },
    { id: 'receptionist', title: 'AI Receptionist', desc: 'Handles front-desk inbound routing & Q&A precisely.' },
    { id: 'automation', title: 'Workflow Automation', desc: 'Headless automation linking CRM triggers to internal actions.' },
    { id: 'support', title: 'Customer Support', desc: '24/7 technical and billing troubleshooting representative.' }
  ];

  const voiceOptions = [
    { id: 'custom', title: 'Custom Voice Clone', desc: 'Clone the voice of your top sales rep for absolute authenticity.' },
    { id: 'agent', title: 'Standard Agent Voice', desc: 'Utilize our premium, conversational pre-trained voice profiles.' },
    { id: 'text', title: 'Text-Only (Headless)', desc: 'No vocal layer. Text-based API manipulation and chatbots.' }
  ];

  const integrationOptions = [
    { id: 'crm', title: 'Native CRM Sync', desc: 'Direct mapping into Salesforce, HubSpot, or GoHighLevel.' },
    { id: 'webhooks', title: 'Custom Webhooks', desc: 'Post JSON payloads directly to your proprietary endpoints.' },
    { id: 'standalone', title: 'Standalone Dashboard', desc: 'Manage all leads and recordings from our private portal.' }
  ];

  const telephonyOptions = [
    { id: 'existing', title: 'Route Existing Number', desc: 'Forward your current business calls directly to the AI routing server.' },
    { id: 'twilio', title: 'Provision Twilio Block', desc: 'Generate fresh automated Twilio local/toll-free numbers explicitly for this agent.' }
  ];

  const linguisticOptions = [
    { id: 'multi', title: 'Global Multilanguage', desc: 'Auto-detect and respond in the caller\'s native language (50+ supported).' },
    { id: 'specific', title: 'Specific Language Focus', desc: 'Optimize the neural engine for one primary specific language.' }
  ];

  const renderGrid = (options, stateKey) => (
    <div className={styles.optionsGrid}>
      {options.map((o) => {
        const isActive = config[stateKey] === o.id;
        return (
          <div 
            key={o.id} 
            className={`${styles.optionCard} ${isActive ? styles.optionCardActive : ''}`}
            onClick={() => handleSelect(stateKey, o.id)}
          >
            <div className={styles.radioIndicator} />
            <div>
              <div className={styles.optionTitle}>{o.title}</div>
              <div className={styles.optionDesc}>{o.desc}</div>
              {isActive && stateKey === 'languageType' && o.id === 'specific' && (
                <div className={styles.inputWrap} onClick={(e) => e.stopPropagation()}>
                  <input 
                    type="text" 
                    placeholder="Enter Language (e.g. Spanish, French)" 
                    className={styles.languageInput}
                    value={config.specificLanguage}
                    onChange={(e) => handleSelect('specificLanguage', e.target.value)}
                  />
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <div className="container">
          <header className={styles.header}>
            <span className="label color-shift-text">Capability Spectrum</span>
            <h1 className={styles.title}>A & T Solutions</h1>
            <p className={styles.subtitle}>
              We deploy high-performance infrastructure designed to scale your operational efficiency beyond human limitations.
            </p>
          </header>

          {/* Static Services Alternating Split Sections Loop */}
          <div className={styles.servicesContainer}>
            {servicesList.map((service, index) => (
              <div key={service.id} className={`${styles.serviceSection} ${index % 2 !== 0 ? styles.serviceSectionReverse : ''}`}>
                
                <div className={styles.serviceContent}>
                  <div className={styles.serviceLabel}>{service.label}</div>
                  <h3 className={styles.serviceCardTitle}>{service.title}</h3>
                  <p className={styles.serviceCardDesc}>{service.desc}</p>
                  <ul className={styles.featureList}>
                    {service.features.map((feat, fi) => (
                      <li key={fi}>{feat}</li>
                    ))}
                  </ul>
                </div>
                
                <div className={styles.serviceVisual}>
                  <img 
                    src={service.imagePath} 
                    alt={service.title} 
                    className={styles.serviceImage}
                  />
                </div>

              </div>
            ))}
          </div>

          <div className={styles.configHeader}>
            <h2 className={styles.title} style={{ fontSize: '3rem' }}>System Architecture</h2>
            <p className={styles.subtitle}>
              Configure your autonomous intelligence layer specifications.
            </p>
          </div>

          <div className={styles.configContainer}>
            
            {/* Core Protocol */}
            <div className={styles.configSection}>
              <div className={styles.sectionHeader}>
                <span className={styles.sectionNumber}>01</span>
                <h2 className={styles.sectionTitle}>Core Protocol</h2>
              </div>
              {renderGrid(roleOptions, 'role')}
            </div>

            {/* Vocal Engine */}
            <div className={styles.configSection}>
              <div className={styles.sectionHeader}>
                <span className={styles.sectionNumber}>02</span>
                <h2 className={styles.sectionTitle}>Vocal Engine</h2>
              </div>
              {renderGrid(voiceOptions, 'voice')}
            </div>

            {/* Ecosystem Hand-off */}
            <div className={styles.configSection}>
              <div className={styles.sectionHeader}>
                <span className={styles.sectionNumber}>03</span>
                <h2 className={styles.sectionTitle}>Ecosystem Integration</h2>
              </div>
              {renderGrid(integrationOptions, 'integration')}
            </div>

            {/* Telephony Framework */}
            <div className={styles.configSection}>
              <div className={styles.sectionHeader}>
                <span className={styles.sectionNumber}>04</span>
                <h2 className={styles.sectionTitle}>Telephony Framework</h2>
              </div>
              {renderGrid(telephonyOptions, 'telephony')}
            </div>

            {/* Linguistic Framework */}
            <div className={styles.configSection}>
              <div className={styles.sectionHeader}>
                <span className={styles.sectionNumber}>05</span>
                <h2 className={styles.sectionTitle}>Linguistic Framework</h2>
              </div>
              {renderGrid(linguisticOptions, 'languageType')}
            </div>

            {/* Final Deploy Footer */}
            <div className={styles.deploySection}>
              <div className={styles.deployInfo}>
                <div className={styles.deployTitle}>Configuration Ready</div>
                <div className={styles.deployDesc}>
                  <span>{roleOptions.find(r => r.id === config.role)?.title}</span>
                  <span className={styles.divider}>/</span>
                  <span>{voiceOptions.find(r => r.id === config.voice)?.title}</span>
                  <span className={styles.divider}>/</span>
                  <span>{integrationOptions.find(r => r.id === config.integration)?.title}</span>
                  <span className={styles.divider}>/</span>
                  <span>{telephonyOptions.find(r => r.id === config.telephony)?.title}</span>
                  <span className={styles.divider}>/</span>
                  <span>{config.languageType === 'multi' ? 'Multilanguage' : (config.specificLanguage || 'Specific Language')}</span>
                </div>
              </div>
              <Link href="/contact" className="btn btn-primary">
                Contact Us
              </Link>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
