'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from '@/styles/modules/ServiceCards.module.css';

gsap.registerPlugin(ScrollTrigger);

const services = [
  { id: 1, title: 'Flights', desc: "Fly anywhere in the world. We'll find the best routes for your journey.", cta: 'Find Flights', img: '/assets/cards/flights.webp', route: '/travel/flights' },
  { id: 2, title: 'Hotels', desc: 'Stay somewhere worth remembering. Handpicked hotels for every kind of traveller.', cta: 'Find a Hotel', img: '/assets/cards/hotel.webp', route: '/travel/hotels' },
  { id: 3, title: 'Holiday Packages', desc: 'Complete holidays, thoughtfully put together so you travel without the stress.', cta: 'Explore Holidays', img: '/assets/cards/holiday_packages.webp', route: '/travel/holidays' },
  { id: 4, title: 'Visa Assistance', desc: 'Professional document guidance for visa applications around the world.', cta: 'Check Visa Options', img: '/assets/cards/visa_card.webp', route: '/visa-services' },
  { id: 5, title: 'Tours & Experiences', desc: 'Go beyond the surface. Curated tours and local experiences in every destination.', cta: 'Explore Experiences', img: '/assets/cards/tours_card.webp', route: '/travel/tours' },
  { id: 6, title: 'Cruises', desc: "Wake up somewhere new every day. Cruise packages across the world's finest routes.", cta: 'Explore Cruises', img: '/assets/cards/cruise_1.webp', route: '/travel/cruises' },
  { id: 7, title: 'Corporate Travel', desc: 'Smarter business travel — flights, hotels and planning managed for your team.', cta: 'Business Enquiry', img: '/assets/cards/Corparate_card.webp', route: '/corporate-travel' },
];

export default function ServiceCards() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    
    const cards = containerRef.current.querySelectorAll(`.${styles.card}`);
    
    gsap.fromTo(cards,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%'
        }
      }
    );
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.heading}>Everything You Need to Travel</h2>
        <p className={styles.subtext}>From flights to full holidays — one team, one place.</p>
      </div>

      <div ref={containerRef} className={styles.grid}>
        {services.map((service) => (
          <Link key={service.id} href={service.route} className={styles.card}>
            <div className={styles.imageWrapper}>
              <img src={service.img} alt={service.title} className={styles.image} />
            </div>
            <div className={styles.body}>
              <h3 className={styles.title}>{service.title}</h3>
              <p className={styles.desc}>{service.desc}</p>
              <div className={styles.cta}>
                {service.cta}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
