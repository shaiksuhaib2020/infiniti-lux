'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from '@/styles/modules/about/About.module.css';

export default function AboutHero() {
  const headlineRef = useRef(null);
  const labelRef = useRef(null);
  const supportRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const tl = gsap.timeline();
    tl.fromTo(
      [labelRef.current, headlineRef.current],
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', stagger: 0 }
    )
      .fromTo(
        supportRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        '-=0.6'
      );
  }, []);

  return (
    <section className={styles.heroSection}>
      <div className={styles.heroContainer}>
        <div ref={labelRef} className={styles.heroLabel}>About Infiniti Luxe</div>
        <h1 ref={headlineRef} className={styles.heroHeadline}>We Believe Travel Is More Than Reaching a Destination.</h1>
        <p ref={supportRef} className={styles.heroSupporting}>
          Based in Dubai. Built to help people travel with confidence.
        </p>
      </div>
    </section>
  );
}
