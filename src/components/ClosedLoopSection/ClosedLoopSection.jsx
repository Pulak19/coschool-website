import { useEffect, useRef, useState, useCallback } from 'react';
import styles from './ClosedLoopSection.module.css';

/* ── Assets ──────────────────────────────────────────────── */
const LOGO_LEFT  = '/assets/school-ai-logo-left-white.svg';
const LOGO_RIGHT = '/assets/school-ai-logo-right-white.svg';
const BY_COSCHOOL = '/assets/by-coschool-white.svg';

/* ── 7 values with positions (from Figma, full-frame coords, center-based)
   Clockwise from Assign (9 o'clock) → up → right → down ─── */
const VALUES = [
  {
    name: 'Assign',
    desc: 'Teacher sets goals, assigns practice work',
    dot: [34.57, 504.9],
    labelX: 44, labelY: 541.4,
  },
  {
    name: 'Practise',
    desc: 'AI helps students learn, prevents cheating',
    dot: [158.57, 390.9],
    labelX: 162, labelY: 425.5,
  },
  {
    name: 'Evidence',
    desc: 'Teacher sees gaps - by student, by concept',
    dot: [308.57, 422.9],
    labelX: 306, labelY: 457.5,
  },
  {
    name: 'Intervene',
    desc: 'Teacher assigns personalised tasks in one click',
    dot: [373.57, 538.9],
    labelX: 348, labelY: 574.19,
  },
  {
    name: 'Inform',
    desc: 'Parents get specific, actionable nudges',
    dot: [328.57, 677.9],
    labelX: 329, labelY: 713.19,
  },
  {
    name: 'Adapt',
    desc: "Next day's class shaped by learning evidence",
    dot: [188.57, 737.9],
    labelX: 189, labelY: 773.19,
  },
  {
    name: 'Govern',
    desc: 'Leadership sees patterns, receives actionable insights',
    dot: [56.57, 660.9],
    labelX: 57, labelY: 696.19,
  },
];

const TOTAL_STEPS = VALUES.length + 2; // 7 values + 1 CTA reveal + 1 CTA hold

export default function ClosedLoopSection() {
  const outerRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);

  const handleScroll = useCallback(() => {
    const outer = outerRef.current;
    if (!outer) return;

    const rect = outer.getBoundingClientRect();
    const sectionTop = -rect.top;
    const scrollableHeight = outer.offsetHeight - window.innerHeight;

    if (sectionTop < 0 || scrollableHeight <= 0) {
      setActiveStep(0);
      return;
    }

    const progress = Math.min(sectionTop / scrollableHeight, 1);
    const step = Math.min(Math.floor(progress * TOTAL_STEPS), TOTAL_STEPS);
    setActiveStep(step);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const circleProgress = Math.min(activeStep / VALUES.length, 1);
  const showCTA = activeStep > VALUES.length;

  return (
    <section ref={outerRef} className={styles.outer}>
      <div className={styles.sticky}>
        <div className={styles.frame}>
          {/* Background gradient orbs */}
          <div className={styles.orbTL} aria-hidden="true" />
          <div className={styles.orbTR} aria-hidden="true" />
          <div className={styles.orbBL} aria-hidden="true" />

          {/* ── Logo frame lines with shimmer ─────────────── */}
          <div className={styles.logoFrame} aria-hidden="true">
            <span className={styles.logoFrameRight} />
            <span className={styles.logoFrameShimmerTop} />
            <span className={styles.logoFrameShimmerLeft} />
            <span className={styles.logoFrameShimmerRight} />
          </div>

          {/* ── Header ─────────────────────────────────────── */}
          <div className={styles.header}>
            <span className={styles.eyebrow}>INTRODUCING</span>

            {/* SchoolAI logo (white) */}
            <div className={styles.brandLogo} aria-label="School AI by CoSchool">
              <div className={styles.brandLogoMain}>
                <img src={LOGO_LEFT} alt="School AI" className={styles.logoLeft} width="138" />
                <img src={LOGO_RIGHT} alt="" className={styles.logoRight} width="41" aria-hidden="true" />
              </div>
              <div className={styles.brandByRow}>
                <span className={styles.brandByText}>by</span>
                <img src={BY_COSCHOOL} alt="CoSchool" width="73" height="13" />
              </div>
            </div>

            <h2 className={styles.heading}>
              Closed-Loop Learning Platform for Schools
            </h2>
          </div>

          {/* ── Circle + values ──────────────────────────── */}
          <div className={styles.circleArea}>
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
                r="174.6"
                stroke={circleProgress >= 1 ? '#9582FF' : 'url(#grayGrad)'}
                strokeWidth="3"
                style={{
                  transition: 'stroke 0.6s ease',
                  filter: circleProgress >= 1 ? 'drop-shadow(0 0 8px rgba(149,130,255,0.4))' : 'none',
                }}
              />
            </svg>

            {VALUES.map((v, i) => {
              const isSeen = i < activeStep;
              const isActive = i === activeStep - 1 && activeStep <= VALUES.length;
              const isVisible = isSeen || showCTA;

              return (
                <div key={v.name}>
                  <div
                    className={`${styles.numCircle} ${isVisible ? styles.numCircleActive : ''}`}
                    style={{ left: v.dot[0], top: v.dot[1] }}
                  >
                    {i + 1}
                  </div>
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

            {/* Center content: number + description or CTA */}
            <div className={styles.centerContent}>
              {!showCTA && activeStep > 0 && activeStep <= VALUES.length && (
                <p key={`desc-${activeStep}`} className={styles.description}>
                  {VALUES[activeStep - 1].desc}
                </p>
              )}
              {showCTA && (
                <button className={styles.ctaBtn} type="button">
                  Try SchoolAi
                </button>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
