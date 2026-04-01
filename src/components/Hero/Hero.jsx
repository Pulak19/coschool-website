import { useEffect, useRef, useState } from 'react';
import styles from './Hero.module.css';

/* ── School logos ────────────────────────────────────────── */
const SCHOOL_LOGOS = [
  { src: '/assets/7189a43be41332f496c96c2c441cb0d41369c051.png', alt: 'Partner School 1' },
  { src: '/assets/317ba6c582beb06f3b2d8582cf8f2825f34cfd9e.png', alt: 'Partner School 2' },
  { src: '/assets/56cacf5efbe291c1a7ad94ff87df708d3478cdc6.png', alt: 'Partner School 3' },
  { src: '/assets/21cd530f0bc18ad3630da63e3150ea96c4118dfe.png', alt: 'Partner School 4' },
  { src: '/assets/ab8ed4ef94483d8e032d65850d16e40465e94f48.png', alt: 'Partner School 5' },
  { src: '/assets/1af9e7182a6274f1e6bf0d33e112a2214e408c3f.png', alt: 'Partner School 6' },
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
