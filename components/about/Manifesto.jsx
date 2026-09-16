'use client';
import styles from '@/styles/modules/about/About.module.css';

export default function Manifesto() {
  return (
    <section className={styles.manifestoSection}>
      <div 
        className={styles.bannerBackground} 
        style={{ backgroundImage: 'url(/assets/banner_inf.webp)' }}
      />
    </section>
  );
}

