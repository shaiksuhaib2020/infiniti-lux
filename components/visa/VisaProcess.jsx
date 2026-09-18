'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from '@/styles/modules/visa/Visa.module.css';

export default function VisaProcess() {
  const processRef = useRef(null);
  const stepsRef = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Steps reveal sequentially left to right, 0.15s stagger.
    // The large background numerals fade in slightly before the text content.
    stepsRef.current.forEach((stepEl, i) => {
      if (!stepEl) return;
      const numEl = stepEl.querySelector(`.${styles.stepNumber}`);
      const titleEl = stepEl.querySelector(`.${styles.stepTitle}`);
      const descEl = stepEl.querySelector(`.${styles.stepDesc}`);
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: processRef.current,
          start: 'top 75%',
        },
        delay: i * 0.15
      });

      tl.fromTo(numEl, { opacity: 0, scale: 0.9 }, { opacity: 0.18, scale: 1, duration: 0.6, ease: 'power2.out' })
        .fromTo([titleEl, descEl], { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', stagger: 0.1 }, '-=0.4');
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const steps = [
    { num: "1", title: "Get in touch", desc: "Tell us your destination, nationality and travel dates. We'll let you know what's required for your specific situation." },
    { num: "2", title: "Document preparation", desc: "We provide a full checklist of required documents and review everything before submission to reduce the risk of avoidable errors." },
    { num: "3", title: "Application handled", desc: "We prepare and organise your application. Where direct submission is available, we handle it on your behalf." },
    { num: "4", title: "Stay informed", desc: "We keep you updated throughout the process and notify you as soon as a decision is received." },
  ];

  return (
    <section ref={processRef} className={styles.processSection}>
      <div className={styles.processContainer}>
        <div className={styles.processHeader}>
          <h2 className={styles.processHeading}>How We Help</h2>
          <p className={styles.processSubtext}>A straightforward process from first enquiry to visa submission.</p>
        </div>
        
        <div className={styles.stepsRow}>
          {steps.map((step, idx) => (
            <div 
              key={idx} 
              className={styles.stepBox} 
              ref={(el) => { stepsRef.current[idx] = el; }}
            >
              <div className={styles.stepNumber}>{step.num}</div>
              <div className={styles.stepTitle}>{step.title}</div>
              <div className={styles.stepDesc}>{step.desc}</div>
            </div>
          ))}
        </div>

        <p className={styles.processNote}>
          Visa decisions are made solely by the relevant immigration or consular authority. We cannot influence or guarantee outcomes.
        </p>
      </div>
    </section>
  );
}
