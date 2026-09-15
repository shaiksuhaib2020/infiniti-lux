'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from '@/styles/modules/about/About.module.css';

export default function OurValues() {
  const sectionRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    gsap.fromTo(
      itemsRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        stagger: 0, // Reveal together as a group
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const values = [
    { name: "Personal Service", body: "You are not a booking reference. You are a traveller with a specific trip in mind. We plan around you, not around what's easiest to sell." },
    { name: "Complete Honesty", body: "We do not make promises we cannot keep. That includes visa outcomes, pricing and what we are and are not able to arrange." },
    { name: "One Team, One Trip", body: "From the first conversation to the day you return, the same team handles your travel. No handoffs, no confusion." }
  ];

  return (
    <section ref={sectionRef} className={styles.valuesSection}>
      <div className={styles.valuesContainer}>
        <div className={styles.valuesHeader}>
          <h2 className={styles.valuesHeading}>What We Stand For</h2>
        </div>
        
        <div className={styles.valuesGrid}>
          {values.map((v, i) => (
            <div key={i} className={styles.valueItem} ref={el => { itemsRef.current[i] = el; }}>
              <h3 className={styles.valueName}>{v.name}</h3>
              <p className={styles.valueBody}>{v.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
