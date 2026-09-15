'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from '@/styles/modules/travel/TravelPage.module.css';

const services = [
  {
    name: 'Flights',
    description: 'Economy, business or first class — we find the routes and handle the booking.',
    ctaText: 'Find flights',
    route: '/travel/flights',
    image: 'flights.webp'
  },
  {
    name: 'Hotels',
    description: 'Handpicked hotels from boutique city stays to five-star resort escapes.',
    ctaText: 'Find a hotel',
    route: '/travel/hotels',
    image: 'hotel.webp'
  },
  {
    name: 'Holiday Packages',
    description: 'Complete holidays, thoughtfully arranged — flights, hotels and transfers in one place.',
    ctaText: 'Explore holidays',
    route: '/travel/holidays',
    image: 'holiday_packages.webp'
  },
  {
    name: 'Tours & Experiences',
    description: 'Curated tours and local experiences that go beyond standard itineraries.',
    ctaText: 'Explore experiences',
    route: '/travel/tours',
    image: 'tours_card.webp'
  },
  {
    name: 'Honeymoons',
    description: 'Romantic escapes designed around the couple, not around a package.',
    ctaText: 'Plan a honeymoon',
    route: '/travel/honeymoons',
    image: 'https://images.unsplash.com/photo-1543168256-418811576931?q=80&w=800&auto=format&fit=crop'
  },
  {
    name: 'Cruises',
    description: 'Wake up somewhere new every day — cruise packages across the world\'s finest routes.',
    ctaText: 'Explore cruises',
    route: '/travel/cruises',
    image: 'cruise_1.webp'
  }
];

export default function TravelCards() {
  const gridRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      gridRef.current.children,
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: 0.55,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 85%'
        }
      }
    );
  }, []);

  return (
    <section className={styles.cardsSection}>
      <div className={styles.cardsContainer}>
        
        <div className={styles.cardsHeader}>
          <h2 className={styles.cardsHeading}>Our Services</h2>
          <p className={styles.cardsSubtext}>
            From flights to full holidays — one team, one place.
          </p>
        </div>
        
        <div className={styles.cardsGrid} ref={gridRef}>
          {services.map((svc, i) => {
            const isExternal = svc.image.startsWith('http');
            
            return (
              <Link key={i} href={svc.route} className={styles.cardItem}>
                <div className={styles.cardImageWrap}>
                  {isExternal ? (
                    <img 
                      src={svc.image} 
                      alt={svc.name}
                      className={styles.cardImage}
                    />
                  ) : (
                    <Image
                      src={`/assets/cards/${svc.image}`}
                      alt={svc.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className={styles.cardImage}
                    />
                  )}
                </div>
                
                <div className={styles.cardContent}>
                  <div>
                    <h3 className={styles.cardName}>{svc.name}</h3>
                    <p className={styles.cardDesc}>{svc.description}</p>
                  </div>
                  
                  <div className={styles.cardBottom}>
                    <div className={styles.cardDivider}></div>
                    <span className={styles.cardCta}>{svc.ctaText}</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
        
      </div>
    </section>
  );
}
