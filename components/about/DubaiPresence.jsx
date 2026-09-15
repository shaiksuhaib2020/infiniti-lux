'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone, Mail, MapPin } from 'lucide-react';
import styles from '@/styles/modules/about/About.module.css';

export default function DubaiPresence() {
  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);

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
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out' }
    )
    .fromTo(
      rightRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
      '-=0.65'
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.dubaiSection}>
      <div className={styles.dubaiContainer}>
        <div ref={leftRef} className={styles.dubaiLeft}>
          <div className={styles.dubaiLabel}>Where we are</div>
          <h2 className={styles.dubaiHeading}>Based in Dubai. Travelling the World.</h2>
          <p className={styles.dubaiPara}>
            Dubai sits at the intersection of East and West — one of the world&apos;s great hubs for international travel. It is where we are, and it is the best possible base from which to help people travel everywhere else.
          </p>
          <p className={styles.dubaiPara}>
            From here, we arrange travel across Europe, Asia, the Americas, Africa, the Middle East and the Pacific. Wherever you want to go, we know the routes.
          </p>
          
          <div className={styles.contactList}>
            <a href="tel:+971582109797" className={styles.contactRow}>
              <Phone className={styles.contactIcon} size={18} />
              <span className={styles.contactText}>+971 58 210 9797</span>
            </a>
            <a href="mailto:infinitiempire0007@gmail.com" className={styles.contactRow}>
              <Mail className={styles.contactIcon} size={18} />
              <span className={styles.contactText}>infinitiempire0007@gmail.com</span>
            </a>
            <div className={styles.contactRow}>
              <MapPin className={styles.contactIcon} size={18} />
              <span className={styles.contactText}>Dubai, UAE</span>
            </div>
          </div>
        </div>
        
        <div ref={rightRef} className={styles.dubaiRight}>
          <div className={styles.statsCard}>
            <div className={styles.statItem}>
              <div className={styles.statValue}>14+</div>
              <div className={styles.statLabel}>Destinations we package</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statValue}>Worldwide</div>
              <div className={styles.statLabel}>Flight routes we book</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statValue}>7 days</div>
              <div className={styles.statLabel}>Available to assist</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
