'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <nav 
      className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`} 
      suppressHydrationWarning
    >
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoA}>A</span>
          <span className={styles.logoAmp}>&</span>
          <span className={styles.logoT}>T</span>
          <span className={styles.logoText}>Solutions</span>
        </Link>

        {/* Universal Overlay System */}
        <div 
          className={`${styles.backdrop} ${menuOpen ? styles.backdropOpen : ''}`} 
          onClick={() => setMenuOpen(false)}
          suppressHydrationWarning
        />

        <div className={`${styles.links} ${menuOpen ? styles.linksOpen : ''}`}>
          {navLinks.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.link} ${pathname === link.href ? styles.active : ''}`}
              style={{ '--i': index }}
              suppressHydrationWarning
            >
              {link.label}
            </Link>
          ))}
          <div className={styles.mobileCtaWrap}>
            <Link href="/contact" className={`btn btn-primary ${styles.navCta}`}>
              Get a Demo
            </Link>
          </div>
        </div>

        <button
          className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </nav>
  );
}
