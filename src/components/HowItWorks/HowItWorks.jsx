import { useEffect, useRef } from 'react';
import styles from './HowItWorks.module.css';

/* ── Assets ──────────────────────────────────────────────── */
const SCHOOL_AI_LOGO_LEFT  = '/assets/128bcf7d26282a72f274e095622049314669b70c.svg';
const SCHOOL_AI_LOGO_RIGHT = '/assets/b79886e508077f22b2f4fa5f999983e0684f0ed7.svg';
const BY_COSCHOOL          = '/assets/dceefcdd05c9fb15ba2e9eb40b80b6f74efb34c0.svg';
const CONNECTOR_LINE       = '/assets/8ccc836ba9309b96fdf298c53fd86c9fa0c51020.svg';
const HOW_VERT_LINE        = '/assets/985019123e7f43ca1a182bb846dc6ecf4797d192.svg';
const CHECK_ICON           = '/assets/f23b72ff3341f4cd6ff46415458c6d512adef035.svg';
const ACCENT_MARK          = '/assets/e1817a74f1a3ad3fe2eb77fa22a85cf11227d305.svg';
const IPAD_FRAME           = '/assets/113f6c88d43c35ec11a950e6656f2781a318356c.png';

/* ── Persona icons ───────────────────────────────────────── */
const ICON_STUDENT  = '/assets/icon-student.png';
const ICON_TEACHER  = '/assets/icon-teacher.png';
const ICON_PARENT   = '/assets/icon-parent.png';
const ICON_SCHOOL   = '/assets/icon-school.svg';

/* ── Persona data — first slide shown, totalSlides for dots ── */
const PERSONA_DATA = [
  {
    id: 'student',
    label: 'Students',
    icon: ICON_STUDENT,
    totalSlides: 3,
    feature: 'Teacher Assigns Homework',
    body: 'Set goals, unlocks chapters, maintains complete control — the natural way.',
    screenSrc: '/assets/de0511d6ca4655271fdce0eb2eb0753e8b72f669.png',
  },
  {
    id: 'teacher',
    label: 'Teachers',
    icon: ICON_TEACHER,
    totalSlides: 3,
    feature: 'Learn with Ai',
    body: 'Set goals, unlocks chapters, maintains complete control — the natural way.',
    screenSrc: '/assets/cb1235a3896fed456878160b7b5b29c154f2f94b.png',
  },
  {
    id: 'parent',
    label: 'Parents',
    icon: ICON_PARENT,
    totalSlides: 3,
    feature: 'Teacher Assigns Homework',
    body: 'Set goals, unlocks chapters, maintains complete control — the natural way.',
    screenSrc: '/assets/1c63e34f92b80349e2364f3e551c5057aa1cee4f.png',
  },
  {
    id: 'admin',
    label: 'School Leadership',
    icon: ICON_SCHOOL,
    totalSlides: 3,
    feature: 'Learn with Ai',
    body: 'Set goals, unlocks chapters, maintains complete control — the natural way.',
    screenSrc: '/assets/71cc0798fdcb1e14b3d0fbf37d1137e8a3480bf8.png',
  },
];

const FEATURE_BULLETS = [
  'Learning evidence surfaces early.',
  'Teachers act in time.',
  'Parents reinforce at home.',
];

/* ── Fade-in hook ────────────────────────────────────────── */
function useFadeIn() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible');
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

/* ── iPad mockup ─────────────────────────────────────────── */
function IpadMockup({ src, alt }) {
  return (
    <div className={styles.ipadWrap}>
      <div className={styles.ipadInner}>
        <img
          src={src}
          alt={alt}
          className={styles.ipadScreen}
          loading="lazy"
          width="400"
          height="283"
        />
        <img
          src={IPAD_FRAME}
          alt=""
          className={styles.ipadFrame}
          width="430"
          height="306"
          loading="lazy"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}

/* ── Static persona section ──────────────────────────────── */
function PersonaSection({ persona }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const children = el.querySelectorAll('[data-fade]');
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          children.forEach((child, i) => {
            setTimeout(() => child.classList.add('visible'), i * 80);
          });
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={styles.persona} data-persona={persona.id}>
      {/* Pill badge */}
      <div className="fade-in" data-fade>
        <div className={styles.personaBadge}>
          <div className={styles.badgeIconWrap}>
            <img
              src={persona.icon}
              alt=""
              className={styles.badgeIcon}
              width="35"
              height="35"
              aria-hidden="true"
            />
          </div>
          <span className={styles.badgeLabel}>{persona.label}</span>
        </div>
      </div>

      {/* Pagination dots — static indicator */}
      <div className={styles.dots} data-fade>
        {Array.from({ length: persona.totalSlides }, (_, i) => (
          <span
            key={i}
            className={`${styles.dot} ${i === 0 ? styles.dotActive : ''}`}
          />
        ))}
      </div>

      {/* Text content */}
      <div className={`${styles.personaText} fade-in`} data-fade>
        <img
          src={ACCENT_MARK}
          alt=""
          width="22"
          height="8"
          loading="lazy"
          aria-hidden="true"
        />
        <div className={styles.personaTextContent}>
          <h3 className={styles.personaFeature}>{persona.feature}</h3>
          <p className={styles.personaBody}>{persona.body}</p>
        </div>
      </div>

      {/* iPad mockup */}
      <div className={`${styles.personaMedia} fade-in`} data-fade>
        <IpadMockup
          src={persona.screenSrc}
          alt={`${persona.feature} screen in CoSchool app`}
        />
      </div>
    </div>
  );
}

/* ── Main component ──────────────────────────────────────── */
export default function HowItWorks() {
  const headerRef  = useFadeIn();
  const bulletRef  = useFadeIn();

  return (
    <section id="how-it-works" className={styles.section} aria-label="How CoSchool works">

      {/* ── Gradient frame lines (3-sided ∩ around logo) ──── */}
      <div className={styles.logoFrame} aria-hidden="true">
        <span className={styles.logoFrameRight} />
        <span className={styles.logoFrameShimmerTop} />
        <span className={styles.logoFrameShimmerLeft} />
        <span className={styles.logoFrameShimmerRight} />
      </div>

      {/* ── Section header / intro ────────────────────────── */}
      <div ref={headerRef} className={`${styles.intro} fade-in`}>

        {/* SchoolAI by CoSchool logo */}
        <div className={styles.brandLogo} aria-label="School AI by CoSchool">
          <div className={styles.brandLogoMain}>
            <img
              src={SCHOOL_AI_LOGO_LEFT}
              alt="School AI"
              className={styles.logoLeft}
              width="138"
              loading="eager"
            />
            <img
              src={SCHOOL_AI_LOGO_RIGHT}
              alt=""
              className={styles.logoRight}
              width="41"
              loading="eager"
              aria-hidden="true"
            />
          </div>
          <div className={styles.brandByRow}>
            <span className={styles.brandByText}>by</span>
            <img src={BY_COSCHOOL} alt="CoSchool" width="73" height="13" loading="eager" />
          </div>
        </div>

        {/* Subtitle */}
        <p className={styles.subtitle}>Built for schools, designed for success</p>

        {/* Heading */}
        <h2 className={styles.heading}>Closes the learning loop with key measures</h2>
      </div>

      {/* ── Feature bullets — plain, no card ─────────────── */}
      <div ref={bulletRef} className={`${styles.featureBullets} fade-in`}>
        {FEATURE_BULLETS.map((text) => (
          <div key={text} className={styles.featureBullet}>
            <img src={CHECK_ICON} alt="" width="18" height="18" loading="lazy" aria-hidden="true" />
            <span className={styles.featureBulletText}>{text}</span>
          </div>
        ))}
      </div>

      {/* ── HOW IT WORKS label + connector with shimmer ──── */}
      <div className={styles.howLabelGroup}>
        <p className={styles.howLabel} aria-label="How it works section">
          How it works
        </p>
        <div className={styles.howConnector} aria-hidden="true" />
      </div>

      {/* ── Static persona sections ────────────────────────── */}
      <div className={styles.personasList}>
        {PERSONA_DATA.map((persona) => (
          <PersonaSection key={persona.id} persona={persona} />
        ))}
      </div>

      {/* ── Bottom CTA ───────────────────────────────────── */}
      <div className={styles.ctaWrap}>
        <a href="#cta" className={`btn-primary ${styles.ctaBtn}`}>
          Try School Ai for free
        </a>
      </div>
    </section>
  );
}
