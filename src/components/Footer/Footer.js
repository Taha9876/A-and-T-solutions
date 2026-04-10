import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer} suppressHydrationWarning>
      <div className={styles.grid}>
        {/* Brand Column */}
        <div className={styles.brand}>
          <div className={styles.logo}>
            <span className={styles.logoA}>A</span>
            <span className={styles.logoAmp}>&</span>
            <span className={styles.logoT}>T</span>
            <span className={styles.logoText}>Solutions</span>
          </div>
          <p className={styles.tagline}>
            AI-powered receptionists and business automation for companies that never sleep.
          </p>
          <div className={styles.socials} suppressHydrationWarning>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={styles.socialIcon}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" aria-label="X / Twitter" className={styles.socialIcon}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16h-4.267z"/><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"/></svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className={styles.socialIcon}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
          </div>
        </div>

        {/* Links Columns */}
        <div className={styles.linksCol}>
          <h4 className={styles.colTitle}>Company</h4>
          <Link href="/about" className={styles.footerLink}>About Us</Link>
          <Link href="/services" className={styles.footerLink}>Services</Link>
          <Link href="/pricing" className={styles.footerLink}>Pricing</Link>
          <Link href="/contact" className={styles.footerLink}>Contact</Link>
        </div>

        <div className={styles.linksCol}>
          <h4 className={styles.colTitle}>Services</h4>
          <Link href="/services#receptionist" className={styles.footerLink}>AI Receptionist</Link>
          <Link href="/services#automation" className={styles.footerLink}>Workflow Automation</Link>
          <Link href="/services#leads" className={styles.footerLink}>Lead Qualification</Link>
          <Link href="/services#agents" className={styles.footerLink}>Custom AI Agents</Link>
        </div>

        <div className={styles.linksCol}>
          <h4 className={styles.colTitle}>Legal</h4>
          <a href="#" className={styles.footerLink}>Privacy Policy</a>
          <a href="#" className={styles.footerLink}>Terms of Service</a>
          <a href="#" className={styles.footerLink}>Cookie Policy</a>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>© 2025 A and T Solutions. All Rights Reserved.</p>
        <p className={styles.badge}>Built with AI. Powered by Humans.</p>
      </div>
    </footer>
  );
}
