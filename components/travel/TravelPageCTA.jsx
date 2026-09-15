'use client';
import Link from 'next/link';
import styles from '@/styles/modules/travel/TravelPage.module.css';

export default function TravelPageCTA() {
  return (
    <section className={styles.ctaSection}>
      <div className={styles.ctaContainer}>
        <h2 className={styles.ctaHeading}>Not sure where to start?</h2>
        <p className={styles.ctaSubtext}>
          Tell us what you have in mind. A travel consultant will help you figure out the rest.
        </p>
        
        <div className={styles.btnGroup}>
          <a 
            href="https://wa.me/971582109797?text=Hi%20Infiniti%20Luxe%2C%20I%27d%20like%20help%20planning%20my%20travel." 
            target="_blank"
            rel="noopener noreferrer"
            className={styles.primaryBtn}
          >
            Chat on WhatsApp
          </a>
          <Link href="/contact" className={styles.secondaryBtn}>
            Send an enquiry
          </Link>
        </div>
        
        <p className={styles.reassurance}>
          No commitment required. Real people, not automated systems.
        </p>
      </div>
    </section>
  );
}
