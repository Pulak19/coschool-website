import { useEffect, useRef } from 'react';
import styles from './Founders.module.css';

const FOUNDERS_PHOTO = '/assets/0ee1586dbffa13ca8932e31e99a9035aa8e589fd.png';

function useFadeIn(threshold = 0.12) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('visible'); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return ref;
}

export default function Founders() {
  const headerRef  = useFadeIn();
  const photoRef   = useFadeIn();
  const bioRef     = useFadeIn();
  const missionRef = useFadeIn();

  return (
    <section id="founders" className={styles.section} aria-label="Founders">
      {/* Background gradient blobs */}
      <div className={styles.orbTR} aria-hidden="true" />
      <div className={styles.orbBR} aria-hidden="true" />
      <div className={styles.orbTL} aria-hidden="true" />

      {/* ── Dark card ────────────────────────────────────────── */}
      <div className={styles.darkCard}>

        {/* Founders title + connector */}
        <div ref={headerRef} className={`${styles.foundersHeader} fade-in`}>
          <h2 className={styles.foundersTitle}>Founders</h2>
          <div className={styles.connector} aria-hidden="true" />
        </div>

        {/* Founders photo with name badges */}
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
            <div className={styles.badge1} aria-label="Naga Tummala">
              <span className={styles.badgeName1}>Naga Tummala</span>
            </div>
            <div className={styles.badge2} aria-label="Raj Yarlagadda">
              <span className={styles.badgeName2}>Raj Yarlagadda</span>
            </div>
          </div>
        </div>

        {/* Bio + connector + mission — left-aligned block */}
        <div className={styles.contentBlock}>
          <div ref={bioRef} className="fade-in">
            <p className={styles.bioText}>
              33+ years of building child-centric institutions like Oakridge International &amp; Vikas, Co-founders of ARISE, and contributors to NEP 2020.
            </p>
          </div>

          <div className={styles.connectorSmall} aria-hidden="true" />

          <div ref={missionRef} className={`${styles.mission} fade-in`}>
            <span className={styles.missionLabel}>MISSION</span>
            <p className={styles.missionText}>
              Enable learning without knowledge gaps.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
