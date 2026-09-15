'use client';
import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';
import styles from '@/styles/modules/visa/Visa.module.css';

export default function VisaFAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const sectionRef = useRef(null);
  const accordionRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    gsap.fromTo(
      accordionRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const toggleOpen = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    { q: "Can you guarantee my visa will be approved?", a: "No. The decision on any visa application rests entirely with the relevant government or immigration authority. No agent or consultant can guarantee an approval. We are transparent about this because it matters. What we can guarantee is that your application will be professionally prepared and correctly submitted." },
    { q: "Do you submit the application on my behalf?", a: "In many cases, yes — where the process allows for third-party submission or sponsorship. For applications that require the applicant's direct involvement (such as biometric appointments or personal interviews), we prepare everything and guide you through each step." },
    { q: "How long does the visa process take?", a: "Processing times vary significantly by destination and by individual circumstances. Some eVisas are approved within hours. Others take several weeks. We advise on realistic timelines for each specific destination and recommend applying well ahead of travel." },
    { q: "What documents will I need?", a: "This depends on your destination, nationality, purpose of travel and personal circumstances. When you get in touch, we provide a complete and specific document checklist for your situation." },
    { q: "What happens if my application is refused?", a: "If a refusal occurs, we advise you on the documented reason and what your options are. Some destinations allow reapplication or appeal. We review what happened and guide you on how best to proceed." },
    { q: "Do you handle visas for all nationalities?", a: "We assist applicants of many nationalities. Eligibility and requirements vary by destination and passport held. The best way to confirm we can assist with your specific situation is to get in touch with your nationality and destination in mind." }
  ];

  return (
    <section ref={sectionRef} className={styles.faqSection}>
      <div className={styles.faqContainer}>
        <div className={styles.faqHeader}>
          <h2 className={styles.faqHeading}>Common Questions</h2>
          <p className={styles.faqSubtext}>Things our clients ask before working with us.</p>
        </div>
        
        <div ref={accordionRef} className={styles.accordionWrapper}>
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={i} className={styles.faqItem}>
                <button 
                  className={styles.faqQuestion} 
                  onClick={() => toggleOpen(i)}
                  aria-expanded={isOpen}
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`${styles.faqIcon} ${isOpen ? styles.open : ''}`} size={20} />
                </button>
                <div className={`${styles.faqAnswerWrapper} ${isOpen ? styles.open : ''}`}>
                  <div className={styles.faqAnswer}>
                    {faq.a}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
