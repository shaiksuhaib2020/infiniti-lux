'use client';
import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Calendar, Users, Compass } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import styles from '@/styles/modules/TripSearch.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function TripSearch() {
  const containerRef = useRef(null);
  
  const [destination, setDestination] = useState('');
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [travellers, setTravellers] = useState('');
  const [tripType, setTripType] = useState('');

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.fromTo(containerRef.current,
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.7, 
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
        }
      }
    );
  }, []);

  const handleQuoteClick = () => {
    let dateStr = 'Not specified';
    if (startDate && endDate) {
      dateStr = `${format(startDate, 'MMM d, yyyy')} - ${format(endDate, 'MMM d, yyyy')}`;
    } else if (startDate) {
      dateStr = format(startDate, 'MMM d, yyyy');
    }

    const text = `Hi Infiniti Luxe, I would like a trip quote.
Destination: ${destination || 'Not specified'}
Dates: ${dateStr}
Travellers: ${travellers || 'Not specified'}
Trip Type: ${tripType || 'Not specified'}`;
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/971582109797?text=${encoded}`, '_blank');
  };

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.heading}>Where do you want to go?</h2>
        <p className={styles.subtext}>Tell us your destination and we&apos;ll take care of the rest.</p>
      </div>

      <div ref={containerRef} className={styles.searchBox}>
        <div className={styles.fieldsContainer}>
          <div className={styles.field}>
            <label>Destination</label>
            <div className={styles.inputWrapper}>
              <MapPin size={18} className={styles.icon} />
              <select value={destination} onChange={e => setDestination(e.target.value)}>
                <option value="" disabled hidden>Where to?</option>
                {['Dubai', 'Maldives', 'Switzerland', 'Turkey', 'France', 'Italy', 'Japan', 'Bali', 'Thailand', 'Australia', 'USA', 'Canada', 'UK', 'Saudi Arabia', 'Other'].map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles.field}>
            <label>Travel Dates</label>
            <div className={styles.inputWrapper}>
              <Calendar size={18} className={styles.icon} />
              <DatePicker
                selectsRange={true}
                startDate={startDate}
                endDate={endDate}
                onChange={(update) => {
                  setDateRange(update);
                }}
                isClearable={true}
                placeholderText="Departure &mdash; Return"
                className={styles.datePickerInput}
                dateFormat="dd MMM yyyy"
              />
            </div>
          </div>

          <div className={styles.field}>
            <label>Travellers</label>
            <div className={styles.inputWrapper}>
              <Users size={18} className={styles.icon} />
              <select value={travellers} onChange={e => setTravellers(e.target.value)}>
                <option value="" disabled hidden>How many?</option>
                {['1', '2', '3', '4', '5', '6', '7', '8', '9', '10+'].map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles.field}>
            <label>Trip Type</label>
            <div className={styles.inputWrapper}>
              <Compass size={18} className={styles.icon} />
              <select value={tripType} onChange={e => setTripType(e.target.value)}>
                <option value="" disabled hidden>Type of trip</option>
                {['Family', 'Honeymoon', 'Luxury', 'Adventure', 'Business', 'Solo', 'Group'].map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <button onClick={handleQuoteClick} className={styles.quoteBtn}>
          Get My Trip Quote
        </button>
      </div>
    </section>
  );
}
