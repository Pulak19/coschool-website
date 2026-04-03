import { useEffect, useRef } from 'react';
import styles from './Testimonials.module.css';

const QUOTE_ICON = '/assets/quote-open-green.svg';

const TESTIMONIALS = [
  {
    name: 'Fr. Bharath Reddy',
    role: 'Principal, STEM School, Guntur',
    photo: '/assets/testimonial-bharat-reddy.png',
    quote: 'After adopting SchoolAi, children are getting support in completing homework, revising concepts, and clearing doubts, helping them go beyond the textbook.',
  },
  {
    name: 'Ms. Manisha Joshi',
    role: 'Principal, Mother Mary\'s School, Delhi',
    photo: '/assets/testimonial-manisha-joshi.png',
    quote: 'Through SchoolAi, our students receive real personalised learning support and doubt clarification 24/7. Something that was not possible before in any means.',
  },
  {
    name: 'Dr. Rupamala Singh',
    role: 'Principal, Hayde Heritage Academy, Uttarakhand',
    photo: '/assets/testimonial-rupamala-singh.png',
    quote: 'Parents at our school now do not worry about extra tuition, as students are getting the support they need from SchoolAi.',
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
