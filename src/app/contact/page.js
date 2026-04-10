'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import { useCinematicReveal } from '@/components/GSAPEffects/GSAPEffects';
import Contact3D from '@/components/Contact3D/Contact3D';
import styles from './page.module.css';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: 'receptionist',
    message: ''
  });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  // Apply Animations
  useCinematicReveal(`.${styles.content} > *`, `.${styles.container}`);
  useCinematicReveal(`.${styles.formWrap}`, `.${styles.container}`, 0.3);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setStatus('Strategic Inquiry Received. Our solution architects will contact you shortly.');
      setFormData({ name: '', email: '', company: '', service: 'receptionist', message: '' });
    }, 2000);
  };

  return (
    <>
      <Navbar />

      <main className={styles.main}>
        <div className={styles.container}>

          {/* Left Visual Side: Animated Nexus */}
          <div className={styles.visualSide}>
            <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
              <Contact3D />
            </div>

            <div style={{ position: 'absolute', bottom: '10%', left: '10%', zIndex: 20 }}>
              <span className="label color-shift-text" style={{ fontSize: '0.7rem' }}>Neural Link Active</span>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--white)', marginTop: '8px' }}>Tactical Coordination</h2>
            </div>
          </div>

          {/* Right Form Side: The Command Form */}
          <div className={styles.formSide}>
            <div className={styles.formContainer}>
              <header className={styles.header}>
                <span className="label color-shift-text">Nexus Point</span>
                <h1 className={styles.title}>Secure Your Future.</h1>
                <p className={styles.desc}>
                  Initiate elite AI architectural deployment. Deploy your project into the A&T solutions ecosystem.
                </p>
              </header>

              <div className={styles.formWrap}>
                <form className={styles.form} onSubmit={handleSubmit}>
                  <div className={styles.formRow}>
                    <div className={styles.inputGroup}>
                      <label>Principal Name</label>
                      <input
                        type="text"
                        name="name"
                        placeholder="Jane Doe"
                        required
                        className={styles.input}
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>
                    <div className={styles.inputGroup}>
                      <label>Enterprise Email</label>
                      <input
                        type="email"
                        name="email"
                        placeholder="jane@company.com"
                        required
                        className={styles.input}
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className={styles.inputGroup}>
                    <label>Deployment Vertical</label>
                    <select
                      name="service"
                      className={styles.input}
                      value={formData.service}
                      onChange={handleChange}
                    >
                      <option value="receptionist">AI Receptionist Vision</option>
                      <option value="automation">Workflow Ecosystem Automation</option>
                      <option value="leads">Intelligent Lead Qualification</option>
                      <option value="custom">Custom Agent Architecture</option>
                    </select>
                  </div>

                  <div className={styles.inputGroup}>
                    <label>Strategic Objectives</label>
                    <textarea
                      name="message"
                      placeholder="Briefly describe your tactical goals and technical requirements..."
                      className={styles.input}
                      rows="3"
                      required
                      value={formData.message}
                      onChange={handleChange}
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className={`btn btn-primary ${styles.submitBtn}`}
                    disabled={loading}
                  >
                    {loading ? <span className={styles.spinner}></span> : 'Initiate Discovery Call'}
                  </button>
                </form>

                {status && (
                  <div className={styles.successMsg}>
                    {status}
                  </div>
                )}
              </div>

              <div style={{ marginTop: '40px', display: 'flex', gap: '40px', opacity: 0.6 }}>
                <div>
                  <h4 style={{ fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--color-main-light)', marginBottom: '8px' }}>Global HQ</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--white)' }}>Silicon Valley Precision Hub</p>
                </div>
                <div>
                  <h4 style={{ fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--color-main-light)', marginBottom: '8px' }}>Direct Link</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--white)' }}>architecture@ant-solutions.ai</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}
