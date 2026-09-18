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
          <Link href="/contact#contact-split" className={styles.btnPrimary}>
            Talk to a Travel Agent
          </Link>
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


