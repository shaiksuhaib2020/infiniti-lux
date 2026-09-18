import Link from 'next/link';
import styles from '@/styles/modules/Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Column 1 - Brand */}
          <div className={styles.column}>
            <img 
              src="/assets/logo_inf.webp" 
              alt="Infiniti Luxe Logo" 
              className={styles.footerLogoImage} 
            />
            <div className={styles.contactLinks}>
              <a href="tel:+971582109797">+971 58 210 9797</a>
              <a href="tel:+971541509377">+971 54 150 9377</a>
              <a href="mailto:infinitiempire0007@gmail.com">infinitiempire0007@gmail.com</a>
            </div>
          </div>

          {/* Column 2 - Travel Services */}
          <div className={styles.column}>
            <h4 className={styles.heading}>Travel</h4>
            <Link href="/travel/flights" className={styles.link}>Flights</Link>
            <Link href="/travel/holidays" className={styles.link}>Holidays</Link>
            <Link href="/travel/tours" className={styles.link}>Tours & Experiences</Link>
            <Link href="/travel/hotels" className={styles.link}>Hotels</Link>
            <Link href="/travel/honeymoons" className={styles.link}>Honeymoons</Link>
            <Link href="/travel/cruises" className={styles.link}>Cruises</Link>
            <Link href="/corporate-travel" className={styles.link}>Corporate Travel</Link>
          </div>

          {/* Column 3 - Company */}
          <div className={styles.column}>
            <h4 className={styles.heading}>Company</h4>
            <Link href="/about" className={styles.link}>About Us</Link>
            <Link href="/visa-services" className={styles.link}>Visa Services</Link>
            <Link href="/contact#contact-split" className={styles.link}>Contact</Link>
          </div>

          {/* Column 4 - Contact */}
          <div className={styles.column}>
            <h4 className={styles.heading}>Get in Touch</h4>
            <a href="https://wa.me/971582109797" target="_blank" rel="noopener noreferrer" className={styles.link}>WhatsApp: +971 58 210 9797</a>
            <a href="mailto:infinitiempire0007@gmail.com" className={styles.link}>infinitiempire0007@gmail.com</a>
            <a href="https://www.google.com/maps/place/Al+zarooni+building+(capital+building)/@25.2513242,55.3025704,17z" target="_blank" rel="noopener noreferrer" className={styles.link}>Al Zarooni Building, Burjuman, Dubai, UAE</a>
            <a 
              href="https://wa.me/971582109797?text=Hi%20Infiniti%20Luxe%2C%20I%20would%20like%20help%20planning%20my%20trip."
              target="_blank"
              rel="noopener noreferrer"
              className={styles.whatsappBtn}
            >
              WhatsApp Us
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <div className={styles.copyright}>© 2026 Infiniti Luxe. All rights reserved.</div>
          <div className={styles.legalLinks}>
            <Link href="#">Privacy Policy</Link>
            <Link href="#">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
