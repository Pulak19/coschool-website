import { useState } from 'react';
import styles from './IcebergSection.module.css';

/* ── Text labels: top of iceberg (positive / above water) ── */
const POSITIVES_LEFT = [
  { bold: 'Classes', desc: 'Syllabus being covered timely', top: 10, boldRight: 147, descRight: 138 },
  { bold: 'PTMs', desc: 'Parents seem informed', top: 62, boldRight: 129, descRight: 120 },
];

const POSITIVES_RIGHT = [
  { bold: 'Homework', desc: 'Lessons seems on track', top: 0, left: 182, descLeft: 192 },
  { bold: 'Report Card', desc: 'Looks fine for each term', top: 39, left: 231, descLeft: 241 },
];

/* ── Text labels: bottom of iceberg (negative / below water) ── */
const NEGATIVES_LEFT = [
  { bold: 'Hidden learning gaps', desc: 'Students practice without detection', top: 33, boldRight: 80, descRight: 92, boldW: 75, descW: 105 },
  { bold: 'Gaps Compound', desc: 'Students move ahead with weak foundation', top: 114, boldRight: 104, descRight: 116, descW: 119 },
  { bold: 'Helpless Parents', desc: 'No concrete guidance from school', top: 175, boldRight: 133, descRight: 145, descW: 111 },
  { bold: 'Delayed Interventions', desc: 'Teacher sees too late', top: 234, boldRight: 172, descRight: 184, descW: 111 },
];

const NEGATIVES_RIGHT = [
  { bold: 'Generic Feedback', desc: 'Arrives too late, not actionable', top: 20, left: 280, descLeft: 274, descW: 95 },
  { bold: 'Fixed Lesson Plans', desc: 'One-size teaching, no Personalisation', top: 91, left: 258, descLeft: 252, descW: 111 },
  { bold: 'Leadership takes blind calls', desc: 'Decision without any learning visibility', top: 154, left: 236, descLeft: 230, boldW: 115, descW: 121 },
  { bold: 'No learning evidence', desc: 'Practice stays invisible to teachers', top: 238, left: 203, descLeft: 197, descW: 111 },
];

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
          <img
            src="/assets/7f5ff8cc69e97e5e2d6be2768514258996bc95a7.svg"
            alt=""
            className={styles.topConnectorSvg}
          />
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

        {/* Blue gradient (water below surface) */}
        <div className={styles.blueGradient} aria-hidden="true" />

        {/* Water surface line */}
        <div className={styles.middleLine} aria-hidden="true">
          <img
            src="/assets/ac979c386b725105bd3e9c8aec945ee20458650a.svg"
            alt=""
            className={styles.middleLineSvg}
          />
        </div>

        {/* Iceberg — floating + tap to dip */}
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
      </div>

      {/* ── Positive labels (above water) ─────────────────── */}
      <div className={styles.positives}>
        {/* Connector line from iceberg top to positives area */}
        <div className={styles.posConnector} aria-hidden="true">
          <img src="/assets/f6e2f5bfec429ab92e06be4de2eff80d1ed639bb.svg" alt="" className={styles.connectorSvg} />
        </div>

        {POSITIVES_LEFT.map((item, i) => (
          <div key={`pl-${i}`} className={styles.labelLeft} style={{ top: item.top }}>
            <span className={styles.posBold} style={{ right: 393 - 21 - item.boldRight }}>{item.bold}</span>
            <span className={styles.posDesc} style={{ right: 393 - 21 - item.descRight }}>{item.desc}</span>
          </div>
        ))}

        {POSITIVES_RIGHT.map((item, i) => (
          <div key={`pr-${i}`} className={styles.labelRight} style={{ top: item.top }}>
            <span className={styles.posBold} style={{ left: item.left - 21 }}>{item.bold}</span>
            <span className={styles.posDesc} style={{ left: (item.descLeft || item.left) - 21 }}>{item.desc}</span>
          </div>
        ))}
      </div>

      {/* ── Negative labels (below water) ─────────────────── */}
      <div className={styles.negatives}>
        {/* Connector lines for negatives — left side */}
        {[
          { left: 85 - 13, top: 0, h: 57 },
          { left: 109 - 13, top: 66, h: 57 },
          { left: 138 - 13, top: 127, h: 57 },
          { left: 177 - 13, top: 186, h: 57 },
        ].map((c, i) => (
          <div key={`ncl-${i}`} className={styles.negConnector} style={{ left: c.left, top: c.top, height: c.h }} aria-hidden="true">
            <img src="/assets/1babb7bb641385fdffad95f745450848ffab9ae7.svg" alt="" className={styles.connectorSvg} />
          </div>
        ))}

        {/* Connector lines for negatives — right side */}
        <div className={styles.negConnector} style={{ left: 274 - 13, top: 0, height: 31 }} aria-hidden="true">
          <img src="/assets/79ea2fe40e3a244a95218d1ae30c622248de602a.svg" alt="" className={styles.connectorSvg} />
        </div>
        <div className={styles.negConnector} style={{ left: 252 - 13, top: 56, height: 46 }} aria-hidden="true">
          <img src="/assets/8a49b1b037d563af56542672956e263ae94c7721.svg" alt="" className={styles.connectorSvg} />
        </div>
        <div className={styles.negConnector} style={{ left: 230 - 13, top: 108, height: 57 }} aria-hidden="true">
          <img src="/assets/1babb7bb641385fdffad95f745450848ffab9ae7.svg" alt="" className={styles.connectorSvg} />
        </div>
        <div className={styles.negConnector} style={{ left: 197 - 13, top: 155, height: 94 }} aria-hidden="true">
          <img src="/assets/f8c37ff20ec74fa2ae545800b816bfac70fc664c.svg" alt="" className={styles.connectorSvg} />
        </div>

        {NEGATIVES_LEFT.map((item, i) => (
          <div key={`nl-${i}`} className={styles.labelLeft} style={{ top: item.top }}>
            <span className={styles.negBold} style={{ right: 393 - 13 - (item.boldRight || 0), width: item.boldW }}>{item.bold}</span>
            <span className={styles.negDesc} style={{ right: 393 - 13 - item.descRight, width: item.descW }}>{item.desc}</span>
          </div>
        ))}

        {NEGATIVES_RIGHT.map((item, i) => (
          <div key={`nr-${i}`} className={styles.labelRight} style={{ top: item.top }}>
            <span className={styles.negBold} style={{ left: item.left - 13, width: item.boldW }}>{item.bold}</span>
            <span className={styles.negDesc} style={{ left: (item.descLeft || item.left) - 13, width: item.descW }}>{item.desc}</span>
          </div>
        ))}
      </div>
      </div>
    </section>
  );
}
