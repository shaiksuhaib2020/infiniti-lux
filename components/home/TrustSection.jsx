'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Globe, User, Shield, Briefcase, MessageCircle, Star } from 'lucide-react';
import styles from '@/styles/modules/TrustSection.module.css';

gsap.registerPlugin(ScrollTrigger);

const trustPoints = [
  { icon: Globe, title: 'Global Reach', desc: 'Travel solutions across the world — from city breaks in Europe to island escapes in Southeast Asia.' },
  { icon: User, title: 'Personal Service', desc: 'You speak to a real travel expert, not an automated system. Every trip is handled with care.' },
  { icon: Shield, title: 'Transparent & Secure', desc: 'No hidden fees, no confusing pricing. What we quote is what you pay.' },
  { icon: Briefcase, title: 'Complete Travel Solutions', desc: 'Flights, hotels, visas, tours, honeymoons and more — handled in one place, by one team.' },
  { icon: MessageCircle, title: 'Dedicated Support', desc: "We're available before your trip, during it, and after. Reach us on WhatsApp anytime." },
  { icon: Star, title: 'Your Journey, Our Priority', desc: 'Every decision we make is around making your travel experience better.' },
];

export default function TrustSection() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const items = containerRef.current.querySelectorAll(`.${styles.trustPoint}`);
    
    gsap.fromTo(items,
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
      <div className={styles.header}>
        <h2 className={styles.heading}>Why Travel With Infiniti Luxe?</h2>
        <p className={styles.subtext}>We&apos;re building a travel company around what matters most — your experience.</p>
      </div>

      <div ref={containerRef} className={styles.grid}>
        {trustPoints.map((point, index) => (
          <div key={index} className={styles.trustPoint}>
            <div className={styles.iconWrapper}>
              <point.icon size={28} className={styles.icon} />
            </div>
            <h3 className={styles.title}>{point.title}</h3>
            <p className={styles.desc}>{point.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
