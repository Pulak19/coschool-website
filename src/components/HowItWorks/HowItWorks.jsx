import { useEffect, useRef } from 'react';
import styles from './HowItWorks.module.css';

/* ── Assets ──────────────────────────────────────────────── */
const SCHOOL_AI_LOGO_LEFT  = '/assets/128bcf7d26282a72f274e095622049314669b70c.svg';
const SCHOOL_AI_LOGO_RIGHT = '/assets/b79886e508077f22b2f4fa5f999983e0684f0ed7.svg';
const BY_COSCHOOL          = '/assets/dceefcdd05c9fb15ba2e9eb40b80b6f74efb34c0.svg';
const VERT_LINE            = '/assets/20d546716f32dd9555996edc108f0db820f3f1fe.svg';
const CHECK_ICON           = '/assets/98dee7337dbe634d9da372ca8650a1cb1a5ec704.svg';
const ACCENT_MARK          = '/assets/e1817a74f1a3ad3fe2eb77fa22a85cf11227d305.svg';
const IPAD_FRAME           = '/assets/113f6c88d43c35ec11a950e6656f2781a318356c.png';

/* ── Screen images inside iPad mockups ───────────────────── */
const PERSONA_DATA = [
  {
    id: 'teacher',
    role: "Teacher's assistant",
    feature: 'Assigning Homework',
    body: 'Set goals, unlock chapters, maintain complete control — the natural way.',
    screenSrc: '/assets/de0511d6ca4655271fdce0eb2eb0753e8b72f669.png',
    imageLeft: false, // text left, iPad right on desktop
  },
  {
    id: 'student',
    role: "Student's AI tutor",
    feature: 'Learn with AI',
    body: 'Guided practice with real-time hints, adaptive difficulty, and progress tracking.',
    screenSrc: '/assets/cb1235a3896fed456878160b7b5b29c154f2f94b.png',
    imageLeft: true,
  },
  {
    id: 'parent',
    role: "Parent's Confidant",
    feature: 'Stay in the loop',
    body: 'Daily summaries, learning nudges, and insights — so parents can reinforce at home.',
    screenSrc: '/assets/1c63e34f92b80349e2364f3e551c5057aa1cee4f.png',
    imageLeft: false,
  },
  {
    id: 'admin',
    role: "Admin's Insights",
    feature: 'Govern with data',
    body: 'School-wide learning dashboards that surface gaps and drive informed decisions.',
    screenSrc: '/assets/71cc0798fdcb1e14b3d0fbf37d1137e8a3480bf8.png',
    imageLeft: true,
  },
];

const FEATURE_BULLETS = [
  'Learning evidence surfaces early.',
  'Teachers act in time.',
  'Parents reinforce at home.',
];

/* ── Fade-in hook ────────────────────────────────────────── */
function useFadeIn(deps = []) {
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
  }, deps); // eslint-disable-line
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

/* ── Persona section ─────────────────────────────────────── */
function PersonaSection({ persona, index }) {
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
    <div
      ref={ref}
      className={`${styles.persona} ${persona.imageLeft ? styles.personaReverse : ''}`}
      data-persona={persona.id}
    >
      {/* Text side */}
      <div className={styles.personaText}>
        <img
          src={ACCENT_MARK}
          alt=""
          width="22"
          height="8"
          className="fade-in"
          data-fade
          loading="lazy"
        />
        <div className={`${styles.personaTextContent} fade-in`} data-fade style={{ transitionDelay: '80ms' }}>
          <h3 className={styles.personaFeature}>{persona.feature}</h3>
          <p className={styles.personaBody}>{persona.body}</p>
        </div>
      </div>

      {/* iPad side */}
      <div className={`${styles.personaMedia} fade-in`} data-fade style={{ transitionDelay: '160ms' }}>
        <IpadMockup src={persona.screenSrc} alt={`${persona.role} screen in CoSchool app`} />
      </div>
    </div>
  );
}

/* ── Main component ──────────────────────────────────────── */
export default function HowItWorks() {
  const headerRef = useFadeIn();
  const featureRef = useFadeIn();

  return (
    <section id="how-it-works" className={styles.section} aria-label="How CoSchool works">

      {/* ── Section header / intro ────────────────────────── */}
      <div ref={headerRef} className={`${styles.intro} fade-in`}>
        {/* SchoolAI by CoSchool logo */}
        <div className={styles.brandLogo} aria-label="SchoolAI by CoSchool">
          <div className={styles.brandLogoMain}>
            <img src={SCHOOL_AI_LOGO_LEFT}  alt="SchoolAI" width="111" height="50" loading="lazy" />
            <img src={SCHOOL_AI_LOGO_RIGHT} alt="" width="33" height="40" loading="lazy" aria-hidden="true" />
          </div>
          <div className={styles.brandLogoBy}>
            <img src={BY_COSCHOOL} alt="by CoSchool" width="77" height="11" loading="lazy" />
          </div>
        </div>

        {/* Vertical line */}
        <div className={styles.vertLine} aria-hidden="true">
          <img src={VERT_LINE} alt="" width="1" height="77" />
        </div>

        <h2 className={styles.heading}>Closes the learning loop</h2>
        <p className={styles.tagline}>
          Teacher anchored &nbsp;•&nbsp; Parent Supported &nbsp;•&nbsp; AI Enabled
        </p>

        {/* Feature bullets card */}
        <div ref={featureRef} className={`${styles.featureCard} fade-in`}>
          {FEATURE_BULLETS.map((text) => (
            <div key={text} className={styles.featureBullet}>
              <img src={CHECK_ICON} alt="" width="18" height="18" loading="lazy" aria-hidden="true" />
              <span className={styles.featureBulletText}>{text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── HOW IT WORKS label ───────────────────────────── */}
      <p className={styles.howLabel} aria-label="How it works section">
        HOW IT WORKS
      </p>

      {/* ── Persona sections ─────────────────────────────── */}
      {PERSONA_DATA.map((persona, i) => (
        <div key={persona.id}>
          <h3 className={styles.personaRole}>{persona.role}</h3>
          <PersonaSection persona={persona} index={i} />
        </div>
      ))}

      {/* ── Bottom CTA ───────────────────────────────────── */}
      <div className={styles.ctaWrap}>
        <a href="#cta" className="btn-primary">
          Try School AI for free
        </a>
      </div>
    </section>
  );
}
