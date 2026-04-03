'use client';

import { useState, useEffect } from 'react';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#hakkimizda', label: 'Hakkımızda' },
    { href: '#haberler', label: 'Haberler' },
    { href: '#mevzuat', label: 'Mevzuat' },
    { href: '#yonetim', label: 'Yönetim' },
    { href: '#uyelik', label: 'Üyelik' },
    { href: '#iletisim', label: 'İletişim' },
  ];

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        {/* Logo */}
        <a href="#" className={styles.logo}>
          <img 
            src="/images/sihamed-logo.png" 
            alt="SİHAMED" 
            className={styles.logoImage}
          />
          <div className={styles.logoText}>
            <span className={styles.logoTitle}>SİHAMED</span>
            <span className={styles.logoSubtitle}>
              SİVİL HAVACILIK MEKANİĞİ TEKNİK ELEMANLARI DERNEĞİ
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <div className={styles.navLinks}>
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className={styles.navLink}>
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA Button */}
        <a href="#uyelik" className={styles.ctaButton}>
          Üye Ol
        </a>

        {/* Mobile Menu Button */}
        <button 
          className={`${styles.mobileMenuBtn} ${mobileMenuOpen ? styles.active : ''}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Menü"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`${styles.mobileMenu} ${mobileMenuOpen ? styles.open : ''}`}>
        {navLinks.map((link) => (
          <a 
            key={link.href} 
            href={link.href} 
            className={styles.mobileLink}
            onClick={() => setMobileMenuOpen(false)}
          >
            {link.label}
          </a>
        ))}
        <a href="#uyelik" className={styles.mobileCta} onClick={() => setMobileMenuOpen(false)}>
          Üye Ol
        </a>
      </div>
    </nav>
  );
}
