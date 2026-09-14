'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from '@/styles/modules/VisaHighlight.module.css';

gsap.registerPlugin(ScrollTrigger);

const tags = ['Schengen', 'UK', 'USA', 'Canada', 'Australia', 'Japan', 'Turkey', 'UAE', 'Saudi Arabia'];

export default function VisaHighlight() {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.fromTo(sectionRef.current.children,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%'
        }
      }
    );
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div ref={sectionRef} className={styles.content}>
          <div className={styles.label}>Visa Services</div>
          
          <h2 className={styles.heading}>Your Journey Starts With the Right Preparation.</h2>
          
          <p className={styles.bodyText}>
            We provide professional visa application assistance and document guidance for destinations around the world. Our team will walk you through the process, help you prepare your documents, and submit on your behalf. The final decision rests with the relevant immigration authority.
          </p>

          <div className={styles.tagsContainer}>
            {tags.map(tag => (
              <span key={tag} className={styles.tag}>{tag}</span>
            ))}
          </div>

          <div className={styles.btnGroup}>
            <Link href="/visa-services" className={styles.primaryBtn}>
              Check Visa Requirements
            </Link>
            <a 
              href="https://wa.me/971582109797?text=Hi%20Infiniti%20Luxe%2C%20I%20need%20help%20with%20a%20visa%20application."
              target="_blank"
              rel="noopener noreferrer"
              className={styles.secondaryBtn}
            >
              WhatsApp for Visa Help
            </a>
          </div>
        </div>
        
        <div className={styles.visualColumn}>
          {/* Decorative element could go here */}
        </div>
      </div>
    </section>
  );
}
