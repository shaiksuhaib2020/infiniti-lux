'use client';
import { Phone, MessageCircle, Mail, MapPin } from 'lucide-react';
import styles from '@/styles/modules/contact/Contact.module.css';

export default function ContactInfo() {
  const whatsAppMsg = "Hi Infiniti Luxe, I would like help planning my trip.";
  const waLink = `https://wa.me/971582109797?text=${encodeURIComponent(whatsAppMsg)}`;

  return (
    <div className={styles.splitLeftWrapper}>
      <h2 className={styles.contactHeading}>Let&apos;s Plan Your Journey.</h2>
      <p className={styles.contactSubtext}>
        Tell us where you want to go and how we can help. A real travel consultant — not an automated system — will respond.
      </p>
      
      <div className={styles.methodsList}>
        <a href="tel:+971582109797" className={styles.methodRow}>
          <Phone className={styles.methodIcon} size={20} />
          <div className={styles.methodContent}>
            <div className={styles.methodLabel}>Call us</div>
            <div className={styles.methodDetail}>+971 58 210 9797</div>
          </div>
        </a>
        
        <a href={waLink} target="_blank" rel="noopener noreferrer" className={styles.methodRow}>
          <MessageCircle className={styles.methodIcon} size={20} />
          <div className={styles.methodContent}>
            <div className={styles.methodLabel}>WhatsApp</div>
            <div className={styles.methodDetail}>+971 58 210 9797</div>
          </div>
        </a>
        
        <a href="mailto:infinitiempire0007@gmail.com" className={styles.methodRow}>
          <Mail className={styles.methodIcon} size={20} />
          <div className={styles.methodContent}>
            <div className={styles.methodLabel}>Email</div>
            <div className={styles.methodDetail}>infinitiempire0007@gmail.com</div>
          </div>
        </a>
        
        <div className={styles.methodRow}>
          <MapPin className={styles.methodIcon} size={20} />
          <div className={styles.methodContent}>
            <div className={styles.methodLabel}>Location</div>
            <div className={styles.methodDetail}>Dubai, UAE</div>
          </div>
        </div>
      </div>
      
      <div className={styles.waBlock}>
        <div className={styles.waLabel}>Prefer WhatsApp?</div>
        <div className={styles.waHeading}>Chat With Us Directly</div>
        <a href={waLink} target="_blank" rel="noopener noreferrer" className={styles.waBtn}>
          Open WhatsApp
        </a>
      </div>
      
      <div className={styles.socialBlock}>
        <div className={styles.socialLabel}>Follow us</div>
        <div className={styles.socialRow}>
          <a href="#" className={styles.socialIcon} target="_blank" rel="noopener noreferrer">
            {/* TODO: Replace with Instagram URL when available */}
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
          </a>
          <a href="#" className={styles.socialIcon} target="_blank" rel="noopener noreferrer">
            {/* TODO: Replace with Facebook URL when available */}
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
          </a>
          <a href="#" className={styles.socialIcon} target="_blank" rel="noopener noreferrer">
            {/* TODO: Replace with LinkedIn URL when available */}
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
          </a>
        </div>
      </div>
    </div>
  );
}
