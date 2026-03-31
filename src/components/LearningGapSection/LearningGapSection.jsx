import { useEffect, useRef } from 'react';
import styles from './LearningGapSection.module.css';

const CHEVRON = '/assets/chevron-red.svg';

/* ── Step data — each with its own illustration ──────────── */
const STEPS = [
  {
    title: 'Fixed Lesson Plan',
    body: 'One-size teaching, no personalisation',
    img: '/assets/illus-step-1.png',
    imageLeft: true,
  },
  {
    title: 'Hidden Learning Gaps',
    body: 'Students practise without detection',
    img: '/assets/illus-step-2.png',
    imageLeft: false,
  },
  {
    title: 'Generic Feedback',
    body: 'Arrives too late, not actionable',
    img: '/assets/illus-step-3.png',
    imageLeft: true,
  },
  {
    title: 'No timely intervention',
    body: 'Teacher sees too late',
    img: '/assets/illus-step-4.png',
    imageLeft: false,
  },
  {
    title: "Parents can't help",
    body: 'No useful guidance from school',
    img: '/assets/illus-step-5.png',
    imageLeft: true,
  },
  {
    title: 'Gaps Carry forward',
    body: 'Students move ahead with weak foundation',
    img: '/assets/illus-step-2.png',
    imageLeft: false,
  },
  {
    title: 'Leadership flying blind',
    body: 'Decision without any learning visibility',
    img: '/assets/illus-step-3.png',
    imageLeft: true,
  },
];

/* ── Scroll reveal hook ──────────────────────────────────── */
function useReveal(threshold = 0.25) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add(styles.visible);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return ref;
}

/* ── Step row ─────────────────────────────────────────────── */
function StepRow({ step }) {
  const ref = useReveal(0.2);

  const illustration = (
    <div className={styles.illustrationWrap}>
      <img
        src={step.img}
        alt=""
        className={styles.illustrationImg}
        loading="lazy"
        aria-hidden="true"
      />
    </div>
  );

  const text = (
    <div className={`${styles.stepText} ${!step.imageLeft ? styles.stepTextRight : ''}`}>
      <h3 className={styles.stepTitle}>{step.title}</h3>
      <p className={styles.stepBody}>{step.body}</p>
    </div>
  );

  return (
    <div ref={ref} className={styles.stepRow}>
      {step.imageLeft ? <>{illustration}{text}</> : <>{text}{illustration}</>}
    </div>
  );
}

/* ── Chevron separator ───────────────────────────────────── */
function ChevronSep() {
  const ref = useReveal(0.5);
  return (
    <div ref={ref} className={styles.chevronWrap}>
      <img src={CHEVRON} alt="" className={styles.chevron} width="28" height="28" aria-hidden="true" />
    </div>
  );
}

/* ── Main component ──────────────────────────────────────── */
export default function LearningGapSection() {
  const headerRef = useReveal(0.2);

  return (
    <section className={styles.section} aria-label="Understanding the Learning Gap">
      <div className={styles.frame}>
        {/* Header */}
        <div ref={headerRef} className={styles.header}>
          <h2 className={styles.heading}>Understanding the Learning Gap</h2>
          <p className={styles.subheading}>
            A broken flow in today's education system.<br />
            Learning gaps doesn't appear suddenly.<br />
            They compound silently.
          </p>
        </div>

        {/* Steps flow */}
        <div className={styles.stepsFlow}>
          {STEPS.map((step, i) => (
            <div key={i}>
              <StepRow step={step} />
              {i < STEPS.length - 1 && <ChevronSep />}
            </div>
          ))}
        </div>

        {/* Closing */}
        <p className={styles.closing}>And the cycle repeats</p>
      </div>
    </section>
  );
}
