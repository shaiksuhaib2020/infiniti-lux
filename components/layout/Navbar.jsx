'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import PillNav from './PillNav';
import styles from '@/styles/modules/Navbar.module.css';

const travelLinks = [
  { label: 'Flights', href: '/travel/flights' },
  { label: 'Holidays', href: '/travel/holidays' },
  { label: 'Tours & Experiences', href: '/travel/tours' },
  { label: 'Hotels', href: '/travel/hotels' },
  { label: 'Honeymoons', href: '/travel/honeymoons' },
  { label: 'Cruises', href: '/travel/cruises' },
  { label: 'Corporate Travel', href: '/corporate-travel' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMobileMenuClick = (e, item) => {
    if (item.label === 'Travel') {
      setMobileDropdownOpen(!mobileDropdownOpen);
    }
  };

  const navItems = [
    { label: 'Home', href: '/' },
    { 
      label: 'Travel', 
      href: '/travel',
      isActive: (pathname) => pathname === '/travel' || pathname.startsWith('/travel/'),
      onMouseEnter: () => setDropdownOpen(true),
      onMouseLeave: () => setDropdownOpen(false),
      mobileChildren: (closeMenu) => (
        mobileDropdownOpen && (
          <div className={styles.mobileSubMenu}>
            <Link 
              href="/travel" 
              className={styles.mobileSubLink}
              style={{ fontWeight: '600', color: 'var(--color-gold)' }}
              onClick={() => closeMenu(false)}
            >
              All Travel Services
            </Link>
            {travelLinks.map(link => (
              <Link 
                key={link.href} 
                href={link.href} 
                className={styles.mobileSubLink}
                onClick={() => closeMenu(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )
      )
    },
    { label: 'Visa Services', href: '/visa-services' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <div ref={navRef} className={`${styles.navbarWrapper} ${isScrolled ? 'pill-nav--scrolled' : ''}`}>
      {/* Logo as a sibling element */}
      <Link href="/" className={styles.logoBlock}>
        <div className={styles.logoText}>Infiniti Luxe</div>
        <div className={styles.logoSub}>Travel Beyond Boundaries</div>
      </Link>

      <PillNav 
        items={navItems}
        baseColor="#07111C"
        pillColor="rgba(255,255,255,0.08)"
        pillTextColor="rgba(255,255,255,0.85)"
        hoveredPillTextColor="#C5973A"
        initialLoadAnimation={true}
        onMobileMenuClick={handleMobileMenuClick}
        mobileFooter={
          <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--color-border-dark)' }}>
            <a 
              href="https://wa.me/971582109797?text=Hi%20Infiniti%20Luxe%2C%20I%20would%20like%20help%20planning%20my%20trip."
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'block',
                background: 'var(--color-whatsapp)',
                color: 'var(--color-white)',
                textAlign: 'center',
                padding: '12px',
                borderRadius: 'var(--radius-button)',
                fontWeight: '600',
                fontSize: '14px',
                textDecoration: 'none'
              }}
            >
              WhatsApp Us
            </a>
          </div>
        }
      />

      {/* Desktop Travel Dropdown */}
      {dropdownOpen && (
        <div 
          className={styles.desktopDropdown}
          onMouseEnter={() => setDropdownOpen(true)}
          onMouseLeave={() => setDropdownOpen(false)}
        >
          <Link href="/travel" className={styles.dropdownLink} style={{ fontWeight: '600', color: 'var(--color-gold)', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '12px', marginBottom: '8px' }}>
            All Travel Services
          </Link>
          {travelLinks.map(link => (
            <Link key={link.href} href={link.href} className={styles.dropdownLink}>
              {link.label}
            </Link>
          ))}
        </div>
      )}

      {/* WhatsApp Button as sibling */}
      <a 
        href="https://wa.me/971582109797?text=Hi%20Infiniti%20Luxe%2C%20I%20would%20like%20help%20planning%20my%20trip."
        target="_blank"
        rel="noopener noreferrer"
        className={`${styles.whatsappBtn} ${isScrolled ? styles.whatsappScrolled : ''}`}
      >
        WhatsApp Us
      </a>
    </div>
  );
}
