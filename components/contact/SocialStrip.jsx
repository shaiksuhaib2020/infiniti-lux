'use client';
import { useEffect, useRef } from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from '@/styles/modules/contact/Contact.module.css';

export default function SocialStrip() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);

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
          
          <a href="#" className={`${styles.stripRow} ${styles.isLink}`} target="_blank" rel="noopener noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.stripSocialIcon}><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            <span className={styles.stripText}>Instagram</span>
            {/* TODO: Replace with Instagram URL when available */}
          </a>
          
          <a href="#" className={`${styles.stripRow} ${styles.isLink}`} target="_blank" rel="noopener noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.stripSocialIcon}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            <span className={styles.stripText}>Facebook</span>
            {/* TODO: Replace with Facebook URL when available */}
          </a>
          
          <a href="#" className={`${styles.stripRow} ${styles.isLink}`} target="_blank" rel="noopener noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.stripSocialIcon}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
            <span className={styles.stripText}>LinkedIn</span>
            {/* TODO: Replace with LinkedIn URL when available */}
          </a>
        </div>
        
        <div className={styles.stripCol}>
          <div className={styles.stripHeading}>Get in touch</div>
          
          <a href="tel:+971582109797" className={`${styles.stripRow} ${styles.isLink}`}>
            <Phone className={styles.stripContactIcon} size={20} />
            <span className={styles.stripContactText}>+971 58 210 9797</span>
          </a>
          
          <a href="mailto:infinitiempire0007@gmail.com" className={`${styles.stripRow} ${styles.isLink}`}>
            <Mail className={styles.stripContactIcon} size={20} />
            <span className={styles.stripContactText}>infinitiempire0007@gmail.com</span>
          </a>
          
          <div className={styles.stripRow}>
            <MapPin className={styles.stripContactIcon} size={20} />
            <span className={styles.stripContactText}>Dubai, UAE</span>
          </div>
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
