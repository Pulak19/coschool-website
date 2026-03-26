import { useState } from 'react';
import styles from './IcebergSection.module.css';

export default function IcebergSection() {
  const [isDipped, setIsDipped] = useState(false);

  const handleIcebergTap = () => {
    setIsDipped(true);
    setTimeout(() => setIsDipped(false), 600);
  };

  return (
    <section className={styles.section} aria-label="Understanding the Learning Gap">
      <div className={styles.frame}>
        {/* Background gradient blobs */}
        <div className={styles.orbLeft} aria-hidden="true" />
        <div className={styles.orbRight} aria-hidden="true" />

        {/* Top connector line from previous section */}
        <div className={styles.topConnector} aria-hidden="true">
          <img src="/assets/7f5ff8cc69e97e5e2d6be2768514258996bc95a7.svg" alt="" className={styles.topConnectorSvg} />
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
        <p className={styles.bgTextVisible} aria-hidden="true">VISIBLE</p>
        <p className={styles.bgTextHidden} aria-hidden="true">HIDDEN</p>

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

        {/* ── Positive labels (above water) ─────────────────── */}
        <div className={styles.positives}>
          {/* Right-side labels */}
          <span className={styles.posBold} style={{ left: 190, top: 31 }}>Homework</span>
          <span className={styles.posDesc} style={{ left: 190, top: 46, width: 80 }}>Lessons seems on track</span>
          <span className={styles.posBold} style={{ left: 250, top: 90 }}>Report Card</span>
          <span className={styles.posDesc} style={{ left: 250, top: 105, width: 90 }}>Looks fine for each term</span>

          {/* Left-side labels */}
          <span className={`${styles.posBold} ${styles.alignRight}`} style={{ left: 96, top: 23 }}>Classes</span>
          <span className={`${styles.posDesc} ${styles.alignRight}`} style={{ left: 35, top: 38, width: 100 }}>Syllabus being covered timely</span>
          <span className={`${styles.posBold} ${styles.alignRight}`} style={{ left: 71, top: 90 }}>PTMs</span>
          <span className={`${styles.posDesc} ${styles.alignRight}`} style={{ left: -6, top: 105, width: 105 }}>Parents seem informed</span>
        </div>

        {/* ── Negative labels (below water) ─────────────────── */}
        <div className={styles.negatives}>
          {/* Left-side labels */}
          <span className={`${styles.negBold} ${styles.alignRight}`} style={{ left: 14, top: 20, width: 75 }}>Hidden learning gaps</span>
          <span className={`${styles.negDesc} ${styles.alignRight}`} style={{ left: -16, top: 52, width: 105 }}>Students practice without detection</span>
          <span className={`${styles.negBold} ${styles.alignRight}`} style={{ left: 25, top: 108 }}>Gaps Compound</span>
          <span className={`${styles.negDesc} ${styles.alignRight}`} style={{ left: -8, top: 124, width: 119 }}>Students move ahead with weak foundation</span>
          <span className={`${styles.negBold} ${styles.alignRight}`} style={{ left: 28, top: 179 }}>Helpless Parents</span>
          <span className={`${styles.negDesc} ${styles.alignRight}`} style={{ left: 5, top: 195, width: 111 }}>No concrete guidance from school</span>
          <span className={`${styles.negBold} ${styles.alignRight}`} style={{ left: 42, top: 247, width: 119 }}>Delayed Interventions</span>
          <span className={`${styles.negDesc} ${styles.alignRight}`} style={{ left: 50, top: 264, width: 111 }}>Teacher sees too late</span>

          {/* Right-side labels */}
          <span className={styles.negBold} style={{ left: 271, top: 24 }}>Generic Feedback</span>
          <span className={styles.negDesc} style={{ left: 271, top: 40, width: 95 }}>Arrives too late, not actionable</span>
          <span className={styles.negBold} style={{ left: 255, top: 84 }}>Fixed Lesson Plans</span>
          <span className={styles.negDesc} style={{ left: 255, top: 100, width: 111 }}>One-size teaching, no Personalisation</span>
          <span className={styles.negBold} style={{ left: 238, top: 147, width: 115 }}>Leadership takes blind calls</span>
          <span className={styles.negDesc} style={{ left: 238, top: 180, width: 121 }}>Decision without any learning visibility</span>
          <span className={styles.negBold} style={{ left: 200, top: 231 }}>No learning evidence</span>
          <span className={styles.negDesc} style={{ left: 200, top: 247, width: 111 }}>Practice stays invisible to teachers</span>
        </div>
      </div>
    </section>
  );
}
