'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import styles from '@/styles/modules/Hero.module.css';

const words = ["Borders", "Expectations", "Imaginations", "Boundaries"];

export default function Hero() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const videoWrapperRef = useRef(null);
  const scrollIndRef = useRef(null);
  const wordRef = useRef(null);
  
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let currentIndex = 0;
    
    const transitionDuration = 0.45; 
    const pauseDuration = 2000; 

    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % words.length;
      
      gsap.to(wordRef.current, {
        y: -15,
        opacity: 0,
        duration: transitionDuration,
        ease: 'power2.inOut',
        onComplete: () => {
          currentIndex = nextIndex;
          setIndex(currentIndex);
          
          gsap.set(wordRef.current, { y: 15 });
          
          gsap.to(wordRef.current, {
            y: 0,
            opacity: 1,
            duration: transitionDuration,
            ease: 'power2.out'
          });
        }
      });
    }, pauseDuration + (transitionDuration * 1000 * 2));

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion) {
      gsap.fromTo(contentRef.current.children, 
        { opacity: 0, y: 30 }, 
        { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'power3.out' }
      );
    }

    gsap.to(scrollIndRef.current, {
      y: 10,
      opacity: 0.2,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut'
    });

    if (!prefersReducedMotion) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      });

      tl.to(contentRef.current, { y: -100, opacity: 0, duration: 1 }, 0)
        .to(videoWrapperRef.current, { scale: 1.05, y: 50, duration: 1 }, 0);
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.heroSection}>
      <div ref={videoWrapperRef} className={styles.videoWrapper}>
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          className={styles.heroVideo}
        >
          <source src="/assets/video/Hero_vid.webm" type="video/webm" />
        </video>
        <div className={styles.overlay}></div>
      </div>

      <div className={styles.cloudLayer} style={{ backgroundImage: 'url(https://assets.codepen.io/1462889/clouds.png)', opacity: 0.4, animationDuration: '60s' }}></div>
      <div className={styles.cloudLayer} style={{ backgroundImage: 'url(https://assets.codepen.io/1462889/clouds.png)', opacity: 0.3, animationDuration: '40s', animationDirection: 'reverse', transform: 'scale(1.2)' }}></div>

      <div className={styles.contentContainer}>
        <div ref={contentRef} className={styles.content}>
          <div className={styles.eyebrow}>EXPLORE · EXPERIENCE · ESCAPE</div>
          
          <h1 className={styles.headline}>
            Travel Beyond <span className={styles.pillWrapper}>
              <span ref={wordRef} className={styles.animatedWord}>
                {words[index]}
              </span>
            </span>.
          </h1>
          
          <p className={styles.subtext}>Explore the world with confidence.</p>
          
          <p className={styles.serviceLine}>
            Flights · Holidays · Tours · Visas · Hotels · Experiences
          </p>

          <div className={styles.buttonContainer}>
            <div className={styles.btnRow}>
              <Link href="/contact#contact-split" className={styles.primaryBtn}>
                Plan My Trip
              </Link>
              <Link href="/travel/holidays" className={styles.secondaryBtn}>
                Explore Holidays
              </Link>
            </div>
            
            <Link href="/contact#contact-split" className={styles.textLink}>
              Speak to a Travel Expert &rarr;
            </Link>
          </div>
        </div>
      </div>

      <div className={styles.scrollIndicatorWrapper}>
        <div className={styles.scrollText}>SCROLL TO EXPLORE</div>
        <div ref={scrollIndRef} className={styles.scrollIndicator}>
          <div className={styles.scrollLine}>
            <div className={styles.scrollDot}></div>
          </div>
        </div>
      </div>
    </section>
  );
}
