'use client';
import { useEffect, useRef } from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from '@/styles/modules/contact/Contact.module.css';

export default function SocialStrip() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const mapsLink = "https://www.google.com/maps/place/Al+zarooni+building+(capital+building)/@25.2513242,55.3025704,17z";

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const anim = gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
        }
      }
    );

    return () => {
      anim.scrollTrigger?.kill();
      anim.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.stripSection}>
      <div ref={containerRef} className={styles.stripContainer}>
        
        <div className={styles.stripCol}>
          <div className={styles.stripHeading}>Find us online</div>
          
          <a href="https://www.instagram.com/infinitiluxetravels?stkn=YnY4b2U4YTE1OTZ1&utm_source=qr" className={`${styles.stripRow} ${styles.isLink}`} target="_blank" rel="noopener noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.stripSocialIcon}><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            <span className={styles.stripText}>Instagram</span>
          </a>
          
          <a href="https://www.facebook.com/infinitiluxetravels" className={`${styles.stripRow} ${styles.isLink}`} target="_blank" rel="noopener noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.stripSocialIcon}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            <span className={styles.stripText}>Facebook</span>
          </a>
          
          <a href="https://www.linkedin.com/in/infiniti-luxe-travel-tourism-099a33436" className={`${styles.stripRow} ${styles.isLink}`} target="_blank" rel="noopener noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.stripSocialIcon}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
            <span className={styles.stripText}>LinkedIn</span>
          </a>
        </div>
        
        <div className={styles.stripCol}>
          <div className={styles.stripHeading}>Get in touch</div>
          
          <div className={`${styles.stripRow} ${styles.isLink}`}>
            <Phone className={styles.stripContactIcon} size={20} />
            <span className={styles.stripContactText}>
              <a href="tel:+971582109797" style={{ color: 'inherit', textDecoration: 'none' }}>+971 58 210 9797</a>
              <span style={{ margin: '0 6px', opacity: 0.4 }}>|</span>
              <a href="tel:+971541509377" style={{ color: 'inherit', textDecoration: 'none' }}>+971 54 150 9377</a>
            </span>
          </div>
          
          <a href="mailto:infinitiempire0007@gmail.com" className={`${styles.stripRow} ${styles.isLink}`}>
            <Mail className={styles.stripContactIcon} size={20} />
            <span className={styles.stripContactText}>infinitiempire0007@gmail.com</span>
          </a>
          
          <a href={mapsLink} target="_blank" rel="noopener noreferrer" className={`${styles.stripRow} ${styles.isLink}`}>
            <MapPin className={styles.stripContactIcon} size={20} />
            <span className={styles.stripContactText}>Al Zarooni Building, Burjuman, Dubai, UAE</span>
          </a>
        </div>
        
        <div className={styles.stripCol}>
          <div className={styles.stripHeading}>When we respond</div>
          
          <p className={styles.stripBody}>
            We respond to all enquiries within 24 hours. WhatsApp messages are typically answered the same day.
          </p>
          
          <div className={styles.stripNote}>
            Available 7 days. Based in Dubai (GMT+4).
          </div>
        </div>

      </div>
    </section>
  );
}

