'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from '@/styles/modules/VisaHighlight.module.css';

gsap.registerPlugin(ScrollTrigger);

const tags = ['Schengen', 'UK', 'USA', 'Canada', 'Australia', 'Japan', 'Turkey', 'UAE', 'Saudi Arabia', 'Other'];

export default function VisaHighlight() {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      // Animate left content (staggered fade up)
      gsap.fromTo(sectionRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%'
          }
        }
      );

      // Animate the image card (slide in from right)
      const imageCard = document.querySelector(`.${styles.imageCard}`);
      if (imageCard) {
        gsap.fromTo(imageCard,
          { opacity: 0, x: 60, scale: 0.95 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: imageCard,
              start: 'top 85%'
            }
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div ref={sectionRef} className={styles.content}>
          <div className={styles.label}>Visa Services</div>
          <div className={styles.accentLine}></div>
          
          <h2 className={styles.heading}>Your Journey Starts With the Right Preparation.</h2>
          
          <p className={styles.bodyText}>
            We provide professional visa application assistance and document guidance for destinations around the world. Our team will walk you through the process, help you prepare your documents, and submit on your behalf. The final decision rests with the relevant immigration authority.
          </p>

          <div className={styles.tagsContainer}>
            {tags.map(tag => (
              <Link
                key={tag}
                href={tag === 'Other' ? '/contact?service=visa#contact-split' : `/visa-services#visa-destinations`}
                className={styles.tag}
                style={{ textDecoration: 'none' }}
              >
                {tag}
              </Link>
            ))}
          </div>

          <div className={styles.btnGroup}>
            <Link href="/visa-services" className={styles.primaryBtn}>
              Check Visa Requirements
            </Link>
            <a 
              href="https://wa.me/971582109797?text=Hi%20Infiniti%20Luxe%2C%20I%20need%20help%20with%20a%20visa%20application."
              target="_blank"
              rel="noopener noreferrer"
              className={styles.secondaryBtn}
            >
              WhatsApp for Visa Help
            </a>
          </div>
        </div>
        
        <div className={styles.visualColumn}>
          <div className={styles.imageCard}>
            <img
              src="/assets/visa/visa_1.webp"
              alt="Professional visa application assistance by Infiniti Luxe"
              className={styles.visaImage}
              loading="lazy"
            />
            <div className={styles.imageOverlay}>
              <span className={styles.overlayBadge}>Expert Visa Guidance</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
