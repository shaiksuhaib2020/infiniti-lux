'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from '@/styles/modules/visa/Visa.module.css';

export default function VisaEnquiryCTA() {
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

  const whatsAppMsg = "Hi Infiniti Luxe, I need help with a visa application.";
  const waLink = `https://wa.me/971582109797?text=${encodeURIComponent(whatsAppMsg)}`;

  return (
    <section ref={sectionRef} className={styles.ctaSection}>
      <div ref={containerRef} className={styles.ctaContainer}>
        <h2 className={styles.ctaHeading}>Ready to Start Your Application?</h2>
        <p className={styles.ctaSupporting}>
          Tell us your destination, your nationality and your travel dates. We&apos;ll respond with exactly what you need to get started.
        </p>
        
        <div className={styles.ctaRow}>
          <a href={waLink} target="_blank" rel="noopener noreferrer" className={styles.btnPrimary}>
            Start on WhatsApp
          </a>
          <Link href="/contact?service=visa" className={styles.btnSecondary}>
            Send an Enquiry
          </Link>
        </div>
        
        <div className={styles.ctaReassurance}>
          No commitment required to enquire. A real consultant will respond, not an automated system.
        </div>
      </div>
    </section>
  );
}
