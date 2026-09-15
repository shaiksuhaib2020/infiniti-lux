'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from '@/styles/modules/visa/Visa.module.css';

export default function WhyAssistance() {
  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const rowsRef = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
      }
    });

    tl.fromTo(
      leftRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
    );

    rowsRef.current.forEach((row, i) => {
      if (row) {
        tl.fromTo(
          row,
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' },
          i === 0 ? '-=0.6' : '-=0.38' // 0.2s after left column starts, then 0.12s stagger
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const benefits = [
    { title: "Complete document review", desc: "We go through your application and supporting documents before anything is submitted" },
    { title: "Destination-specific guidance", desc: "Requirements differ by country and by applicant nationality — we know the distinctions" },
    { title: "Error reduction", desc: "Common mistakes on applications are avoidable. We help you avoid them." },
    { title: "Ongoing communication", desc: "You are never left wondering what is happening with your application" }
  ];

  return (
    <section ref={sectionRef} className={styles.whySection}>
      <div className={styles.whyContainer}>
        <div ref={leftRef} className={styles.whyLeft}>
          <div className={styles.whyLabel}>Why it matters</div>
          <h2 className={styles.whyHeading}>Visa Applications Have No Room for Error</h2>
          <p className={styles.whyPara}>
            A missing document, an incorrectly filled field, or the wrong supporting evidence can delay your application or result in a refusal. A refusal is also recorded — and can affect future applications to the same country.
          </p>
          <p className={styles.whyPara}>
            Professional assistance does not change the immigration authority&apos;s decision. What it does is ensure your application is complete, correctly presented, and supported by the right documentation. That is what we provide.
          </p>
        </div>
        <div ref={rightRef} className={styles.whyRight}>
          {benefits.map((b, i) => (
            <div key={i} className={styles.whyRow} ref={el => { rowsRef.current[i] = el; }}>
              <div className={styles.whyRowTitle}>{b.title}</div>
              <div className={styles.whyRowDesc}>{b.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
