import { useEffect, useRef, useState } from 'react';
import styles from './Hero.module.css';

/* ── School logos ────────────────────────────────────────── */
const SCHOOL_LOGOS = [
  { src: '/assets/school-logo-1.png', alt: 'Partner School 1' },
  { src: '/assets/school-logo-2.png', alt: 'Partner School 2' },
  { src: '/assets/school-logo-3.png', alt: 'Partner School 3' },
  { src: '/assets/school-logo-4.png', alt: 'Partner School 4' },
  { src: '/assets/school-logo-5.png', alt: 'Partner School 5' },
  { src: '/assets/school-logo-6.png', alt: 'Partner School 6' },
  { src: '/assets/school-logo-7.png', alt: 'Partner School 7' },
  { src: '/assets/school-logo-8.png', alt: 'Partner School 8' },
  { src: '/assets/school-logo-9.png', alt: 'Partner School 9' },
  { src: '/assets/school-logo-10.png', alt: 'Partner School 10' },
  { src: '/assets/school-logo-11.png', alt: 'Partner School 11' },
  { src: '/assets/school-logo-12.png', alt: 'Partner School 12' },
  { src: '/assets/school-logo-13.png', alt: 'Partner School 13' },
];

const HINT_TEXTS = [
  'What is a future ready school?',
  'What is SchoolAi?',
  'How can SchoolAi help my school?',
  'How easy it is to adopt SchoolAi?',
];

export default function Hero() {
  const logoSet = [...SCHOOL_LOGOS, ...SCHOOL_LOGOS];
  const sectionRef = useRef(null);
  const [hintIndex, setHintIndex] = useState(0);
  const [hintVisible, setHintVisible] = useState(true);

  /* ── Interactive gradient blobs: follow pointer subtly ── */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const orbs = section.querySelectorAll('[data-orb]');
    let rafId = null;

    const handlePointer = (e) => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        // Normalise pointer to -1…1 range within section
        const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;

        orbs.forEach((orb, i) => {
          // Each orb moves a different amount for parallax feel
          const factor = (i + 1) * 12;
          orb.style.transform = `translate(${nx * factor}px, ${ny * factor}px)`;
        });
        rafId = null;
      });
    };

    section.addEventListener('pointermove', handlePointer);
    return () => {
      section.removeEventListener('pointermove', handlePointer);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  /* ── Rotating hint text ──────────────────────────────────── */
  useEffect(() => {
    const interval = setInterval(() => {
      setHintVisible(false);
      setTimeout(() => {
        setHintIndex((prev) => (prev + 1) % HINT_TEXTS.length);
        setHintVisible(true);
      }, 300); // brief pause then fade in next
    }, 3000); // total display time per hint
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className={styles.section} aria-label="Hero" ref={sectionRef}>
      {/* Background gradient blobs */}
      <div className={styles.orbTop} data-orb aria-hidden="true" />
      <div className={styles.orbBottomLeft} data-orb aria-hidden="true" />
      <div className={styles.orbBottomRight} data-orb aria-hidden="true" />

      <div className={styles.inner}>

        {/* ── Text column ───────────────────────────────── */}
        <div className={styles.textCol}>
          <h1 className={styles.heading}>
            Trusted AI Partner for{' '}
            <span className={styles.shimmer}>future&#8209;ready schools.</span>
          </h1>

          <p className={styles.subtext}>
            Enabling schools across India to become AI-powered
          </p>

          {/* School logo carousel */}
          <div className={styles.carouselWrapper} aria-label="Partner schools">
            <div className={styles.carouselTrack}>
              {logoSet.map((logo, i) => (
                <div key={i} className={styles.logoSlot} aria-hidden={i >= SCHOOL_LOGOS.length}>
                  <img
                    src={logo.src}
                    alt={i < SCHOOL_LOGOS.length ? logo.alt : ''}
                    width="57"
                    height="57"
                    loading={i < SCHOOL_LOGOS.length ? 'eager' : 'lazy'}
                    className={styles.schoolLogo}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Desktop-only CTA — hidden on mobile */}
          <a href="#cta" className={`btn-primary ${styles.cta} ${styles.ctaDesktop}`} aria-label="Learn more about CoSchool">
            About Us
          </a>
        </div>

        {/* ── Bottom section: connector + prompt + CTA ── */}
        <div className={styles.mediaCol}>
          <div className={styles.connectorArea}>
            {/* Connector line */}
            <div className={styles.connector} aria-hidden="true" />

            {/* CTA button with Vin character */}
            <div className={styles.ctaGroup}>
              <div className={styles.vinCharacter}>
                <img
                  src="/assets/f9eea7c0af5c6fb9ac1882d0ddfcdcf60ac3e972.png"
                  alt="Vin — CoSchool assistant"
                  className={styles.vinImg}
                />
              </div>
              <button className={styles.startBtn} type="button">
                <span className={styles.startBtnLabel}>Talk to Vin</span>
                <img
                  src="/assets/93bd38f320dbc9a8e7727ae41126a804833c0a9b.svg"
                  alt=""
                  className={styles.eqIcon}
                />
              </button>
            </div>

            {/* Rotating hint text */}
            <p className={`${styles.hintText} ${hintVisible ? styles.hintVisible : styles.hintHidden}`}>
              &ldquo; {HINT_TEXTS[hintIndex]} &rdquo;
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
