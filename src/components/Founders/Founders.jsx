import { useEffect, useRef } from 'react';
import styles from './Founders.module.css';

const FOUNDERS_PHOTO = 'http://localhost:3845/assets/0ee1586dbffa13ca8932e31e99a9035aa8e589fd.png';
const VERT_LINE      = 'http://localhost:3845/assets/3a05e52d8b662a9c3c4b10e96eaceb33167358be.svg';

/* Placeholder partner logos — replace with actual assets */
const PARTNERS = [
  { name: 'Arise',          src: null },
  { name: 'CEO Clubs India', src: null },
  { name: 'NEP 2020',       src: null },
];

function useFadeIn() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('visible'); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

export default function Founders() {
  const headerRef  = useFadeIn();
  const photoRef   = useFadeIn();
  const bioRef     = useFadeIn();
  const missionRef = useFadeIn();
  const partnerRef = useFadeIn();

  return (
    <section id="founders" className={styles.section} aria-label="Founders and partners">

      {/* ── White bg — header ─────────────────────────────── */}
      <div ref={headerRef} className={`${styles.header} fade-in`}>
        <h2 className={styles.heading}>
          What this unlocks for your school
        </h2>
      </div>

      {/* ── Dark card section ─────────────────────────────── */}
      <div className={styles.darkCard}>

        {/* Founders title + line */}
        <div className={styles.foundersHeader}>
          <h2 className={styles.foundersTitle}>Founders</h2>
          <div className={styles.vertLine} aria-hidden="true">
            <img src={VERT_LINE} alt="" width="1" height="106" loading="lazy" />
          </div>
        </div>

        {/* Founders photo */}
        <div ref={photoRef} className={`${styles.photoWrap} fade-in`}>
          <div className={styles.photoInner}>
            <img
              src={FOUNDERS_PHOTO}
              alt="Founders Naga Tummala and Raj Yarlagadda"
              className={styles.photo}
              width="451"
              height="321"
              loading="lazy"
            />
            {/* Name badges */}
            <div className={styles.badge1} aria-label="Naga Tummala">
              <span className={styles.badgeName1}>Naga Tummala</span>
            </div>
            <div className={styles.badge2} aria-label="Raj Yarlagadda">
              <span className={styles.badgeName2}>Raj Yarlagadda</span>
            </div>
          </div>
        </div>

        {/* Bio */}
        <div ref={bioRef} className={`${styles.bio} fade-in`}>
          <p className={styles.bioText}>
            Naga Tummala and Raj Yarlagadda—35+ years combined experience in
            Indian education. They built SchoolAI to solve the problems they lived.
          </p>
        </div>

        {/* Vertical line */}
        <div className={styles.bioLine} aria-hidden="true">
          <img src={VERT_LINE} alt="" width="1" height="90" loading="lazy" />
        </div>

        {/* Mission */}
        <div ref={missionRef} className={`${styles.mission} fade-in`}>
          <p className={styles.missionLabel}>MISSION</p>
          <p className={styles.missionText}>
            Enable learning without knowledge gaps.
          </p>
        </div>
      </div>

      {/* ── Partners section (white bg) ───────────────────── */}
      <div ref={partnerRef} className={`${styles.partners} fade-in`}>
        <p className={styles.partnersLabel}>in partnership with</p>
        <div className={styles.partnerLogos} role="list" aria-label="Partner organisations">
          {PARTNERS.map((p) => (
            <div key={p.name} className={styles.partnerLogo} role="listitem" aria-label={p.name}>
              {p.src ? (
                <img src={p.src} alt={p.name} width="96" height="60" loading="lazy" />
              ) : (
                /* Placeholder until real logos are provided */
                <div className={styles.partnerPlaceholder}>
                  <span>{p.name}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
