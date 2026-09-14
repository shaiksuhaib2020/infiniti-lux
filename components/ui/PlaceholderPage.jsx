import styles from '@/styles/modules/Placeholder.module.css';

export default function PlaceholderPage({ title, description, bgImage }) {
  return (
    <div className={styles.placeholderContainer}>
      <div 
        className={styles.hero} 
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className={styles.overlay}></div>
        <div className={styles.content}>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.description}>{description}</p>
          <div className={styles.ctaGroup}>
            <a 
              href="https://wa.me/971582109797?text=Hi%20Infiniti%20Luxe%2C%20I%20would%20like%20more%20information%20about%20this."
              target="_blank"
              rel="noopener noreferrer"
              className={styles.primaryBtn}
            >
              Enquire via WhatsApp
            </a>
            <a href="/contact" className={styles.secondaryBtn}>
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
