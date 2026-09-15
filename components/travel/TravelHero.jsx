'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from '@/styles/modules/travel/TravelPage.module.css';

export default function TravelHero() {
  const contentRef = useRef(null);
  const promptRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Heading and subtext entrance
    gsap.fromTo(
      contentRef.current.children,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: 'power2.out' }
    );

    // Scroll prompt pulse
    gsap.fromTo(
      promptRef.current,
      { opacity: 0 },
      { opacity: 0.5, duration: 0.8, ease: 'power2.out', delay: 0.5 }
    );

    gsap.to(promptRef.current, {
      opacity: 0.25,
      duration: 1.25,
      yoyo: true,
      repeat: -1,
      ease: 'power1.inOut',
      delay: 1.3
    });

  }, []);

  return (
    <section className={styles.heroSection}>
      <div className={styles.heroContent} ref={contentRef}>
        <h1 className={styles.heroHeading}>Where Would You Like to Go?</h1>
        <p className={styles.heroSubtext}>
          Explore our full range of travel services, each handled personally by our team.
        </p>
      </div>
      
      <div className={styles.scrollPrompt} ref={promptRef}>
        <div className={styles.scrollLine}></div>
        <span className={styles.scrollLabel}>Scroll to explore</span>
      </div>
    </section>
  );
}
