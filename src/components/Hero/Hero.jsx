import styles from './Hero.module.css';

/* ── YouTube embed ───────────────────────────────────────── */
const YT_ID    = '61iN2emMqbs';
const YT_EMBED = `https://www.youtube.com/embed/${YT_ID}?rel=0&playsinline=1`;

/* ── School logos ────────────────────────────────────────── */
const SCHOOL_LOGOS = [
  { src: '/assets/7189a43be41332f496c96c2c441cb0d41369c051.png', alt: 'Partner School 1' },
  { src: '/assets/317ba6c582beb06f3b2d8582cf8f2825f34cfd9e.png', alt: 'Partner School 2' },
  { src: '/assets/56cacf5efbe291c1a7ad94ff87df708d3478cdc6.png', alt: 'Partner School 3' },
  { src: '/assets/21cd530f0bc18ad3630da63e3150ea96c4118dfe.png', alt: 'Partner School 4' },
  { src: '/assets/ab8ed4ef94483d8e032d65850d16e40465e94f48.png', alt: 'Partner School 5' },
  { src: '/assets/1af9e7182a6274f1e6bf0d33e112a2214e408c3f.png', alt: 'Partner School 6' },
];

export default function Hero() {
  const logoSet = [...SCHOOL_LOGOS, ...SCHOOL_LOGOS];

  return (
    <section id="hero" className={styles.section} aria-label="Hero">
      {/* Background orbs */}
      <div className={styles.orbTopRight} aria-hidden="true" />
      <div className={styles.orbBottomLeft} aria-hidden="true" />

      <div className={styles.inner}>

        {/* ── Text column ───────────────────────────────── */}
        <div className={styles.textCol}>
          <h1 className={styles.heading}>
            India's trusted AI Partner for{' '}
            <span className={styles.shimmer}>future&#8209;ready schools.</span>
          </h1>

          <p className={styles.subtext}>
            Trusted by over 40 schools all over country in just 2 years.
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

        {/* ── Media column ──────────────────────────────── */}
        <div className={styles.mediaCol}>
          {/*
            connectorArea: holds the decorative vertical line (via ::before),
            the video, and the mobile-only CTA — in that order top to bottom.
          */}
          <div className={styles.connectorArea}>
            {/* Video frame — full-width on mobile */}
            <div className={styles.videoFrame}>
              <iframe
                className={styles.video}
                src={YT_EMBED}
                title="Intro video about CoSchool"
                allow="encrypted-media; picture-in-picture"
                allowFullScreen
                loading="eager"
              />
            </div>

            {/* Mobile-only CTA — hidden on desktop */}
            <a href="#cta" className={`btn-primary ${styles.cta} ${styles.ctaMobile}`} aria-label="Learn more about CoSchool">
              About Us
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
