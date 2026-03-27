import { useState, useEffect, useRef, useCallback } from 'react';
import styles from './IcebergSection.module.css';

export default function IcebergSection() {
  const [isDipped, setIsDipped] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showNegatives, setShowNegatives] = useState(false);
  const sectionRef = useRef(null);
  const negativesRef = useRef(null);
  const bgVisibleRef = useRef(null);
  const bgHiddenRef = useRef(null);

  // Section entrance observer
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Negatives reveal observer — triggers when negatives area enters viewport
  useEffect(() => {
    const el = negativesRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setShowNegatives(true); },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Scroll-linked parallax for background text
  const handleScroll = useCallback(() => {
    const section = sectionRef.current;
    if (!section) return;
    const rect = section.getBoundingClientRect();
    const scrollProgress = -rect.top / (rect.height || 1);

    if (bgVisibleRef.current) {
      bgVisibleRef.current.style.transform =
        `translateX(-50%) translateY(${scrollProgress * -18}px)`;
    }
    if (bgHiddenRef.current) {
      bgHiddenRef.current.style.transform =
        `translateX(-50%) translateY(${scrollProgress * 25}px)`;
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const handleIcebergTap = () => {
    setIsDipped(true);
    setTimeout(() => setIsDipped(false), 600);
  };

  return (
    <section
      ref={sectionRef}
      className={`${styles.section} ${isVisible ? styles.revealed : ''}`}
      aria-label="Understanding the Learning Gap"
    >
      <div className={styles.frame}>
        {/* Background gradient blobs */}
        <div className={styles.orbLeft} aria-hidden="true" />
        <div className={styles.orbRight} aria-hidden="true" />

        {/* Ornament line below header leading to iceberg */}
        <div className={styles.ornamentLine} aria-hidden="true">
          <img src="/assets/7f5ff8cc69e97e5e2d6be2768514258996bc95a7.svg" alt="" className={styles.ornamentLineSvg} />
        </div>

        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.heading}>Understanding the Learning Gap</h2>
          <p className={styles.subheading}>
            A broken flow in today's education system.<br />
            Learning gaps doesn't appear suddenly.<br />
            They compound silently.
          </p>
        </div>

        {/* ── Translucent background text ─────────────────── */}
        <p ref={bgVisibleRef} className={styles.bgTextVisible} aria-hidden="true">VISIBLE</p>
        <p ref={bgHiddenRef} className={styles.bgTextHidden} aria-hidden="true">HIDDEN</p>

        {/* ── Illustration area ─────────────────────────────── */}
        <div className={styles.illustration}>
          {/* Bottom green background */}
          <div className={styles.bottomGreen} aria-hidden="true" />

          {/* Iceberg — z-index BELOW water layers */}
          <div
            className={`${styles.iceberg} ${isDipped ? styles.icebergDipped : ''}`}
            onClick={handleIcebergTap}
            role="button"
            tabIndex={0}
            aria-label="Tap to interact with the iceberg"
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleIcebergTap(); }}
          >
            <img
              src="/assets/2681b23b953da316efdf72f4907d6c586c76662b.svg"
              alt="Iceberg illustration showing visible and hidden learning gaps"
              className={styles.icebergSvg}
              draggable={false}
            />
          </div>

          {/* Blue gradient — ON TOP of iceberg */}
          <div className={styles.blueGradient} aria-hidden="true" />

          {/* Water surface line — ON TOP of iceberg */}
          <div className={styles.middleLine} aria-hidden="true">
            <img src="/assets/ac979c386b725105bd3e9c8aec945ee20458650a.svg" alt="" className={styles.middleLineSvg} />
          </div>

          {/* Subtle bubbles rising from bottom */}
          <div className={styles.bubblesContainer} aria-hidden="true">
            <div className={`${styles.bubble} ${styles.b1}`} />
            <div className={`${styles.bubble} ${styles.b2}`} />
            <div className={`${styles.bubble} ${styles.b3}`} />
            <div className={`${styles.bubble} ${styles.b4}`} />
            <div className={`${styles.bubble} ${styles.b5}`} />
            <div className={`${styles.bubble} ${styles.b6}`} />
          </div>
        </div>

        {/* ── Positive labels (above water) — staggered blur-in ── */}
        <div className={styles.positives}>
          {/* Cluster 0: Classes (left) */}
          <span className={`${styles.posBold} ${styles.alignRight} ${isVisible ? styles.blurIn : styles.blurHidden}`} style={{ left: 96, top: 23, '--stagger': 0 }}>Classes</span>
          <span className={`${styles.posDesc} ${styles.alignRight} ${isVisible ? styles.blurIn : styles.blurHidden}`} style={{ left: 35, top: 38, width: 100, '--stagger': 0 }}>Syllabus being covered timely</span>

          {/* Cluster 1: Homework (right) */}
          <span className={`${styles.posBold} ${isVisible ? styles.blurIn : styles.blurHidden}`} style={{ left: 190, top: 31, '--stagger': 1 }}>Homework</span>
          <span className={`${styles.posDesc} ${isVisible ? styles.blurIn : styles.blurHidden}`} style={{ left: 190, top: 46, width: 80, '--stagger': 1 }}>Lessons seems on track</span>

          {/* Cluster 2: PTMs (left) */}
          <span className={`${styles.posBold} ${styles.alignRight} ${isVisible ? styles.blurIn : styles.blurHidden}`} style={{ left: 71, top: 90, '--stagger': 2 }}>PTMs</span>
          <span className={`${styles.posDesc} ${styles.alignRight} ${isVisible ? styles.blurIn : styles.blurHidden}`} style={{ left: -6, top: 105, width: 105, '--stagger': 2 }}>Parents seem informed</span>

          {/* Cluster 3: Report Card (right) */}
          <span className={`${styles.posBold} ${isVisible ? styles.blurIn : styles.blurHidden}`} style={{ left: 250, top: 90, '--stagger': 3 }}>Report Card</span>
          <span className={`${styles.posDesc} ${isVisible ? styles.blurIn : styles.blurHidden}`} style={{ left: 250, top: 105, width: 90, '--stagger': 3 }}>Looks fine for each term</span>
        </div>

        {/* ── Negative labels (below water) — staggered blur-in on scroll ── */}
        <div ref={negativesRef} className={styles.negatives}>
          {/* Cluster 0: Hidden learning gaps (left) */}
          <span className={`${styles.negBold} ${styles.alignRight} ${showNegatives ? styles.blurIn : styles.blurHidden}`} style={{ left: 14, top: 20, width: 75, '--stagger': 0 }}>Hidden learning gaps</span>
          <span className={`${styles.negDesc} ${styles.alignRight} ${showNegatives ? styles.blurIn : styles.blurHidden}`} style={{ left: -16, top: 52, width: 105, '--stagger': 0 }}>Students practice without detection</span>

          {/* Cluster 1: Generic Feedback (right) */}
          <span className={`${styles.negBold} ${showNegatives ? styles.blurIn : styles.blurHidden}`} style={{ left: 271, top: 24, '--stagger': 1 }}>Generic Feedback</span>
          <span className={`${styles.negDesc} ${showNegatives ? styles.blurIn : styles.blurHidden}`} style={{ left: 271, top: 40, width: 95, '--stagger': 1 }}>Arrives too late, not actionable</span>

          {/* Cluster 2: Gaps Compound (left) */}
          <span className={`${styles.negBold} ${styles.alignRight} ${showNegatives ? styles.blurIn : styles.blurHidden}`} style={{ left: 25, top: 108, '--stagger': 2 }}>Gaps Compound</span>
          <span className={`${styles.negDesc} ${styles.alignRight} ${showNegatives ? styles.blurIn : styles.blurHidden}`} style={{ left: -8, top: 124, width: 119, '--stagger': 2 }}>Students move ahead with weak foundation</span>

          {/* Cluster 3: Fixed Lesson Plans (right) */}
          <span className={`${styles.negBold} ${showNegatives ? styles.blurIn : styles.blurHidden}`} style={{ left: 255, top: 84, '--stagger': 3 }}>Fixed Lesson Plans</span>
          <span className={`${styles.negDesc} ${showNegatives ? styles.blurIn : styles.blurHidden}`} style={{ left: 255, top: 100, width: 111, '--stagger': 3 }}>One-size teaching, no Personalisation</span>

          {/* Cluster 4: Helpless Parents (left) */}
          <span className={`${styles.negBold} ${styles.alignRight} ${showNegatives ? styles.blurIn : styles.blurHidden}`} style={{ left: 28, top: 179, '--stagger': 4 }}>Helpless Parents</span>
          <span className={`${styles.negDesc} ${styles.alignRight} ${showNegatives ? styles.blurIn : styles.blurHidden}`} style={{ left: 5, top: 195, width: 111, '--stagger': 4 }}>No concrete guidance from school</span>

          {/* Cluster 5: Leadership takes blind calls (right) */}
          <span className={`${styles.negBold} ${showNegatives ? styles.blurIn : styles.blurHidden}`} style={{ left: 238, top: 147, width: 115, '--stagger': 5 }}>Leadership takes blind calls</span>
          <span className={`${styles.negDesc} ${showNegatives ? styles.blurIn : styles.blurHidden}`} style={{ left: 238, top: 180, width: 121, '--stagger': 5 }}>Decision without any learning visibility</span>

          {/* Cluster 6: Delayed Interventions (left) */}
          <span className={`${styles.negBold} ${styles.alignRight} ${showNegatives ? styles.blurIn : styles.blurHidden}`} style={{ left: 42, top: 247, width: 119, '--stagger': 6 }}>Delayed Interventions</span>
          <span className={`${styles.negDesc} ${styles.alignRight} ${showNegatives ? styles.blurIn : styles.blurHidden}`} style={{ left: 50, top: 264, width: 111, '--stagger': 6 }}>Teacher sees too late</span>

          {/* Cluster 7: No learning evidence (right) */}
          <span className={`${styles.negBold} ${showNegatives ? styles.blurIn : styles.blurHidden}`} style={{ left: 200, top: 231, '--stagger': 7 }}>No learning evidence</span>
          <span className={`${styles.negDesc} ${showNegatives ? styles.blurIn : styles.blurHidden}`} style={{ left: 200, top: 247, width: 111, '--stagger': 7 }}>Practice stays invisible to teachers</span>
        </div>
      </div>
    </section>
  );
}
