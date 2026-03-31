import { useEffect, useRef } from 'react';
import styles from './LearningGapSection.module.css';

/* ── Assets ──────────────────────────────────────────────── */
const ILLUSTRATION = '/assets/learning-gap-illustration.png';
const CHEVRON      = '/assets/chevron-red.svg';

/* ── Step data — alternating layout ──────────────────────── */
const STEPS = [
  {
    title: 'Fixed Lesson Plan',
    body: 'One-size teaching, no personalisation',
    imageOffset: -8,
    imageLeft: true,
  },
  {
    title: 'Hidden Learning Gaps',
    body: 'Students practise without detection',
    imageOffset: -169,
    imageLeft: false,
  },
  {
    title: 'Generic Feedback',
    body: 'Arrives too late, not actionable',
    imageOffset: -300,
    imageLeft: true,
  },
  {
    title: 'No timely intervention',
    body: 'Teacher sees too late',
    imageOffset: -443,
    imageLeft: false,
  },
  {
    title: "Parents can't help",
    body: 'No useful guidance from school',
    imageOffset: -590,
    imageLeft: true,
  },
  {
    title: 'Gaps Carry forward',
    body: 'Students move ahead with weak foundation',
    imageOffset: -169,
    imageLeft: false,
  },
  {
    title: 'Leadership flying blind',
    body: 'Decision without any learning visibility',
    imageOffset: -300,
    imageLeft: true,
  },
];

/* ── Single step row ─────────────────────────────────────── */
function StepRow({ step, index }) {
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
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const illustration = (
    <div className={styles.illustrationWrap}>
      <img
        src={ILLUSTRATION}
        alt=""
        className={styles.illustrationImg}
        style={{ top: step.imageOffset }}
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
    <div
      ref={ref}
      className={styles.stepRow}
      style={{ '--delay': `${index * 0.05}s` }}
    >
      {step.imageLeft ? (
        <>{illustration}{text}</>
      ) : (
        <>{text}{illustration}</>
      )}
    </div>
  );
}

/* ── Chevron separator ───────────────────────────────────── */
function ChevronSep() {
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
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={styles.chevronWrap}>
      <img
        src={CHEVRON}
        alt=""
        className={styles.chevron}
        width="28"
        height="28"
        aria-hidden="true"
      />
    </div>
  );
}

/* ── Main component ──────────────────────────────────────── */
export default function LearningGapSection() {
  const headerRef = useRef(null);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add(styles.visible);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.section} aria-label="Understanding the Learning Gap">
      <div className={styles.frame}>
        {/* Header — same as old Iceberg section */}
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
              <StepRow step={step} index={i} />
              {i < STEPS.length - 1 && <ChevronSep />}
            </div>
          ))}
        </div>

        {/* Closing line */}
        <p className={styles.closing}>And the cycle repeats</p>
      </div>
    </section>
  );
}
