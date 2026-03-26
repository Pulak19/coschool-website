import { useRef, useEffect, useState, useCallback } from 'react';
import styles from './CardsStack.module.css';

/* ── Assets ──────────────────────────────────────────────── */
const CARD_ICON = '/assets/59a8d6a60c4831bea3dd7b6863a0a5692f178ab1.svg';
const VERT_LINE = '/assets/3a05e52d8b662a9c3c4b10e96eaceb33167358be.svg';

const CARDS = [
  {
    id: 'card-1',
    title: 'Curriculum-Aligned & Safe',
    bullets: ['Guardrails protect students', 'Parents trust the system'],
  },
  {
    id: 'card-2',
    title: 'Teacher Remains in Control',
    bullets: ['Assigns and unlocks content', 'AI assists — never replaces'],
  },
  {
    id: 'card-3',
    title: 'No Cost to School',
    bullets: ['Parents pay for usage', 'Risk-free decision'],
  },
  {
    id: 'card-4',
    title: 'Real-Time Learning Signals',
    bullets: ['Gaps surface immediately', 'Interventions happen on time'],
  },
  {
    id: 'card-5',
    title: 'Complete Visibility',
    bullets: ['Data drives teaching decisions', 'Leadership governs with insight'],
  },
];

/* ── Main component ──────────────────────────────────────── */
export default function CardsStack() {
  const sectionRef = useRef(null);
  const rafRef     = useRef(null);
  const [rawProgress, setRawProgress] = useState(0);

  const onScroll = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const section = sectionRef.current;
      if (!section) return;
      const rect    = section.getBoundingClientRect();
      const scrolled = -rect.top;
      const total    = rect.height - window.innerHeight;
      if (total <= 0) return;
      setRawProgress(Math.max(0, Math.min(1, scrolled / total)));
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

  // Card 1 visible immediately; cards 2–5 animate in via scroll
  const cardProgress = 1 + rawProgress * (CARDS.length - 1);
  const activeIdx = Math.min(Math.floor(cardProgress), CARDS.length) - 1;

  return (
    <section
      ref={sectionRef}
      id="what-it-unlocks"
      className={styles.section}
      aria-label="What CoSchool unlocks for your school"
    >
      <div className={styles.sticky}>
        <div className={styles.orbTL} aria-hidden="true" />

        {/* ── Header ─────────────────────────────────────── */}
        <div className={styles.header}>
          <h2 className={styles.heading}>
            What this unlocks for your school
          </h2>
          <div className={styles.vertLine} aria-hidden="true">
            <img src={VERT_LINE} alt="" width="1" loading="lazy" />
          </div>
        </div>

        {/* ── Card stack ─────────────────────────────────── */}
        <div className={styles.cardStack} aria-live="polite">
          {CARDS.map((card, i) => {
            const progress = Math.max(0, Math.min(1, cardProgress - i));
            const behind   = Math.max(0, activeIdx - i);

            let transform;
            let opacity;

            if (progress <= 0) {
              // Hidden below
              transform = 'translateY(120%)';
              opacity = 0;
            } else if (progress < 1) {
              // Sliding in from below
              const slideY = (1 - progress) * 100;
              transform = `translateY(${slideY}%)`;
              opacity = Math.min(1, progress * 2);
            } else {
              // Fully in — recede as newer cards stack on top
              const recession = Math.min(behind, 4);
              const scale  = 1 - recession * 0.03;
              const yShift = -recession * 10;
              transform = `translateY(${yShift}px) scale(${scale})`;
              opacity = 1;
            }

            return (
              <article
                key={card.id}
                className={styles.card}
                style={{
                  transform,
                  opacity,
                  zIndex: i + 1,
                }}
              >
                <div className={styles.cardIcon} aria-hidden="true">
                  <img src={CARD_ICON} alt="" width="97" height="97" loading="lazy" />
                </div>
                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>{card.title}</h3>
                  <ul className={styles.cardBullets}>
                    {card.bullets.map((b) => (
                      <li key={b} className={styles.cardBullet}>{b}</li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
