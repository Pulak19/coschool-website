import styles from './Hero.module.css';

/* ── YouTube embed ───────────────────────────────────────── */
const YT_ID       = '61iN2emMqbs';
const YT_EMBED    = `https://www.youtube.com/embed/${YT_ID}?autoplay=1&mute=1&loop=1&playlist=${YT_ID}&rel=0&playsinline=1`;

/* ── Asset URLs (from Figma localhost server) ─────────────── */
const SCHOOL_LOGOS = [
  { src: 'http://localhost:3845/assets/7189a43be41332f496c96c2c441cb0d41369c051.png', alt: 'Partner School 1' },
  { src: 'http://localhost:3845/assets/317ba6c582beb06f3b2d8582cf8f2825f34cfd9e.png', alt: 'Partner School 2' },
  { src: 'http://localhost:3845/assets/56cacf5efbe291c1a7ad94ff87df708d3478cdc6.png', alt: 'Partner School 3' },
  { src: 'http://localhost:3845/assets/21cd530f0bc18ad3630da63e3150ea96c4118dfe.png', alt: 'Partner School 4' },
  { src: 'http://localhost:3845/assets/ab8ed4ef94483d8e032d65850d16e40465e94f48.png', alt: 'Partner School 5' },
  { src: 'http://localhost:3845/assets/1af9e7182a6274f1e6bf0d33e112a2214e408c3f.png', alt: 'Partner School 6' },
];

export default function Hero() {

  // Duplicate logos for seamless infinite scroll
  const logoSet = [...SCHOOL_LOGOS, ...SCHOOL_LOGOS];

  return (
    <section id="hero" className={styles.section} aria-label="Hero">
      {/* Background orbs */}
      <div className={styles.orbTopRight} aria-hidden="true" />
      <div className={styles.orbBottomLeft} aria-hidden="true" />

      <div className={styles.inner}>
        {/* ── Left / Text column ───────────────────────────── */}
        <div className={styles.textCol}>
          <h1 className={styles.heading}>
            India's trusted AI Partner for future&#8209;ready schools.
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

          <a href="#cta" className={`btn-primary ${styles.cta}`} aria-label="Learn more about CoSchool">
            About Us
          </a>
        </div>

        {/* ── Right / Media column ─────────────────────────── */}
        <div className={styles.mediaCol}>
          {/* Vertical centre line (decorative) */}
          <div className={styles.centreLine} aria-hidden="true">
            <img
              src="http://localhost:3845/assets/06f6282eca5939739fbfc96885e61200d300680c.svg"
              alt=""
              width="1"
              height="323"
            />
          </div>

          {/* Video frame — YouTube embed, autoplays muted */}
          <div className={styles.videoFrame}>
            <iframe
              className={styles.video}
              src={YT_EMBED}
              title="Intro video about CoSchool"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
              loading="eager"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
