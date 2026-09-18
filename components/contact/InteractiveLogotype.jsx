'use client';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import styles from '@/styles/modules/contact/Contact.module.css';

export default function InteractiveLogotype({ targetId = 'contact-split', scrollLabel = 'Get in touch' }) {
  const containerRef = useRef(null);
  const wordmarkRef = useRef(null);
  const charRefs = useRef([]);
  const taglineRef = useRef(null);
  const underlineRef = useRef(null);
  const scrollInviteRef = useRef(null);
  const scrollLineRef = useRef(null);
  const [isTouch, setIsTouch] = useState(false);
  const [motionReduced, setMotionReduced] = useState(false);

  const word = "Infiniti Luxe";
  const chars = word.split('');

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setMotionReduced(prefersReducedMotion);
    setIsTouch(window.matchMedia('(hover: none)').matches);

    if (prefersReducedMotion) {
      // Instant reveal
      gsap.set(charRefs.current, { opacity: 1, y: 0, filter: 'blur(0px)' });
      gsap.set(taglineRef.current, { opacity: 1 });
      gsap.set(underlineRef.current, { width: 140 });
      gsap.set(scrollLineRef.current, { height: 48 });
      return;
    }

    const tl = gsap.timeline();

    charRefs.current.forEach((char, i) => {
      if (!char) return;
      tl.fromTo(
        char,
        { opacity: 0, y: 40, filter: 'blur(4px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.7, ease: 'power3.out' },
        i * 0.04
      );
    });

    tl.fromTo(
      taglineRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.8, ease: 'power2.out' },
      0.6
    );

    tl.fromTo(
      underlineRef.current,
      { scaleX: 0 },
      { scaleX: 1, transformOrigin: 'left center', duration: 0.8, ease: 'power2.inOut' },
      0.9
    );

    gsap.fromTo(
      scrollLineRef.current,
      { scaleY: 0 },
      { scaleY: 1, duration: 1.8, ease: 'power1.inOut', repeat: -1, yoyo: false, delay: 1.5 }
    );

  }, []);

  const handleMouseMove = (e) => {
    if (isTouch || motionReduced) return;
    
    requestAnimationFrame(() => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      charRefs.current.forEach((char) => {
        if (!char || char.innerHTML === '&nbsp;') return;
        
        const charRect = char.getBoundingClientRect();
        const charCenterX = charRect.left + charRect.width / 2;
        const charCenterY = charRect.top + charRect.height / 2;
        
        const distX = mouseX - charCenterX;
        const distY = mouseY - charCenterY;
        const distance = Math.sqrt(distX * distX + distY * distY);
        
        if (distance < 90) {
          const maxDisplacement = 10;
          const pull = 1 - distance / 90;
          const dispX = (distX / distance) * pull * maxDisplacement;
          const dispY = (distY / distance) * pull * maxDisplacement;
          
          gsap.to(char, { x: dispX, y: dispY, duration: 0.4, ease: 'power2.out', overwrite: 'auto' });
        } else {
          gsap.to(char, { x: 0, y: 0, duration: 0.4, ease: 'power2.out', overwrite: 'auto' });
        }
      });
    });
  };

  const handleMouseLeave = () => {
    if (isTouch || motionReduced) return;
    charRefs.current.forEach((char, i) => {
      if (!char) return;
      gsap.to(char, { x: 0, y: 0, duration: 0.6, ease: 'power3.out', delay: i * 0.02, overwrite: 'auto' });
    });
  };

  const scrollToNext = () => {
    const nextSection = document.getElementById(targetId);
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className={styles.logotypeSection}>
      <div 
        ref={containerRef} 
        className={styles.logotypeContainer}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div ref={wordmarkRef} className={styles.wordmark}>
          {chars.map((c, i) => {
            if (c === ' ') {
              return <span key={i} ref={el => charRefs.current[i] = el} className={styles.char} dangerouslySetInnerHTML={{ __html: '&nbsp;' }} />;
            }
            return <span key={i} ref={el => charRefs.current[i] = el} className={styles.char}>{c}</span>;
          })}
        </div>
        
        <div ref={taglineRef} className={styles.tagline}>
          Travel Beyond Boundaries.
          <div className={styles.underlineWrapper}>
            <div ref={underlineRef} className={styles.underline}></div>
          </div>
        </div>
      </div>
      
      <div ref={scrollInviteRef} className={styles.scrollInvite} onClick={scrollToNext}>
        <div ref={scrollLineRef} className={styles.scrollLine}></div>
        <div className={styles.scrollLabel}>{scrollLabel}</div>
      </div>
    </section>
  );
}

