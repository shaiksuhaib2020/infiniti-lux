'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from '@/styles/modules/visa/Visa.module.css';

export default function VisaDestinations() {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const cards = gridRef.current.querySelectorAll(`.${styles.destCard}`);
    gsap.fromTo(
      cards,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
        stagger: 0.08,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const destinations = [
    { dest: "Schengen", type: "Short-stay tourist & business", l1: "Countries covered", v1: "26 European nations", l2: "Valid for", v2: "Up to 90 days", msg: "I need help with a Schengen visa application." },
    { dest: "United Kingdom", type: "Standard visitor visa", l1: "Entry type", v1: "Single or multiple", l2: "Application", v2: "In-person or postal", msg: "I need help with a UK visa application." },
    { dest: "United States", type: "B1/B2 Tourist & Business", l1: "Interview", v1: "Required at consulate", l2: "Processing", v2: "Varies by location", msg: "I need help with a US visa application." },
    { dest: "Canada", type: "Temporary resident visa", l1: "eTA available", v1: "For eligible nationalities", l2: "Biometrics", v2: "May be required", msg: "I need help with a Canada visa application." },
    { dest: "Australia", type: "Visitor visa (subclass 600)", l1: "Application", v1: "Fully online", l2: "Processing", v2: "Variable", msg: "I need help with an Australia visa application." },
    { dest: "Japan", type: "Tourist visa", l1: "Requirements", v1: "Vary by nationality", l2: "Validity", v2: "Single or multiple", msg: "I need help with a Japan visa application." },
    { dest: "Saudi Arabia", type: "Tourist & visit visa", l1: "eVisa", v1: "Available for many nationalities", l2: "Entry", v2: "Single or multiple", msg: "I need help with a Saudi Arabia visa application." },
    { dest: "UAE", type: "Visit & tourist visa", l1: "For", v1: "Non-UAE residents", l2: "Sponsored", v2: "By Infiniti Luxe", msg: "I need help with a UAE visit visa application." },
    { dest: "Turkey", type: "Tourist visa", l1: "eVisa", v1: "Available for most nationalities", l2: "Duration", v2: "Up to 90 days", msg: "I need help with a Turkey visa application." },
    { dest: "New Zealand", type: "Visitor visa & NZeTA", l1: "Online", v1: "Application available", l2: "Valid for", v2: "Multiple entry", msg: "I need help with a New Zealand visa application." }
  ];

  return (
    <section id="visa-destinations" ref={sectionRef} className={styles.destSection}>
      <div className={styles.destContainer}>
        <div className={styles.destHeader}>
          <h2 className={styles.destHeading}>Where Are You Travelling?</h2>
          <p className={styles.destSubtext}>Popular destinations we assist with visa applications for.</p>
        </div>
        
        <div ref={gridRef} className={styles.destGrid}>
          {destinations.map((d, i) => {
            const waLink = `https://wa.me/971582109797?text=${encodeURIComponent('Hi Infiniti Luxe, ' + d.msg)}`;
            return (
              <div key={i} className={styles.destCard}>
                <div className={styles.destName}>{d.dest}</div>
                <div className={styles.visaType}>{d.type}</div>
                <hr className={styles.cardDivider} />
                <div className={styles.infoRow}>
                  <div className={styles.infoLabel}>{d.l1}</div>
                  <div className={styles.infoValue}>{d.v1}</div>
                </div>
                <div className={styles.infoRow}>
                  <div className={styles.infoLabel}>{d.l2}</div>
                  <div className={styles.infoValue}>{d.v2}</div>
                </div>
                <a href={waLink} target="_blank" rel="noopener noreferrer" className={styles.destCTA}>
                  Enquire via WhatsApp
                </a>
              </div>
            );
          })}
        </div>
        
        <div className={styles.destNote}>
          Don&apos;t see your destination? We assist with visa applications beyond those listed above.
          <Link href="/contact?service=visa#contact-split" className={styles.destNoteLink}>Get in touch &rarr;</Link>
        </div>
      </div>
    </section>
  );
}
