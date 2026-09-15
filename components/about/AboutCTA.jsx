'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from '@/styles/modules/about/About.module.css';

export default function AboutCTA() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const whatsAppMsg = "Hi Infiniti Luxe, I would like help planning my trip.";
  const waLink = `https://wa.me/971582109797?text=${encodeURIComponent(whatsAppMsg)}`;

  return (
    <section ref={sectionRef} className={styles.ctaSection}>
      <div ref={containerRef} className={styles.ctaContainer}>
        <h2 className={styles.ctaHeading}>Ready to Plan Your Next Journey?</h2>
        <p className={styles.ctaSupporting}>
          Whether it&apos;s a family holiday, a honeymoon, a business trip or something still taking shape — talk to us. We&apos;ll help you figure it out.
        </p>
        
        <div className={styles.ctaRow}>
          <a href={waLink} target="_blank" rel="noopener noreferrer" className={styles.btnPrimary}>
            Start on WhatsApp
          </a>
          <Link href="/" className={styles.btnSecondary}>
            View Our Services
          </Link>
        </div>
        
        <div className={styles.ctaReassurance}>
          No pressure, no commitment. Just a real conversation about your travel plans.
        </div>
      </div>
    </section>
  );
}
