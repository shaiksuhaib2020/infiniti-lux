import styles from '@/styles/modules/about/About.module.css';

export default function OurValues() {
  const values = [
    { name: "Personal Service", body: "You are not a booking reference. You are a traveller with a specific trip in mind. We plan around you, not around what's easiest to sell." },
    { name: "Complete Honesty", body: "We do not make promises we cannot keep. That includes visa outcomes, pricing and what we are and are not able to arrange." },
    { name: "One Team, One Trip", body: "From the first conversation to the day you return, the same team handles your travel. No handoffs, no confusion." }
  ];

  return (
    <section className={styles.valuesSection}>
      <div className={styles.valuesContainer}>
        <div className={styles.valuesHeader}>
          <h2 className={styles.valuesHeading}>What We Stand For</h2>
        </div>
        
        <div className={styles.valuesGrid}>
          {values.map((v, i) => (
            <div key={i} className={styles.valueItem}>
              <h3 className={styles.valueName}>{v.name}</h3>
              <p className={styles.valueBody}>{v.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

