import { useRef, useEffect, useState, useCallback } from 'react';
import styles from './LoopSequence.module.css';

/* ── State data (circle states 2a–2f) ───────────────────── */
const STATES = [
  {
    id: '2a', step: 1,
    illustration: '/assets/9050e2157c849d89645f31f9d325bf01921d8ae9.svg',
    caption: 'Teaching happens with fixed lesson plan',
  },
  {
    id: '2b', step: 2,
    illustration: '/assets/75ce0ef92d8cd66be6e0d54ac6a9248d395780ad.svg',
    caption: 'Students practice with learning gaps with no help',
  },
  {
    id: '2c', step: 3,
    illustration: '/assets/1638cea70f7245bf4a385a2cb9623426745e033c.svg',
    caption: "Teachers can't intervene timely and parents can't help",
  },
  {
    id: '2d', step: 4,
    illustration: '/assets/77a6a69cfda4e64f8814a57bf7e6a826d4a4bc26.svg',
    caption: 'Feedback arrives late and students move ahead with unresolved gaps',
  },
  {
    id: '2e', step: 5,
    illustration: '/assets/cb312fcd6cea6c5b072ca7ff1efba493dc8e0fa1.svg',
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
const CIRC = 2 * Math.PI * R;

const CIRCLE_PATH = [
  `M ${CX - R} ${CY}`,
  `A ${R} ${R} 0 1 0 ${CX + R} ${CY}`,
  `A ${R} ${R} 0 0 0 ${CX - R} ${CY}`,
].join(' ');

const NODE_DATA = [
  { step: 1, cx: 32,    cy: 200.0, arcFrac: 0      },
  { step: 2, cx: 149.1, cy: 360.1, arcFrac: 0.2008 },
  { step: 3, cx: 329.2, cy: 307.4, arcFrac: 0.3897 },
  { step: 4, cx: 346.8, cy: 118.5, arcFrac: 0.5808 },
  { step: 5, cx: 144.4, cy: 41.4,  arcFrac: 0.8036 },
];

/* ── Broken icon ─────────────────────────────────────────── */
function BrokenIcon({ spread }) {
  const s = spread;
  return (
    <svg
      viewBox="0 0 44.8594 44"
      width="45"
      height="44"
      fill="none"
      aria-hidden="true"
      className={styles.headerIcon}
      style={{ overflow: 'visible' }}
    >
      {/* Bottom-left main fragment → moves down-left */}
      <path
        className={styles.iconFragment}
        transform={`translate(${-s * 0.6}, ${s * 0.45})`}
        d="M11.9439 17.7931L14.2148 20.0487C14.7589 20.5876 15.3273 21.1179 15.8478 21.6772C14.2825 23.213 12.7266 24.7584 11.18 26.3131C10.022 27.4745 8.88826 28.6309 7.75165 29.821C6.72504 30.8492 5.87198 32.5616 5.93755 34.0411C6.07991 36.3347 7.85039 38.3235 10.1753 38.4919C12.7303 38.677 14.2094 37.1305 15.8854 35.4935L18.6588 32.7439C19.9345 31.4728 21.6645 29.8464 22.8259 28.5566C23.0852 28.9375 26.3893 32.2941 26.7551 32.5362C26.1526 33.0911 25.3727 33.921 24.7714 34.5197L20.0376 39.2285C16.2223 42.9754 8.42971 46.9999 2.06079 39.5121C0.47942 37.1754 0.0956146 34.4282 0.62306 31.689C0.903341 30.2372 1.48198 28.8596 2.32236 27.6431C3.04724 26.5816 4.2841 25.3878 5.20523 24.4536L9.27412 20.3671L10.8264 18.8207C11.1824 18.4665 11.5327 18.0714 11.9439 17.7931Z"
        fill="#FE0000"
      />
      {/* Top-right main fragment → moves up-right */}
      <path
        className={styles.iconFragment}
        transform={`translate(${s * 0.6}, ${-s * 0.45})`}
        d="M32.4917 0H36.3019C36.4633 0.116857 37.3909 0.28807 37.6683 0.386775C39.0494 0.878118 40.3739 1.65354 41.4352 2.65598C43.3722 4.49011 44.5096 7.01289 44.6016 9.67897C44.669 12.1558 43.8763 14.6661 42.4023 16.6561C41.7313 17.5621 40.7865 18.4455 40.0012 19.2634C37.7297 21.6294 35.322 23.8806 33.0672 26.2607C32.0329 25.0116 30.3172 23.5455 29.1745 22.3012C29.1971 22.1375 34.2434 17.1973 34.7208 16.6698C36.4912 14.7132 38.9443 13.1587 39.0186 10.1591C39.0478 8.98034 38.5231 7.67585 37.7175 6.84303C36.873 5.97313 35.7156 5.47723 34.5033 5.46588C31.6537 5.42923 29.9543 7.60727 28.0944 9.44217L22.1987 15.311C21.8273 15.0536 21.2056 14.3487 20.8552 13.993C19.9985 13.1276 19.1373 12.2668 18.2716 11.4106C19.269 10.2679 20.9452 8.70113 22.0417 7.60607L25.0702 4.59233C26.1545 3.52166 27.3737 2.25735 28.6722 1.4727C29.4555 1.01962 30.294 0.660331 31.1404 0.344502C31.4727 0.220512 32.2334 0.162726 32.4917 0Z"
        fill="#FE0000"
      />
      {/* Top-left corner fragment → moves far up-left */}
      <path
        className={styles.iconFragment}
        transform={`translate(${-s * 1.2}, ${-s * 1.2})`}
        d="M0 0H3.67665H4.38432C5.73401 2.02896 7.1928 4.01615 8.56118 6.03367C8.94816 6.60425 10.0356 8.05527 10.2985 8.59298C9.95079 9.01128 9.53777 9.4307 9.14577 9.81041C8.56457 9.53979 7.9469 9.01381 7.39376 8.63938C5.78286 7.53281 4.18012 6.41446 2.58564 5.28434C1.92669 4.82208 0.66929 3.89389 0 3.55415V3.53758V0Z"
        fill="#FE0000"
      />
      {/* Bottom-right corner fragment → moves far down-right */}
      <path
        className={styles.iconFragment}
        transform={`translate(${s * 1.2}, ${s * 1.2})`}
        d="M44.2281 43.8103L40.5515 43.8103L39.8438 43.8103C38.4941 41.7813 37.0354 39.7942 35.667 37.7766C35.28 37.206 34.1925 35.755 33.9297 35.2173C34.2774 34.799 34.6904 34.3796 35.0824 33.9999C35.6636 34.2705 36.2813 34.7965 36.8344 35.1709C38.4453 36.2775 40.048 37.3958 41.6425 38.526C42.3015 38.9882 43.5589 39.9164 44.2281 40.2562L44.2281 40.2727L44.2281 43.8103Z"
        fill="#FE0000"
      />
    </svg>
  );
}

/* ── LoopCircle SVG ──────────────────────────────────────── */
function LoopCircle({ arcProgress }) {
  const dashOffset = CIRC * (1 - arcProgress);

  return (
    <svg
      viewBox="0 0 400 400"
      className={styles.svg}
      aria-hidden="true"
    >
      <circle
        cx={CX} cy={CY} r={R}
        fill="none"
        stroke="rgba(180,195,175,0.45)"
        strokeWidth="1.5"
      />
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
      {NODE_DATA.map((node) => {
        const isRed = arcProgress >= node.arcFrac;
        return (
          <g key={node.step}>
            <circle
              cx={node.cx} cy={node.cy} r={10}
              fill="rgba(224,48,48,0.18)"
              stroke="none"
              style={{ opacity: isRed ? 1 : 0, transition: 'opacity 0.4s ease' }}
            />
            <circle
              cx={node.cx} cy={node.cy} r={7.8}
              fill="#fff"
              stroke={isRed ? '#E03030' : 'rgba(160,185,155,0.7)'}
              strokeWidth={isRed ? 2.5 : 1.5}
              style={{ transition: 'stroke 0.4s ease' }}
            />
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

  // introProgress: 0→1 during the first 1/7 of total scroll
  const introProgress = Math.min(1, rawProgress * 7);

  // circleStateIdx: which STATES entry to show (0–5 → 2a–2f)
  const circleStateIdx = Math.max(0, stateIdx - 1);
  const isFinal = stateIdx === 6;

  // Arc grows across circle states 1–5 (1/7 → 6/7 of total scroll)
  const arcProgress = isFinal ? 1 : Math.max(0, Math.min(1, (rawProgress * 7 - 1) / 5));

  // Icon spread increases from 0 as user scrolls
  const iconSpread = rawProgress * 9;

  // Intro title: fades out + slides up as introProgress → 1
  const titleOpacity    = Math.max(0, 1 - introProgress * 2);
  const titleTranslateY = -introProgress * 50;

  // Circle layer: fades in + slides up from below as introProgress → 1
  const circleOpacity    = Math.max(0, (introProgress - 0.3) / 0.7);
  const circleTranslateY = Math.max(0, (1 - introProgress) * 40);

  const onScroll = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const section = sectionRef.current;
      if (!section) return;

      const rect     = section.getBoundingClientRect();
      const scrolled = -rect.top;
      const total    = rect.height - window.innerHeight;
      if (total <= 0) return;

      const raw = Math.max(0, Math.min(1, scrolled / total));
      // 7 states: 0=intro, 1–5=2a–2e, 6=2f
      const idx = Math.min(6, Math.floor(raw * 7));

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

  const current = STATES[circleStateIdx];

  return (
    <section
      ref={sectionRef}
      id="loop-section"
      className={styles.section}
      data-state={stateIdx === 0 ? 'intro' : current.id}
      aria-label="The broken flow in today's education system"
    >
      <div className={styles.sticky}>

        <div className={styles.orbTR} aria-hidden="true" />
        <div className={styles.orbBL} aria-hidden="true" />

        {/* ── Icon — always at top, same position across all states ── */}
        <div className={styles.iconWrap} aria-hidden="true">
          <BrokenIcon spread={iconSpread} />
        </div>

        {/* ── Intro layer: title only, fades out + slides up ────── */}
        <div
          className={styles.introLayer}
          style={{
            opacity: titleOpacity,
            transform: `translateY(${titleTranslateY}px)`,
            pointerEvents: titleOpacity < 0.05 ? 'none' : 'auto',
          }}
        >
          <h2 className={styles.introTitle}>
            The broken flow in today's education system
          </h2>
        </div>

        {/* ── Circle layer: fades in + slides up from below ─────── */}
        <div
          className={styles.circleLayer}
          style={{
            opacity: circleOpacity,
            transform: `translateY(${circleTranslateY}px)`,
            pointerEvents: circleOpacity < 0.05 ? 'none' : 'auto',
          }}
          aria-live="polite"
          aria-atomic="true"
        >
          <div className={styles.circleArea}>
            <div className={styles.circleWrap}>
              <LoopCircle arcProgress={arcProgress} />

              {/* Illustrations (2a–2e) */}
              <div className={`${styles.illustrationWrap} ${isFinal ? styles.illustrationWrapHidden : ''}`}>
                {STATES.slice(0, 5).map((s, i) => (
                  <img
                    key={s.id}
                    src={s.illustration}
                    alt={`Illustration for step ${s.step}`}
                    width="168"
                    height="185"
                    loading="lazy"
                    className={`${styles.illustration} ${circleStateIdx === i ? styles.illustrationVisible : ''}`}
                  />
                ))}
              </div>

              {/* Final state center text (2f) */}
              <div className={`${styles.finalCenter} ${isFinal ? styles.finalCenterVisible : ''}`}>
                <p className={styles.finalText}>.and the broken loop continues</p>
              </div>

              {/* Step number — positioned inside circle, below illustration */}
              <div
                className={`${styles.stepRow} ${isFinal ? styles.stepRowHidden : ''}`}
                aria-hidden="true"
              >
                {STATES.slice(0, 5).map((s, i) => (
                  <span
                    key={s.id}
                    className={`${styles.stepNumber} ${circleStateIdx === i ? styles.stepNumberVisible : ''}`}
                  >
                    {s.step}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Caption (2a–2e) */}
          <div className={`${styles.captionWrap} ${isFinal ? styles.captionWrapHidden : ''}`}>
            {STATES.slice(0, 5).map((s, i) => (
              <p
                key={s.id}
                className={`${styles.caption} ${circleStateIdx === i ? styles.captionVisible : ''}`}
              >
                {s.caption}
              </p>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
