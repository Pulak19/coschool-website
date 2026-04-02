import { useEffect, useRef } from 'react';
import styles from './DisconnectedSteps.module.css';

const CHEVRON = '/assets/chevron-red.svg';

/* ── Step data — each with its own illustration ──────────── */
const STEPS = [
  {
    title: 'Fixed Lesson Plan',
    body: 'One-size fits all',
    img: '/assets/illus-step-1-new.png',
    imageLeft: true,
  },
  {
    title: 'Student practice without support',
    body: 'Gaps go unnoticed',
    img: '/assets/illus-step-2-new.png',
    imageLeft: false,
  },
  {
    title: 'Teacher corrects homework',
    body: 'No actionable feedback',
    img: '/assets/illus-step-3-new.png',
    imageLeft: true,
  },
  {
    title: 'feedback arrives late',
    body: 'Class already moved on',
    img: '/assets/illus-step-4-new.png',
    imageLeft: false,
  },
  {
    title: 'No real-time visibility',
    body: "Teachers and Parents can't intervene",
    img: '/assets/illus-step-5-new.png',
    imageLeft: true,
  },
  {
    title: 'Leaders lack system-wide visibility',
    body: "Decisions don't drive change",
    img: '/assets/illus-step-6-new.png',
    imageLeft: false,
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
export default function DisconnectedSteps() {
  const headerRef = useReveal(0.2);

  return (
    <section className={styles.section} aria-label="Disconnected Steps">
      <div className={styles.frame}>
        {/* Header */}
        <div ref={headerRef} className={styles.header}>
          <h2 className={styles.heading}>Disconnected steps</h2>
          <p className={styles.subheading}>
            Preventing your school to become future-ready
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

        {/* Closing chevron + text */}
        <ChevronSep />
        <p className={styles.closing}>...and the loop continues</p>
      </div>
    </section>
  );
}
