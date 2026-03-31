import { useEffect, useRef } from 'react';
import styles from './CardsStack.module.css';

/* ── Assets ──────────────────────────────────────────────── */
const CONNECTOR = '/assets/unlock-connector.svg';

const CARDS = [
  {
    id: 'students',
    title: 'Students',
    titleColor: '#62a135',
    body: "Gaps closes before they compound. AI guidance, right when they're stuck. Not days later.",
    icon: '/assets/unlock-icon-students.svg',
    iconSize: 97,
    borderColor: '#dbe6da',
    shadow: 'rgba(110, 188, 57, 0.1)',
    gradient: 'linear-gradient(102deg, #fff 6%, #edf3ea 100%)',
    floatie: '/assets/avatar-student.png',
    floatieType: 'photo',
    floatieBorder: '#8cd35a',
    floatiePos: { left: -18, top: 23 },
    column: 'left',
  },
  {
    id: 'teachers',
    title: 'Teachers',
    titleColor: '#c44a4a',
    body: "Less correction. More teaching. Walk in knowing exactly who understood and who didn't.",
    icon: '/assets/unlock-icon-teachers.svg',
    iconSize: 83,
    borderColor: '#f9c9c9',
    shadow: 'rgba(196, 74, 74, 0.1)',
    gradient: 'linear-gradient(103deg, #fff 6%, #f8eeee 100%)',
    floatie: '/assets/avatar-teacher.png',
    floatieType: 'photo',
    floatieBorder: '#e27979',
    floatiePos: { right: -16, top: 31 },
    column: 'right',
  },
  {
    id: 'parents',
    title: 'Parents',
    titleColor: '#6554c7',
    body: 'Trust the school, drop the tuition. Specific guidance replaces vague report cards.',
    icon: '/assets/unlock-icon-parents.svg',
    iconSize: 91,
    borderColor: '#cdc8eb',
    shadow: 'rgba(101, 84, 199, 0.1)',
    gradient: 'linear-gradient(104deg, #fff 6%, #f1effc 100%)',
    floatie: '/assets/avatar-parent.png',
    floatieType: 'photo',
    floatieBorder: '#8e7eea',
    floatiePos: { right: -12, top: 69 },
    column: 'left',
  },
  {
    id: 'school',
    title: 'School',
    titleColor: '#2e2f2d',
    body: 'Outcomes you can point to. When marks improve, the school gets the credit. Traceably.',
    icon: '/assets/unlock-icon-school.svg',
    iconSize: 86,
    borderColor: '#cdcdcd',
    shadow: 'rgba(33, 33, 33, 0.1)',
    gradient: 'linear-gradient(103deg, #fff 6%, #e1e1e1 100%)',
    floatie: '/assets/unlock-school-floatie.svg',
    floatieType: 'icon',
    floatieBorder: '#cec6fb',
    floatiePos: { right: -12, top: 22 },
    column: 'right',
  },
];

/* ── Scroll reveal hook ──────────────────────────────────── */
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

/* ── Single card ─────────────────────────────────────────── */
function UnlockCard({ card, delay }) {
  const ref = useReveal(0.2);

  const floatieStyle = {
    borderColor: card.floatieBorder,
    ...(card.floatiePos.left != null ? { left: card.floatiePos.left } : {}),
    ...(card.floatiePos.right != null ? { right: card.floatiePos.right } : {}),
    top: card.floatiePos.top,
  };

  return (
    <article
      ref={ref}
      className={`${styles.card} ${card.column === 'right' ? styles.cardRight : styles.cardLeft}`}
      style={{
        '--delay': `${delay}s`,
        border: `1px solid ${card.borderColor}`,
        boxShadow: `0px 20px 30px 0px ${card.shadow}`,
        background: card.gradient,
      }}
    >
      {/* Icon */}
      <div className={styles.cardIcon}>
        <img
          src={card.icon}
          alt=""
          width={card.iconSize}
          height={card.iconSize}
          loading="lazy"
          aria-hidden="true"
        />
      </div>

      {/* Text */}
      <div className={styles.cardText}>
        <h3 className={styles.cardTitle} style={{ color: card.titleColor }}>
          {card.title}
        </h3>
        <p className={styles.cardBody}>{card.body}</p>
      </div>

      {/* Floatie */}
      <div
        className={`${styles.floatie} ${card.floatieType === 'icon' ? styles.floatieIcon : ''}`}
        style={floatieStyle}
      >
        <img
          src={card.floatie}
          alt=""
          className={styles.floatieImg}
          aria-hidden="true"
        />
      </div>
    </article>
  );
}

/* ── Main component ──────────────────────────────────────── */
export default function CardsStack() {
  const headerRef = useReveal(0.2);

  return (
    <section
      id="what-it-unlocks"
      className={styles.section}
      aria-label="What CoSchool unlocks for your school"
    >
      {/* Background blobs */}
      <div className={styles.orbTL} aria-hidden="true" />
      <div className={styles.orbBR} aria-hidden="true" />
      <div className={styles.orbBL} aria-hidden="true" />

      {/* Header */}
      <div ref={headerRef} className={styles.header}>
        <h2 className={styles.heading}>
          What this unlocks for your school
        </h2>
        <div className={styles.connectorLine} aria-hidden="true">
          <img src={CONNECTOR} alt="" width="1" loading="lazy" />
        </div>
      </div>

      {/* Cards grid */}
      <div className={styles.cardsGrid}>
        {CARDS.map((card, i) => (
          <UnlockCard key={card.id} card={card} delay={i * 0.2} />
        ))}
      </div>
    </section>
  );
}
