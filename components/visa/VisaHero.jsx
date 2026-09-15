'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import styles from '@/styles/modules/visa/Visa.module.css';

export default function VisaHero() {
  const headlineRef = useRef(null);
  const supportRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const tl = gsap.timeline();
    tl.fromTo(
      headlineRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.75, ease: 'power2.out' }
    )
      .fromTo(
        supportRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.75, ease: 'power2.out' },
        '-=0.6'
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.75, ease: 'power2.out' },
        '-=0.62'
      );
  }, []);

  const handleScrollToDestinations = (e) => {
    e.preventDefault();
    const destSection = document.getElementById('visa-destinations');
    if (destSection) {
      destSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const whatsAppMsg = "Hi Infiniti Luxe, I need help with a visa application.";
  const waLink = `https://wa.me/971582109797?text=${encodeURIComponent(whatsAppMsg)}`;

  return (
    <section className={styles.heroSection}>
      <div className={styles.heroImageWrapper}>
        <img src="/assets/cards/visa_card.webp" alt="Visa Services" className={styles.heroImage} />
        <div className={styles.heroOverlay}></div>
      </div>
      <div className={styles.heroContainer}>
        <div className={styles.heroContent}>
          <div className={styles.serviceLabel}>Visa services</div>
          <h1 ref={headlineRef} className={styles.heroHeadline}>Your Journey Starts With the Right Preparation.</h1>
          <p ref={supportRef} className={styles.heroSupporting}>
            Professional visa application assistance for destinations around the world. We guide you through the process from document preparation to submission.
          </p>
          <div ref={ctaRef} className={styles.heroCTARow}>
            <a href={waLink} target="_blank" rel="noopener noreferrer" className={styles.btnPrimary}>
              Check Visa Requirements
            </a>
            <Link href="/contact?service=visa" className={styles.btnSecondary}>
              Send an Enquiry
            </Link>
          </div>
        </div>
        <a href="#visa-destinations" onClick={handleScrollToDestinations} className={styles.scrollAnchor}>
          View visa destinations
        </a>
      </div>
    </section>
  );
}
