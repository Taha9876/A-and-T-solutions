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
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => { setOpen(false); }, [pathname]);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <header
      className={`${styles.header} ${scrolled ? styles.headerScrolled : ''}`}
      suppressHydrationWarning
    >
      <div className={styles.container}>
        {/* Logo */}
        <Link href="/" className={styles.logo} onClick={() => setOpen(false)}>
          <span className={styles.logoMark}>A<span className={styles.logoAmp}>&</span>T</span>
          <span className={styles.logoLabel}>Solutions</span>
        </Link>

        {/* Desktop Nav */}
        <nav className={styles.desktopNav}>
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`${styles.navLink} ${pathname === l.href ? styles.navLinkActive : ''}`}
            >
              {l.label}
            </Link>
          ))}
          <Link href="/contact" className={styles.cta}>Get a Demo</Link>
        </nav>

        {/* Mobile Toggle */}
        <button
          className={`${styles.burger} ${open ? styles.burgerOpen : ''}`}
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle navigation"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile Overlay + Menu */}
      {open && <div className={styles.overlay} onClick={() => setOpen(false)} />}
      <nav className={`${styles.mobileNav} ${open ? styles.mobileNavOpen : ''}`}>
        {navLinks.map((l, i) => (
          <Link
            key={l.href}
            href={l.href}
            className={`${styles.mobileLink} ${pathname === l.href ? styles.mobileLinkActive : ''}`}
            style={{ transitionDelay: `${i * 0.06 + 0.1}s` }}
            onClick={() => setOpen(false)}
          >
            {l.label}
          </Link>
        ))}
        <Link
          href="/contact"
          className={styles.mobileCta}
          style={{ transitionDelay: '0.45s' }}
          onClick={() => setOpen(false)}
        >
          Get a Demo
        </Link>
      </nav>
    </header>
  );
}
