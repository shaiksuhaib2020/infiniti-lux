'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from '@/styles/modules/FinalCTA.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function FinalCTA() {
  const contentRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.fromTo(contentRef.current.children,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: contentRef.current,
          start: 'top 80%'
        }
      }
    );
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.background}></div>
      <div className={styles.overlay}></div>
      
      <div ref={contentRef} className={styles.content}>
        <h2 className={styles.heading}>Ready to Travel?</h2>
        <p className={styles.subtext}>
          Talk to a travel expert today. No automated forms, no waiting — just a real conversation.
        </p>
        
        <div className={styles.btnGroup}>
          <Link href="/contact" className={styles.primaryBtn}>
            Plan My Trip
          </Link>
          <a 
            href="https://wa.me/971582109797?text=Hi%20Infiniti%20Luxe%2C%20I'm%20ready%20to%20plan%20my%20trip."
            target="_blank"
            rel="noopener noreferrer"
            className={styles.whatsappBtn}
          >
            WhatsApp Us
          </a>
        </div>
      </div>
    </section>
  );
}
