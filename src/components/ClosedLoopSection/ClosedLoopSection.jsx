import { useEffect, useRef, useState, useCallback } from 'react';
import styles from './ClosedLoopSection.module.css';

/* ── 7 values with positions (from Figma, relative to 393px frame) ─── */
const VALUES = [
  {
    name: 'Assign',
    desc: 'Teacher sets goals, assigns practice work',
    dot: [33, 430.5],
    labelX: 39.5, labelY: 458.69,
  },
  {
    name: 'Practise',
    desc: 'AI helps students learn, prevent cheating',
    dot: [45.85, 595.4],
    labelX: 52.5, labelY: 623.69,
  },
  {
    name: 'Evidence',
    desc: 'Teacher sees gaps- by students, by concept',
    dot: [177.55, 677.84],
    labelX: 189.5, labelY: 708.69,
  },
  {
    name: 'Intervene',
    desc: 'Teacher assigns personalised tasks in one click',
    dot: [325.31, 622.17],
    labelX: 332, labelY: 653.69,
  },
  {
    name: 'Inform',
    desc: 'Parents get specific actionable nudges',
    dot: [369.21, 482.97],
    labelX: 356, labelY: 513.69,
  },
  {
    name: 'Adapt',
    desc: 'Next day class shaped by learning evidence',
    dot: [294.26, 357.7],
    labelX: 302.5, labelY: 386,
  },
  {
    name: 'Govern',
    desc: 'Leadership sees patterns receives actionable insights',
    dot: [145.42, 333.07],
    labelX: 148.5, labelY: 361,
  },
];

const TOTAL_STEPS = VALUES.length + 1; // 7 values + 1 CTA

export default function ClosedLoopSection() {
  const outerRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);
  const [hasCompleted, setHasCompleted] = useState(false);

  const handleScroll = useCallback(() => {
    const outer = outerRef.current;
    if (!outer) return;

    const rect = outer.getBoundingClientRect();
    const sectionTop = -rect.top; // how far we've scrolled into the section
    const scrollableHeight = outer.offsetHeight - window.innerHeight;

    if (sectionTop < 0 || scrollableHeight <= 0) {
      // Haven't entered section yet
      if (!hasCompleted) setActiveStep(0);
      return;
    }

    if (hasCompleted) {
      // Already completed — always show final state
      setActiveStep(TOTAL_STEPS);
      return;
    }

    const progress = Math.min(sectionTop / scrollableHeight, 1);
    const step = Math.min(Math.floor(progress * TOTAL_STEPS), TOTAL_STEPS);
    setActiveStep(step);

    if (step >= TOTAL_STEPS) {
      setHasCompleted(true);
    }
  }, [hasCompleted]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Circle progress: 0 = gray, 1 = fully purple
  const circleProgress = Math.min(activeStep / VALUES.length, 1);
  const showCTA = activeStep >= TOTAL_STEPS || hasCompleted;

  return (
    <section
      ref={outerRef}
      className={styles.outer}
      style={hasCompleted ? { height: '100vh' } : undefined}
    >
      <div className={hasCompleted ? styles.stickyDone : styles.sticky}>
        <div className={styles.frame}>
          {/* Background gradient orbs */}
          <div className={styles.orbTL} aria-hidden="true" />
          <div className={styles.orbTR} aria-hidden="true" />
          <div className={styles.orbBL} aria-hidden="true" />

          {/* Header */}
          <div className={styles.header}>
            <h2 className={styles.heading}>
              Closed-Loop Learning Platform for Schools
            </h2>
            <p className={styles.subheading}>
              Anchored by Teachers - Supported by Parents and AI enabled
            </p>
          </div>

          {/* ── Circle + values ──────────────────────────── */}
          <div className={styles.circleArea}>
            {/* Main circle ring */}
            <svg
              className={styles.circleRing}
              viewBox="0 0 352.269 352.269"
              fill="none"
            >
              <defs>
                <linearGradient id="grayGrad" x1="63.7" y1="0" x2="278.9" y2="387.6" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#000" />
                  <stop offset="1" stopColor="#666" />
                </linearGradient>
              </defs>
              <circle
                cx="176.135"
                cy="176.135"
                r="175.599"
                stroke={circleProgress >= 1 ? '#9582FF' : 'url(#grayGrad)'}
                strokeWidth="1.07"
                style={{
                  transition: 'stroke 0.6s ease',
                }}
              />
            </svg>

            {/* Dots + Labels */}
            {VALUES.map((v, i) => {
              const isSeen = i < activeStep;
              const isActive = i === activeStep - 1 && activeStep <= VALUES.length;
              const isVisible = isSeen || showCTA;

              return (
                <div key={v.name}>
                  {/* Dot */}
                  <div
                    className={`${styles.dot} ${isVisible ? styles.dotActive : ''}`}
                    style={{ left: v.dot[0], top: v.dot[1] }}
                  />
                  {/* Label */}
                  <span
                    className={styles.label}
                    style={{
                      left: v.labelX,
                      top: v.labelY,
                      opacity: isActive ? 1 : isVisible || showCTA ? 0.8 : 0.1,
                      color: isActive || isVisible || showCTA ? '#fff' : 'rgba(255,255,255,0.1)',
                    }}
                  >
                    {v.name}
                  </span>
                </div>
              );
            })}

            {/* Center content: description or CTA */}
            <div className={styles.centerContent}>
              {!showCTA && activeStep > 0 && activeStep <= VALUES.length && (
                <p key={activeStep} className={styles.description}>
                  {VALUES[activeStep - 1].desc}
                </p>
              )}
              {showCTA && (
                <button className={styles.ctaBtn} type="button">
                  Try School Ai
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
