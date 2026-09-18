'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from '@/styles/modules/ServicePageTemplate.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function ServicePageTemplate({ config }) {
  const {
    serviceName,
    heroImage,
    heroHeadline,
    heroSupporting,
    whatsAppMessage,
    offerHeading,
    offerParagraphs,
    benefits,
    highlights,
    popularHeading,
    popularSubtext,
    popularOptions,
    enquiryCTAHeading,
    enquiryCTASupporting,
    serviceQueryParam,
  } = config;

  const heroHeadlineRef = useRef(null);
  const heroSupportRef = useRef(null);
  const heroCTARef = useRef(null);

  const offerSectionRef = useRef(null);
  const offerLeftRef = useRef(null);
  const offerRightRef = useRef(null);

  const popularSectionRef = useRef(null);
  const popularGridRef = useRef(null);

  const enquirySectionRef = useRef(null);
  const enquiryContentRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // SECTION 1: HERO
    const tlHero = gsap.timeline();
    tlHero
      .fromTo(
        heroHeadlineRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }
      )
      .fromTo(
        heroSupportRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
        '-=0.55' // 0.15s delay from headline start
      )
      .fromTo(
        heroCTARef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
        '-=0.45' // 0.25s delay from supporting start (so -0.55 + 0.1 = -0.45 roughly)
      );

    // SECTION 2: WHAT WE OFFER
    gsap.fromTo(
      offerLeftRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: offerSectionRef.current,
          start: 'top 75%',
        },
      }
    );

    gsap.fromTo(
      offerRightRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        delay: 0.2,
        scrollTrigger: {
          trigger: offerSectionRef.current,
          start: 'top 75%',
        },
      }
    );

    // SECTION 3: POPULAR OPTIONS
    const cards = popularGridRef.current.querySelectorAll(`.${styles.card}`);
    gsap.fromTo(
      cards,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: popularSectionRef.current,
          start: 'top 80%',
        },
      }
    );

    // SECTION 4: ENQUIRY CTA
    gsap.fromTo(
      enquiryContentRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: enquirySectionRef.current,
          start: 'top 80%',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const waLinkHero = `https://wa.me/971582109797?text=${encodeURIComponent(whatsAppMessage)}`;
  const waLinkFooter = `https://wa.me/971582109797?text=${encodeURIComponent(whatsAppMessage)}`;

  return (
    <>
      {/* SECTION 1: HERO */}
      <section className={styles.heroSection}>
        <div className={styles.heroImageWrapper}>
          <img src={`/assets/cards/${heroImage}`} alt={serviceName} className={styles.heroImage} />
          <div className={styles.heroOverlay}></div>
        </div>
        <div className={styles.heroContainer}>
          <div className={styles.serviceLabel}>{serviceName}</div>
          <h1 ref={heroHeadlineRef} className={styles.heroHeadline}>
            {heroHeadline}
          </h1>
          <p ref={heroSupportRef} className={styles.heroSupporting}>
            {heroSupporting}
          </p>
          <div ref={heroCTARef} className={styles.heroCTARow}>
            <a href={waLinkHero} target="_blank" rel="noopener noreferrer" className={styles.btnPrimary}>
              Enquire on WhatsApp
            </a>
            <Link href={`/contact?service=${serviceQueryParam}#contact-split`} className={styles.btnSecondary}>
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 2: WHAT WE OFFER */}
      <section ref={offerSectionRef} className={styles.offerSection}>
        <div className={styles.offerContainer}>
          <div ref={offerLeftRef} className={styles.offerLeft}>
            <div className={styles.sectionLabel}>What we offer</div>
            <h2 className={styles.offerHeading}>{offerHeading}</h2>
            <div className={styles.offerParagraphs}>
              {offerParagraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
            <div className={styles.benefitsList}>
              {benefits.map((b, i) => (
                <div key={i} className={styles.benefitItem}>
                  <div className={styles.benefitBar}></div>
                  <div className={styles.benefitContent}>
                    <div className={styles.benefitTitle}>{b.title}</div>
                    <div className={styles.benefitDesc}>{b.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div ref={offerRightRef} className={styles.offerRight}>
            {highlights.map((h, i) => (
              <div key={i} className={styles.highlightItem}>
                <div className={styles.highlightValue}>{h.value}</div>
                <div className={styles.highlightLabel}>{h.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: POPULAR OPTIONS */}
      <section ref={popularSectionRef} className={styles.popularSection}>
        <div className={styles.popularContainer}>
          <div className={styles.popularHeader}>
            <h2 className={styles.popularHeading}>{popularHeading}</h2>
            <p className={styles.popularSubtext}>{popularSubtext}</p>
          </div>
          <div ref={popularGridRef} className={styles.popularGrid}>
            {popularOptions.map((opt, i) => (
              <Link 
                key={i} 
                href={`/contact?service=${serviceQueryParam}&destination=${encodeURIComponent(opt.name)}#contact-split`} 
                className={styles.card}
              >
                <div className={styles.cardImageWrapper}>
                  <img 
                    src={`https://source.unsplash.com/featured/400x300/?${opt.imageQuery},travel`} 
                    alt={opt.name} 
                    className={styles.cardImage} 
                  />
                </div>
                <div className={styles.cardBody}>
                  <div className={styles.cardTitle}>{opt.name}</div>
                  <div className={styles.cardDesc}>{opt.description}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: ENQUIRY CTA */}
      <section ref={enquirySectionRef} className={styles.enquirySection}>
        <div ref={enquiryContentRef} className={styles.enquiryContainer}>
          <h2 className={styles.enquiryHeading}>{enquiryCTAHeading}</h2>
          <p className={styles.enquirySupporting}>{enquiryCTASupporting}</p>
          
          <div className={styles.enquiryCTARow}>
            <a href={waLinkFooter} target="_blank" rel="noopener noreferrer" className={styles.btnPrimary}>
              Plan on WhatsApp
            </a>
            <Link href={`/contact?service=${serviceQueryParam}#contact-split`} className={styles.btnSecondary}>
              Send an Enquiry
            </Link>
          </div>
          <p className={styles.enquiryReassurance}>
            No booking fees. No automated systems. A real travel consultant will respond.
          </p>
        </div>
      </section>
    </>
  );
}
