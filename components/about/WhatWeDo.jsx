import Link from 'next/link';
import { Plane, Hotel, Globe, FileText, Map, Anchor, Briefcase } from 'lucide-react';
import styles from '@/styles/modules/about/About.module.css';

export default function WhatWeDo() {
  const services = [
    { icon: Plane, name: 'Flights', desc: 'Getting you there', cta: 'Explore flights', route: '/travel/flights' },
    { icon: Hotel, name: 'Hotels', desc: 'Where you stay', cta: 'Find a hotel', route: '/travel/hotels' },
    { icon: Globe, name: 'Holidays', desc: 'Complete packages', cta: 'Explore holidays', route: '/travel/holidays' },
    { icon: FileText, name: 'Visa Services', desc: 'Document assistance', cta: 'Check visa options', route: '/visa-services' },
    { icon: Map, name: 'Tours', desc: 'Local experiences', cta: 'Explore experiences', route: '/travel/tours' },
    { icon: Anchor, name: 'Cruises', desc: 'The world by sea', cta: 'Explore cruises', route: '/travel/cruises' },
    { icon: Briefcase, name: 'Corporate', desc: 'Business travel', cta: 'Business enquiry', route: '/corporate-travel' }
  ];

  return (
    <section id="about-content" className={styles.whatWeDoSection}>
      <div className={styles.wwdContainer}>
        <div className={styles.wwdHeader}>
          <h2 className={styles.wwdHeading}>What We Offer</h2>
          <p className={styles.wwdSubtext}>One team for every part of your journey.</p>
        </div>
        
        <div className={styles.wwdGrid}>
          {services.map((svc, i) => {
            const Icon = svc.icon;
            return (
              <Link
                href={svc.route}
                key={i}
                className={styles.wwdCard}
              >
                <div className={styles.wwdIconBox}>
                  <Icon size={22} strokeWidth={1.5} color="var(--color-gold)" />
                </div>
                <h3 className={styles.wwdCardTitle}>{svc.name}</h3>
                <p className={styles.wwdCardDesc}>{svc.desc}</p>
                <div className={styles.wwdCardBottom}>
                  <span className={styles.wwdCardCta}>{svc.cta}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

