'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from '@/styles/modules/about/About.module.css';

export default function WhatWeDo() {
  const sectionRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    gsap.fromTo(
      itemsRef.current,
      { opacity: 0, x: 20 },
      {
        opacity: 1,
        x: 0,
        duration: 0.6,
        ease: 'power2.out',
        stagger: 0.08,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const services = [
    { name: "Flights", desc: "Getting you there", route: "/travel/flights" },
    { name: "Hotels", desc: "Where you stay", route: "/travel/hotels" },
    { name: "Holidays", desc: "Complete packages", route: "/travel/holidays" },
    { name: "Visa Services", desc: "Document assistance", route: "/visa-services" },
    { name: "Tours", desc: "Local experiences", route: "/travel/tours" },
    { name: "Cruises", desc: "The world by sea", route: "/travel/cruises" },
    { name: "Corporate", desc: "Business travel", route: "/corporate-travel" }
  ];

  return (
    <section ref={sectionRef} className={styles.servicesSection}>
      <div className={styles.servicesHeader}>
        <h2 className={styles.servicesHeading}>What We Offer</h2>
        <p className={styles.servicesSubtext}>One team for every part of your journey.</p>
      </div>
      
      <div className={styles.servicesRowContainer}>
        <div className={styles.servicesRow}>
          {services.map((s, i) => (
            <Link 
              key={i} 
              href={s.route} 
              className={styles.serviceItem}
              ref={el => { itemsRef.current[i] = el; }}
            >
              <div className={styles.serviceBar}></div>
              <div className={styles.serviceName}>{s.name}</div>
              <div className={styles.serviceDesc}>{s.desc}</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
