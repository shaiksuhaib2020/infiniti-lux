'use client';
import { useEffect, useRef, Suspense } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ContactInfo from './ContactInfo';
import ContactForm from './ContactForm';
import styles from '@/styles/modules/contact/Contact.module.css';

export default function ContactSplit() {
  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (typeof window !== 'undefined' && window.location.hash) {
      const hash = window.location.hash.substring(1);
      if (['contact-split', 'contact-form', 'plan-your-journey'].includes(hash)) {
        setTimeout(() => {
          const el = document.getElementById('contact-split');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 200);
      }
    }

    if (prefersReducedMotion) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
      }
    });

    tl.fromTo(
      leftRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
    ).fromTo(
      rightRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
      '-=0.65'
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section id="contact-split" ref={sectionRef} className={styles.splitSection}>
      <div className={styles.splitContainer}>
        <div ref={leftRef} className={styles.splitLeft}>
          <ContactInfo />
        </div>
        <div ref={rightRef} className={styles.splitRight}>
          <Suspense fallback={<div className={styles.formCard} style={{height: '600px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><div className={styles.spinner}></div></div>}>
            <ContactForm />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
