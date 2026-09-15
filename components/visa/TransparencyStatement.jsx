'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from '@/styles/modules/visa/Visa.module.css';

export default function TransparencyStatement() {
  const sectionRef = useRef(null);
  const rulesRef = useRef([]);
  const contentRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
      }
    });

    // Rules draw in from center outward
    tl.fromTo(
      rulesRef.current,
      { scaleX: 0 },
      { scaleX: 1, transformOrigin: 'center', duration: 0.8, ease: 'power2.out' }
    )
    .fromTo(
      contentRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
      '-=0.4'
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.transparencySection}>
      <div className={styles.transparencyContainer}>
        <hr className={styles.hrLine} ref={el => rulesRef.current[0] = el} />
        
        <div ref={contentRef} className={styles.transparencyContent}>
          <div className={styles.transparencyLabel}>A note on visa outcomes</div>
          <h2 className={styles.transparencyHeading}>We Assist. We Do Not Decide.</h2>
          <p className={styles.transparencyPara}>
            Infiniti Luxe provides professional visa application assistance and document guidance. The decision on whether to grant, refuse or defer any visa application rests solely and entirely with the relevant government immigration or consular authority.
          </p>
          <p className={styles.transparencyPara}>
            We never make guarantees of approval. We never use language implying a visa outcome is assured. Agents or services that do so are misleading their clients. Our commitment is to prepare your application with care, accuracy and completeness — the best foundation for a successful outcome.
          </p>
        </div>
        
        <hr className={styles.hrLine} ref={el => rulesRef.current[1] = el} />
      </div>
    </section>
  );
}
