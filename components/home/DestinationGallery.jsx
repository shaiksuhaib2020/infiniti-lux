'use client';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import styles from '@/styles/modules/CircularGallery.module.css';

// Fallback component while WebGL loads or if it fails/SSR
function GalleryFallback() {
  const router = useRouter();
  const destinations = [
    { name: 'Dubai', route: '/contact?destination=dubai#contact-split' },
    { name: 'Maldives', route: '/contact?destination=maldives#contact-split' },
    { name: 'Switzerland', route: '/contact?destination=switzerland#contact-split' },
    { name: 'Turkey', route: '/contact?destination=turkey#contact-split' },
    { name: 'France', route: '/contact?destination=france#contact-split' },
    { name: 'Italy', route: '/contact?destination=italy#contact-split' },
    { name: 'United Kingdom', route: '/contact?destination=united-kingdom#contact-split' },
    { name: 'USA', route: '/contact?destination=usa#contact-split' },
    { name: 'Canada', route: '/contact?destination=canada#contact-split' },
    { name: 'Japan', route: '/contact?destination=japan#contact-split' },
    { name: 'Thailand', route: '/contact?destination=thailand#contact-split' },
    { name: 'Bali', route: '/contact?destination=bali#contact-split' },
    { name: 'Australia', route: '/contact?destination=australia#contact-split' },
    { name: 'Saudi Arabia', route: '/contact?destination=saudi-arabia#contact-split' }
  ];

  return (
    <div className={styles.fallbackContainer}>
      <div className={styles.fallbackRow}>
        {destinations.map((dest, i) => (
          <button 
            key={i} 
            className={styles.fallbackPill}
            onClick={() => router.push(dest.route)}
          >
            {dest.name}
          </button>
        ))}
      </div>
    </div>
  );
}

const CircularGallery = dynamic(
  () => import('@/components/ui/CircularGallery'),
  {
    ssr: false,
    loading: () => <GalleryFallback />
  }
);

const destinations = [
  { text: 'Dubai',          image: '/assets/destinations/Dubai.webp',         route: '/contact?destination=dubai#contact-split' },
  { text: 'Maldives',       image: '/assets/destinations/Maldives.webp',       route: '/contact?destination=maldives#contact-split' },
  { text: 'Switzerland',    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80', route: '/contact?destination=switzerland#contact-split' },
  { text: 'Turkey',         image: '/assets/destinations/Turkey.webp',         route: '/contact?destination=turkey#contact-split' },
  { text: 'France',         image: '/assets/destinations/France.webp',         route: '/contact?destination=france#contact-split' },
  { text: 'Italy',          image: '/assets/destinations/Italy.webp',          route: '/contact?destination=italy#contact-split' },
  { text: 'United Kingdom', image: '/assets/destinations/United_Kingdom.webp', route: '/contact?destination=united-kingdom#contact-split' },
  { text: 'USA',            image: '/assets/destinations/USA.webp',            route: '/contact?destination=usa#contact-split' },
  { text: 'Canada',         image: '/assets/destinations/Canada.webp',         route: '/contact?destination=canada#contact-split' },
  { text: 'Japan',          image: '/assets/destinations/Japan.webp',          route: '/contact?destination=japan#contact-split' },
  { text: 'Thailand',       image: '/assets/destinations/Thailand.webp',       route: '/contact?destination=thailand#contact-split' },
  { text: 'Bali',           image: '/assets/destinations/Bali.webp',           route: '/contact?destination=bali#contact-split' },
  { text: 'Australia',      image: '/assets/destinations/Austrilia.webp',      route: '/contact?destination=australia#contact-split' },
  { text: 'Saudi Arabia',   image: '/assets/destinations/saudi.webp',          route: '/contact?destination=saudi-arabia#contact-split' },
];

export default function DestinationGallery() {
  const router = useRouter();

  const handleSelect = (destination) => {
    router.push(destination.route);
  };

  return (
    <section className={styles.sectionWrapper}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.heading}>Where Will You Go Next?</h2>
        <p className={styles.subtext}>
          From the deserts of Arabia to the islands of the Indian Ocean — we&apos;ll get you there.
        </p>
      </div>

      <div className={styles.galleryWrapper}>
        <CircularGallery
          items={destinations}
          onSelect={handleSelect}
          bend={3}
          textColor="#0E1824"
          borderRadius={0.08} // the base component uses 0.05 (normalized UV units for radius). Need to see if it supports pixel values or 0-1 values.
          font='400 22px "Cormorant Garamond", serif'
        />
      </div>
    </section>
  );
}
