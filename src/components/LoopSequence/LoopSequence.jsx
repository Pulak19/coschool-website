import { useRef, useEffect, useState, useCallback } from 'react';
import styles from './LoopSequence.module.css';

/* ── Assets ──────────────────────────────────────────────── */
const BROKEN_ICON = 'http://localhost:3845/assets/a685246c558f29ba34e4f4e5fa4fabb204ffe31b.svg';

/* ── State data ──────────────────────────────────────────── */
const STATES = [
  {
    id: '2a', step: 1,
    illustration: 'http://localhost:3845/assets/9050e2157c849d89645f31f9d325bf01921d8ae9.svg',
    caption: 'Teaching happens with fixed lesson plan',
  },
  {
    id: '2b', step: 2,
    illustration: 'http://localhost:3845/assets/75ce0ef92d8cd66be6e0d54ac6a9248d395780ad.svg',
    caption: 'Students practice with learning gaps with no help',
  },
  {
    id: '2c', step: 3,
    illustration: 'http://localhost:3845/assets/1638cea70f7245bf4a385a2cb9623426745e033c.svg',
    caption: "Teachers can't intervene timely and parents can't help",
  },
  {
    id: '2d', step: 4,
    illustration: 'http://localhost:3845/assets/77a6a69cfda4e64f8814a57bf7e6a826d4a4bc26.svg',
    caption: 'Feedback arrives late and students move ahead with unresolved gaps',
  },
  {
    id: '2e', step: 5,
    illustration: 'http://localhost:3845/assets/cb312fcd6cea6c5b072ca7ff1efba493dc8e0fa1.svg',
    caption: 'Leaders decide without learning visibility',
  },
  {
    id: '2f', step: null,
    illustration: null,
    caption: null,
  },
];

/* ── Circle geometry (SVG viewBox 0 0 400 400) ───────────── */
const R    = 168;
const CX   = 200;
const CY   = 200;
const CIRC = 2 * Math.PI * R; // ≈ 1055.6

/*
 * Arc path: starts at 9 o'clock (left, 180°) and draws the full
 * circle going counterclockwise on screen (9→6→3→12→9).
 * sweep=0 = counterclockwise in SVG (matches visual CCW on screen).
 * Two half-arcs because a single arc cannot span the full circle.
 */
const CIRCLE_PATH = [
  `M ${CX - R} ${CY}`,                           // Start: 9 o'clock
  `A ${R} ${R} 0 1 0 ${CX + R} ${CY}`,           // Half CCW (through bottom)
  `A ${R} ${R} 0 0 0 ${CX - R} ${CY}`,           // Half CCW (through top) back to start
].join(' ');

/*
 * Node positions + arc-fraction at which they are "reached"
 * as the red streak grows counterclockwise from 9 o'clock.
 *
 * Angles in SVG coords (0°=right, clockwise positive):
 *   Node 1: 180°  → arc frac 0
 *   Node 2: 107.7° → 72.3° counterclockwise → frac 72.3/360 = 0.2008
 *   Node 3: 39.7°  → 140.3° CCW            → frac 0.3897
 *   Node 4: 330.9° → 209.1° CCW            → frac 0.5808
 *   Node 5: 250.7° → 289.3° CCW            → frac 0.8036
 */
const NODE_DATA = [
  { step: 1, cx: 32,    cy: 200.0, arcFrac: 0      },
  { step: 2, cx: 149.1, cy: 360.1, arcFrac: 0.2008 },
  { step: 3, cx: 329.2, cy: 307.4, arcFrac: 0.3897 },
  { step: 4, cx: 346.8, cy: 118.5, arcFrac: 0.5808 },
  { step: 5, cx: 144.4, cy: 41.4,  arcFrac: 0.8036 },
];

/* ── LoopCircle SVG ──────────────────────────────────────── */
function LoopCircle({ arcProgress }) {
  const dashOffset = CIRC * (1 - arcProgress);

  return (
    <svg
      viewBox="0 0 400 400"
      className={styles.svg}
      aria-hidden="true"
    >
      {/* Base ring (light gray) */}
      <circle
        cx={CX} cy={CY} r={R}
        fill="none"
        stroke="rgba(180,195,175,0.45)"
        strokeWidth="1.5"
      />

      {/* Growing red arc (counterclockwise from 9 o'clock) */}
      <path
        d={CIRCLE_PATH}
        fill="none"
        stroke="#E03030"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray={CIRC}
        strokeDashoffset={dashOffset}
        className={styles.arcStroke}
      />

      {/* Node dots */}
      {NODE_DATA.map((node) => {
        const isRed = arcProgress >= node.arcFrac;
        return (
          <g key={node.step}>
            {/* Outer glow ring when red */}
            <circle
              cx={node.cx} cy={node.cy} r={10}
              fill="rgba(224,48,48,0.18)"
              stroke="none"
              style={{ opacity: isRed ? 1 : 0, transition: 'opacity 0.4s ease' }}
            />
            {/* Inner dot */}
            <circle
              cx={node.cx} cy={node.cy} r={7.8}
              fill="#fff"
              stroke={isRed ? '#E03030' : 'rgba(160,185,155,0.7)'}
              strokeWidth={isRed ? 2.5 : 1.5}
              style={{ transition: 'stroke 0.4s ease' }}
            />
            {/* Centre fill dot when red */}
            <circle
              cx={node.cx} cy={node.cy} r={4}
              fill="#E03030"
              style={{ opacity: isRed ? 1 : 0, transition: 'opacity 0.4s ease' }}
            />
          </g>
        );
      })}
    </svg>
  );
}

/* ── Main component ──────────────────────────────────────── */
export default function LoopSequence() {
  const sectionRef  = useRef(null);
  const rafRef      = useRef(null);
  const [stateIdx,    setStateIdx]    = useState(0);
  const [rawProgress, setRawProgress] = useState(0);

  const isFinal    = stateIdx === 5;
  // arcProgress goes 0→1 as user scrolls through states 0–4.
  // States 0-4 span 5/6 of total scroll; multiply by 6/5 to normalise to [0,1].
  const arcProgress = isFinal ? 1 : Math.min(1, rawProgress * (6 / 5));

  /* ── Scroll handler ─────────────────────────────────────── */
  const onScroll = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const section = sectionRef.current;
      if (!section) return;

      const rect    = section.getBoundingClientRect();
      const scrolled = -rect.top;
      const total    = rect.height - window.innerHeight;
      if (total <= 0) return;

      const raw = Math.max(0, Math.min(1, scrolled / total));
      const idx = Math.min(5, Math.floor(raw * 6));

      setRawProgress(raw);
      setStateIdx(idx);
    });
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [onScroll]);

  const current = STATES[stateIdx];

  return (
    <section
      ref={sectionRef}
      id="loop-section"
      className={styles.section}
      data-state={current.id}
      aria-label="The broken flow in today's education system"
    >
      {/* ── Sticky viewport ──────────────────────────────── */}
      <div className={styles.sticky}>

        {/* Background orbs */}
        <div className={styles.orbTR} aria-hidden="true" />
        <div className={styles.orbBL} aria-hidden="true" />

        {/* ── Header (persistent, fixed height) ───────────── */}
        <header className={styles.header}>
          <img src={BROKEN_ICON} alt="" width="45" height="44" className={styles.headerIcon} />
          <h2 className={styles.title}>
            The broken flow in today's education system
          </h2>
        </header>

        {/* ── Circle + illustration + number ──────────────── */}
        {/*
          circleArea is flex:1 and always the same structure —
          no elements mount or unmount here, so no layout reflow.
        */}
        <div className={styles.circleArea} aria-live="polite" aria-atomic="true">

          {/* SVG circle — always rendered */}
          <div className={styles.circleWrap}>
            <LoopCircle arcProgress={arcProgress} />

            {/* Illustrations (2a–2e) — always in DOM, opacity-toggled */}
            <div className={`${styles.illustrationWrap} ${isFinal ? styles.illustrationWrapHidden : ''}`}>
              {STATES.slice(0, 5).map((s, i) => (
                <img
                  key={s.id}
                  src={s.illustration}
                  alt={`Illustration for step ${s.step}`}
                  width="168"
                  height="185"
                  loading="lazy"
                  className={`${styles.illustration} ${stateIdx === i ? styles.illustrationVisible : ''}`}
                />
              ))}
            </div>

            {/* Final state center text (2f) — always in DOM, opacity-toggled */}
            <div className={`${styles.finalCenter} ${isFinal ? styles.finalCenterVisible : ''}`}>
              <p className={styles.finalText}>.and the broken loop continues</p>
            </div>
          </div>

          {/* Step number (2a–2e) — always rendered, fades out in 2f */}
          <div
            className={`${styles.stepRow} ${isFinal ? styles.stepRowHidden : ''}`}
            aria-hidden="true"
          >
            {STATES.slice(0, 5).map((s, i) => (
              <span
                key={s.id}
                className={`${styles.stepNumber} ${stateIdx === i ? styles.stepNumberVisible : ''}`}
              >
                {s.step}
              </span>
            ))}
          </div>
        </div>

        {/* ── Caption (2a–2e) — always rendered, fades out in 2f ── */}
        <div className={`${styles.captionWrap} ${isFinal ? styles.captionWrapHidden : ''}`}>
          {STATES.slice(0, 5).map((s, i) => (
            <p
              key={s.id}
              className={`${styles.caption} ${stateIdx === i ? styles.captionVisible : ''}`}
            >
              {s.caption}
            </p>
          ))}
        </div>

        {/* ── Progress dots (mobile) ───────────────────────── */}
        <div className={styles.progressDots} aria-hidden="true">
          {STATES.map((s, i) => (
            <span
              key={s.id}
              className={`${styles.dot} ${stateIdx === i ? styles.dotActive : ''}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
