'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from '@/styles/modules/Destinations.module.css';

gsap.registerPlugin(ScrollTrigger);

const destinations = [
  { name: 'Dubai', image: '/assets/destinations/Dubai.webp' },
  { name: 'Maldives', image: '/assets/destinations/Maldives.webp' },
  { name: 'Switzerland', image: '/assets/destinations/Switzerland.webp' }, // Missing, placeholder below
  { name: 'Turkey', image: '/assets/destinations/Turkey.webp' },
  { name: 'France', image: '/assets/destinations/France.webp' },
  { name: 'Italy', image: '/assets/destinations/Italy.webp' },
  { name: 'United Kingdom', image: '/assets/destinations/United_Kingdom.webp' },
  { name: 'USA', image: '/assets/destinations/USA.webp' },
  { name: 'Canada', image: '/assets/destinations/Canada.webp' },
  { name: 'Japan', image: '/assets/destinations/Japan.webp' },
  { name: 'Thailand', image: '/assets/destinations/Thailand.webp' },
  { name: 'Bali', image: '/assets/destinations/Bali.webp' },
  { name: 'Australia', image: '/assets/destinations/Austrilia.webp' }, // Note typo in file name
  { name: 'Saudi Arabia', image: '/assets/destinations/saudi.webp' }
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
            <Link key={dest.name} href="/contact" className={styles.card}>
              <img 
                src={dest.name === 'Switzerland' ? 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&q=80&w=800' : dest.image} 
                alt={dest.name} 
                className={styles.image} 
              />
              <div className={styles.overlay}></div>
              <div className={styles.content}>
                <h3 className={styles.title}>{dest.name}</h3>
                <span className={styles.cta}>Explore &rarr;</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
