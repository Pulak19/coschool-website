import { useRef, useEffect, useCallback } from 'react';
import styles from './CardsStack.module.css';

/* ── Asset ───────────────────────────────────────────────── */
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

export default function CardsStack() {
  const containerRef  = useRef(null);
  const scrollRef     = useRef(null);
  const headerRef     = useRef(null);
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Fade-in header on scroll ────────────────────────── */
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('visible'); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* ── Mouse-wheel → horizontal scroll ────────────────── */
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onWheel = (e) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      const atLeft  = el.scrollLeft === 0;
      const atRight = el.scrollLeft + el.clientWidth >= el.scrollWidth - 2;
      if ((e.deltaY < 0 && atLeft) || (e.deltaY > 0 && atRight)) return;
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  /* ── Arrow scroll ────────────────────────────────────── */
  const scroll = useCallback((dir) => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.querySelector('[data-card]')?.offsetWidth ?? 361;
    el.scrollBy({ left: dir * cardWidth, behavior: prefersReduced ? 'auto' : 'smooth' });
  }, [prefersReduced]);

  return (
    <section
      ref={containerRef}
      id="what-it-unlocks"
      className={styles.section}
      aria-label="What CoSchool unlocks for your school"
    >
      {/* ── Header ───────────────────────────────────────── */}
      <div ref={headerRef} className={`${styles.header} fade-in`}>
        <h2 className={styles.heading}>
          What this unlocks for your school
        </h2>
        <div className={styles.vertLine} aria-hidden="true">
          <img src={VERT_LINE} alt="" width="1" height="147" loading="lazy" />
        </div>
      </div>

      {/* ── Horizontal card scroll ───────────────────────── */}
      <div className={styles.cardsOuter}>
        {/* Prev/Next arrows */}
        <button
          className={`${styles.arrow} ${styles.arrowPrev}`}
          onClick={() => scroll(-1)}
          aria-label="Previous card"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M12 4L6 10L12 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div
          ref={scrollRef}
          className={styles.cardsScroll}
          role="list"
          aria-label="Feature cards"
        >
          {CARDS.map((card, i) => (
            <article
              key={card.id}
              data-card
              className={styles.card}
              role="listitem"
              style={{ animationDelay: `${i * 80}ms` }}
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
          ))}
        </div>

        <button
          className={`${styles.arrow} ${styles.arrowNext}`}
          onClick={() => scroll(1)}
          aria-label="Next card"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M8 4L14 10L8 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </section>
  );
}
