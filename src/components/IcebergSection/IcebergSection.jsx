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
              src="/assets/eda2c92433f3f834d41f263f3369731d6cd68886.svg"
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
          {/* Elastic connector lines — positive side */}
          <div className={`${styles.elasticLine} ${styles.elasticPos}`} style={{ left: 192, top: 31, height: 59 }} />
          <div className={`${styles.elasticLine} ${styles.elasticPos}`} style={{ left: 144, top: 39, height: 47 }} />
          <div className={`${styles.elasticLine} ${styles.elasticPos}`} style={{ left: 240, top: 70, height: 54 }} />
          <div className={`${styles.elasticLine} ${styles.elasticPos}`} style={{ left: 120, top: 93, height: 36 }} />

          {/* Right-side labels */}
          <span className={styles.posBold} style={{ left: 182, top: 0 }}>Homework</span>
          <span className={styles.posDesc} style={{ left: 182, top: 15 }}>Lessons seems on track</span>
          <span className={styles.posBold} style={{ left: 231, top: 39 }}>Report Card</span>
          <span className={styles.posDesc} style={{ left: 231, top: 54 }}>Looks fine for each term</span>

          {/* Left-side labels (right-aligned) */}
          <span className={`${styles.posBold} ${styles.alignRight}`} style={{ right: 355 - 149, top: 8 }}>Classes</span>
          <span className={`${styles.posDesc} ${styles.alignRight}`} style={{ left: 4, top: 23 }}>Syllabus being covered timely</span>
          <span className={`${styles.posBold} ${styles.alignRight}`} style={{ right: 355 - 129, top: 62 }}>PTMs</span>
          <span className={`${styles.posDesc} ${styles.alignRight}`} style={{ left: 14, top: 77 }}>Parents seem informed</span>
        </div>

        {/* ── Negative labels (below water) ─────────────────── */}
        <div className={styles.negatives}>
          {/* Elastic connector lines — negative side (left) */}
          <div className={`${styles.elasticLine} ${styles.elasticNeg}`} style={{ left: 85, top: 33, height: 33 }} />
          <div className={`${styles.elasticLine} ${styles.elasticNeg}`} style={{ left: 109, top: 115, height: 49 }} />
          <div className={`${styles.elasticLine} ${styles.elasticNeg}`} style={{ left: 138, top: 176, height: 17 }} />
          <div className={`${styles.elasticLine} ${styles.elasticNeg}`} style={{ left: 177, top: 234, height: 35 }} />

          {/* Elastic connector lines — negative side (right) */}
          <div className={`${styles.elasticLine} ${styles.elasticNeg}`} style={{ left: 278, top: 33, height: 31 }} />
          <div className={`${styles.elasticLine} ${styles.elasticNeg}`} style={{ left: 257, top: 89, height: 20 }} />
          <div className={`${styles.elasticLine} ${styles.elasticNeg}`} style={{ left: 235, top: 154, height: 46 }} />
          <div className={`${styles.elasticLine} ${styles.elasticNeg}`} style={{ left: 206, top: 239, height: 80 }} />

          {/* Left-side labels */}
          <span className={`${styles.negBold} ${styles.alignRight}`} style={{ left: 17, top: 33, width: 75 }}>Hidden learning gaps</span>
          <span className={`${styles.negDesc} ${styles.alignRight}`} style={{ left: -13, top: 65, width: 105 }}>Students practice without detection</span>
          <span className={`${styles.negBold} ${styles.alignRight}`} style={{ left: 30, top: 115 }}>Gaps Compound</span>
          <span className={`${styles.negDesc} ${styles.alignRight}`} style={{ left: -3, top: 131, width: 119 }}>Students move ahead with weak foundation</span>
          <span className={`${styles.negBold} ${styles.alignRight}`} style={{ left: 57, top: 176 }}>Helpless Parents</span>
          <span className={`${styles.negDesc} ${styles.alignRight}`} style={{ left: 34, top: 192, width: 111 }}>No concrete guidance from school</span>
          <span className={`${styles.negBold} ${styles.alignRight}`} style={{ left: 67, top: 234 }}>Delayed Interventions</span>
          <span className={`${styles.negDesc} ${styles.alignRight}`} style={{ left: 73, top: 251, width: 111 }}>Teacher sees too late</span>

          {/* Right-side labels */}
          <span className={styles.negBold} style={{ left: 269, top: 33 }}>Generic Feedback</span>
          <span className={styles.negDesc} style={{ left: 269, top: 49, width: 95 }}>Arrives too late, not actionable</span>
          <span className={styles.negBold} style={{ left: 249, top: 92 }}>Fixed Lesson Plans</span>
          <span className={styles.negDesc} style={{ left: 249, top: 108, width: 111 }}>One-size teaching, no Personalisation</span>
          <span className={styles.negBold} style={{ left: 224, top: 154, width: 115 }}>Leadership takes blind calls</span>
          <span className={styles.negDesc} style={{ left: 224, top: 187, width: 121 }}>Decision without any learning visibility</span>
          <span className={styles.negBold} style={{ left: 197, top: 239 }}>No learning evidence</span>
          <span className={styles.negDesc} style={{ left: 197, top: 255, width: 111 }}>Practice stays invisible to teachers</span>
        </div>
      </div>
    </section>
  );
}
