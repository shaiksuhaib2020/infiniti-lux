'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from '@/styles/modules/about/About.module.css';

export default function Manifesto() {
  const sectionRef = useRef(null);
  const openerRef = useRef(null);
  const parasRef = useRef([]);
  const closingRef = useRef(null);

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
      openerRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
    );

    parasRef.current.forEach((para, i) => {
      if (para) {
        tl.fromTo(
          para,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
          i === 0 ? '-=0.4' : '-=0.65'
        );
      }
    });

    tl.fromTo(
      closingRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
      '+=0.1'
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.manifestoSection}>
      <div className={styles.manifestoContainer}>
        <h2 ref={openerRef} className={styles.manifestoOpener}>
          We believe travel is more than reaching a destination.
        </h2>
        
        <p ref={el => { parasRef.current[0] = el; }} className={styles.manifestoPara}>
          It is the anticipation before the journey, the places you discover, the people you meet and the memories you bring home.
        </p>
        
        <p ref={el => { parasRef.current[1] = el; }} className={styles.manifestoPara}>
          Based in Dubai, we are building a modern travel company designed to make exploring the world simpler, more personal and more memorable. From flights and hotels to holiday packages, tours, experiences and visa assistance, we help travellers bring their plans together in one place.
        </p>
        
        <p ref={el => { parasRef.current[2] = el; }} className={styles.manifestoPara}>
          Whether you&apos;re planning a family holiday, a honeymoon, a business trip, a luxury escape or your next adventure, our team is here to help you travel with confidence.
        </p>
        
        <h3 ref={closingRef} className={styles.manifestoClosing}>
          Your destination is out there. Let us help you get there.
        </h3>
      </div>
    </section>
  );
}
