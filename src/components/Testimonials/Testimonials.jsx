import { useEffect, useRef } from 'react';
import styles from './Testimonials.module.css';

const QUOTE_ICON = '/assets/quote-open-green.svg';

const TESTIMONIALS = [
  {
    name: 'Priya Sharma',
    role: 'Parent',
    photo: '',
    quote: 'For the first time, I actually know what my child is struggling with — not after exams, but while it\'s happening. The daily nudges help me support learning at home without guesswork.',
  },
  {
    name: 'Ravi Menon',
    role: 'Teacher',
    photo: '',
    quote: 'I used to spend hours correcting notebooks with no real impact. Now I see exactly where each student is stuck and can act the very next class. It\'s changed how I teach.',
  },
  {
    name: 'Dr. Anita Desai',
    role: 'School Leader',
    photo: '',
    quote: 'We finally have learning evidence — not just exam scores. The dashboards help us make decisions that actually move the needle on student outcomes.',
  },
  {
    name: 'Kavitha Reddy',
    role: 'Parent',
    photo: '',
    quote: 'We were spending a fortune on tuition classes. Since the school adopted this, my daughter\'s confidence has gone up and we\'ve been able to cut back significantly.',
  },
  {
    name: 'Suresh Iyer',
    role: 'Teacher',
    photo: '',
    quote: 'The AI doesn\'t replace me — it amplifies what I do. I walk into class knowing exactly who understood yesterday\'s lesson and who didn\'t. That precision is powerful.',
  },
];

function useReveal(threshold = 0.15) {
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

export default function Testimonials() {
  const headerRef = useReveal(0.2);

  return (
    <section className={styles.section} aria-label="Testimonials">
      {/* Header */}
      <div ref={headerRef} className={styles.header}>
        <h2 className={styles.heading}>Testimonials</h2>
        <div className={styles.connector} aria-hidden="true" />
      </div>

      {/* Horizontal scroll cards */}
      <div className={styles.scrollWrap}>
        <div className={styles.scrollTrack}>
          {TESTIMONIALS.map((t, i) => (
            <article key={i} className={styles.card}>
              {/* Top row: photo + name/role */}
              <div className={styles.cardTop}>
                <div className={styles.photoWrap}>
                  {t.photo ? (
                    <img src={t.photo} alt={t.name} className={styles.photo} />
                  ) : (
                    <span className={styles.photoInitial}>{t.name.charAt(0)}</span>
                  )}
                </div>
                <div className={styles.cardMeta}>
                  <span className={styles.cardName}>{t.name}</span>
                  <span className={styles.cardRole}>{t.role}</span>
                </div>
              </div>

              {/* Quote */}
              <div className={styles.quoteBlock}>
                <img src={QUOTE_ICON} alt="" width="14" height="12" aria-hidden="true" className={styles.quoteIcon} />
                <p className={styles.cardQuote}>{t.quote}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
