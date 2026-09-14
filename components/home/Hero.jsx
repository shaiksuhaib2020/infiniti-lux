'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import styles from '@/styles/modules/Hero.module.css';

export default function Hero() {
  const headlineRef = useRef(null);
  const subtextRef = useRef(null);
  const supportRef = useRef(null);
  const btnRowRef = useRef(null);
  const scrollIndRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const tl = gsap.timeline();

    tl.fromTo(headlineRef.current, 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
    )
    .fromTo(subtextRef.current, 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, 
      '-=0.65'
    )
    .fromTo(supportRef.current, 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, 
      '-=0.55'
    )
    .fromTo(btnRowRef.current, 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, 
      '-=0.4'
    );

    gsap.to(scrollIndRef.current, {
      y: 10,
      opacity: 0.2,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut'
    });

  }, []);

  return (
    <section className={styles.heroSection}>
      <div className={styles.videoWrapper}>
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          className={styles.heroVideo}
        >
          <source src="/assets/video/Hero_vid.webm" type="video/webm" />
        </video>
        <div className={styles.overlay}></div>
      </div>

      <div className={styles.content}>
        <h1 ref={headlineRef} className={styles.headline}>Travel Beyond Boundaries</h1>
        
        <p ref={subtextRef} className={styles.subtext}>Explore the world with confidence.</p>
        
        <p ref={supportRef} className={styles.supportLine}>
          Flights, holidays, visa services and more — handled personally.
        </p>

        <div ref={btnRowRef} className={styles.buttonContainer}>
          <div className={styles.btnRow}>
            <Link href="/contact" className={styles.primaryBtn}>
              Plan My Trip
            </Link>
            <Link href="/travel/holidays" className={styles.secondaryBtn}>
              Explore Holidays
            </Link>
            <a 
              href="https://wa.me/971582109797?text=Hi%20Infiniti%20Luxe%2C%20I%20would%20like%20help%20planning%20my%20trip."
              target="_blank"
              rel="noopener noreferrer"
              className={styles.whatsappBtn}
            >
              WhatsApp Us
            </a>
          </div>
          
          <Link href="/contact" className={styles.textLink}>
            Speak to a Travel Expert &rarr;
          </Link>
        </div>
      </div>

      <div ref={scrollIndRef} className={styles.scrollIndicator}>
        <div className={styles.scrollLine}>
          <div className={styles.scrollDot}></div>
        </div>
      </div>
    </section>
  );
}
