'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from '@/styles/modules/Destinations.module.css';

gsap.registerPlugin(ScrollTrigger);

const destinations = [
  'Dubai', 'Maldives', 'Switzerland', 'Turkey', 'France', 'Italy', 
  'United Kingdom', 'USA', 'Canada', 'Japan', 'Thailand', 'Bali', 
  'Australia', 'Saudi Arabia'
];

export default function Destinations() {
  const containerRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.fromTo(headerRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', scrollTrigger: { trigger: headerRef.current, start: 'top 85%' } }
    );

    const cards = containerRef.current.querySelectorAll(`.${styles.card}`);
    gsap.fromTo(cards,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%'
        }
      }
    );
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div ref={headerRef} className={styles.header}>
          <h2 className={styles.heading}>Where Will You Go Next?</h2>
          <p className={styles.subtext}>From the deserts of Arabia to the islands of the Indian Ocean — we&apos;ll get you there.</p>
        </div>

        <div ref={containerRef} className={styles.grid}>
          {destinations.map((dest) => (
            <Link key={dest} href="/contact" className={styles.card}>
              <img 
                src={`https://source.unsplash.com/featured/?${encodeURIComponent(dest)},travel`} 
                alt={dest} 
                className={styles.image} 
              />
              <div className={styles.overlay}></div>
              <div className={styles.content}>
                <h3 className={styles.title}>{dest}</h3>
                <span className={styles.cta}>Explore &rarr;</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
