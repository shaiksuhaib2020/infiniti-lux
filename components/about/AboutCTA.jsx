import Link from 'next/link';
import styles from '@/styles/modules/about/About.module.css';

export default function AboutCTA() {
  return (
    <section className={styles.ctaSection}>
      <div className={styles.ctaContainer}>
        <p className={styles.ctaSupporting}>
          Whether it&apos;s a family holiday, a honeymoon, a business trip
          or something still taking shape — talk to us. We&apos;ll help you
          figure it out.
        </p>
        
        <div className={styles.ctaRow}>
          <a 
            href="https://wa.me/971582109797?text=Hi%20Infiniti%20Luxe%2C%20I%20would%20like%20help%20planning%20my%20trip."
            target="_blank"
            rel="noopener noreferrer"
            className={styles.btnPrimary}
          >
            Start on WhatsApp
          </a>
          <Link href="/travel" className={styles.btnSecondary}>
            View Our Services
          </Link>
        </div>

        <p className={styles.ctaReassurance}>
          No pressure, no commitment. Just a real conversation about your travel plans.
        </p>
      </div>
    </section>
  );
}


