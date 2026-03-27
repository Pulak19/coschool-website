import { useState, useEffect, useRef } from 'react';
import styles from './HowItWorks.module.css';

/* ── Assets ──────────────────────────────────────────────── */
const SCHOOL_AI_LOGO_LEFT  = '/assets/128bcf7d26282a72f274e095622049314669b70c.svg';
const SCHOOL_AI_LOGO_RIGHT = '/assets/b79886e508077f22b2f4fa5f999983e0684f0ed7.svg';
const BY_COSCHOOL          = '/assets/dceefcdd05c9fb15ba2e9eb40b80b6f74efb34c0.svg';
const CHECK_ICON           = '/assets/f23b72ff3341f4cd6ff46415458c6d512adef035.svg';
const IPAD_FRAME           = '/assets/113f6c88d43c35ec11a950e6656f2781a318356c.png';
const PAGINATION_SVG       = '/assets/pagination.svg';

/* ── Persona avatars ─────────────────────────────────────── */
const AVATAR_TEACHER  = '/assets/avatar-teacher.png';
const AVATAR_STUDENT  = '/assets/avatar-student.png';
const AVATAR_PARENT   = '/assets/avatar-parent.png';
const ICON_SCHOOL_V2  = '/assets/icon-school-v2.svg';

/* ── Persona data with slides ────────────────────────────── */
const PERSONA_DATA = [
  {
    id: 'teacher',
    avatar: AVATAR_TEACHER,
    avatarType: 'photo',
    slides: [
      {
        feature: 'Teacher Assigns Homework',
        body: 'Set goals, unlocks chapters, maintains complete control — the natural way.',
        screenSrc: '/assets/de0511d6ca4655271fdce0eb2eb0753e8b72f669.png',
      },
      {
        feature: 'Monitor Student Progress',
        body: 'Real-time visibility into student practice — see who needs help before they fall behind.',
        screenSrc: '/assets/de0511d6ca4655271fdce0eb2eb0753e8b72f669.png',
      },
      {
        feature: 'Targeted Interventions',
        body: 'Identify gaps early and act precisely — no more guesswork in the classroom.',
        screenSrc: '/assets/de0511d6ca4655271fdce0eb2eb0753e8b72f669.png',
      },
    ],
  },
  {
    id: 'student',
    avatar: AVATAR_STUDENT,
    avatarType: 'photo',
    slides: [
      {
        feature: 'Students learn with Ai',
        body: 'Set goals, unlocks chapters, maintains complete control — the natural way.',
        screenSrc: '/assets/cb1235a3896fed456878160b7b5b29c154f2f94b.png',
      },
      {
        feature: 'Practice at Their Own Pace',
        body: 'Adaptive questions that meet students where they are — building confidence step by step.',
        screenSrc: '/assets/cb1235a3896fed456878160b7b5b29c154f2f94b.png',
      },
      {
        feature: 'Track Your Journey',
        body: 'Visual dashboards showing learning progress, strengths, and areas to improve.',
        screenSrc: '/assets/cb1235a3896fed456878160b7b5b29c154f2f94b.png',
      },
    ],
  },
  {
    id: 'parent',
    avatar: AVATAR_PARENT,
    avatarType: 'photo',
    slides: [
      {
        feature: 'Parents get updates',
        body: 'Set goals, unlocks chapters, maintains complete control — the natural way.',
        screenSrc: '/assets/1c63e34f92b80349e2364f3e551c5057aa1cee4f.png',
      },
      {
        feature: 'Daily Insights',
        body: 'See what your child practiced today — stay informed without hovering.',
        screenSrc: '/assets/1c63e34f92b80349e2364f3e551c5057aa1cee4f.png',
      },
      {
        feature: 'Support at Home',
        body: 'Guided activities to reinforce what was learned in class — meaningful involvement.',
        screenSrc: '/assets/1c63e34f92b80349e2364f3e551c5057aa1cee4f.png',
      },
    ],
  },
  {
    id: 'admin',
    avatar: ICON_SCHOOL_V2,
    avatarType: 'icon',
    slides: [
      {
        feature: 'School leadership are aware',
        body: 'Set goals, unlocks chapters, maintains complete control — the natural way.',
        screenSrc: '/assets/71cc0798fdcb1e14b3d0fbf37d1137e8a3480bf8.png',
      },
      {
        feature: 'School-wide Analytics',
        body: 'Aggregate learning data across grades — see the big picture at a glance.',
        screenSrc: '/assets/71cc0798fdcb1e14b3d0fbf37d1137e8a3480bf8.png',
      },
      {
        feature: 'Evidence-based Decisions',
        body: 'Data-driven curriculum planning — no more blind calls on what to prioritise.',
        screenSrc: '/assets/71cc0798fdcb1e14b3d0fbf37d1137e8a3480bf8.png',
      },
    ],
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
function IpadMockup({ src, alt, visible }) {
  return (
    <div className={`${styles.ipadWrap} ${visible ? styles.ipadVisible : styles.ipadHidden}`}>
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

/* ── Persona section — state-driven text swap + image crossfade ── */
function PersonaSection({ persona }) {
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const autoTimerRef = useRef(null);

  const slideCount = persona.slides.length;

  // Auto-advance when section scrolls into view
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    let started = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          started = true;
          let current = 0;
          autoTimerRef.current = setInterval(() => {
            current += 1;
            if (current >= slideCount) {
              clearInterval(autoTimerRef.current);
              return;
            }
            setActiveIndex(current);
          }, 2800);
        }
      },
      { threshold: 0.35 }
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      if (autoTimerRef.current) clearInterval(autoTimerRef.current);
    };
  }, [slideCount]);

  return (
    <div ref={sectionRef} className={styles.persona} data-persona={persona.id}>
      {/* Circular avatar */}
      <div className={`${styles.avatar} ${persona.avatarType === 'icon' ? styles.avatarIcon : ''}`}>
        <img
          src={persona.avatar}
          alt=""
          className={styles.avatarImg}
          width="71"
          height="71"
          loading="lazy"
          aria-hidden="true"
        />
      </div>

      {/* Pagination SVG from Figma */}
      <img
        src={PAGINATION_SVG}
        alt=""
        className={styles.pagination}
        width="36"
        height="8"
        aria-hidden="true"
      />

      {/* Text area — crossfade between slides */}
      <div className={styles.textArea}>
        {persona.slides.map((slide, i) => (
          <div
            key={i}
            className={`${styles.textSlide} ${i === activeIndex ? styles.textVisible : styles.textHidden}`}
          >
            <h3 className={styles.slideFeature}>{slide.feature}</h3>
            <p className={styles.slideBody}>{slide.body}</p>
          </div>
        ))}
      </div>

      {/* Image area — crossfade, stays in place */}
      <div className={styles.imageArea}>
        {persona.slides.map((slide, i) => (
          <IpadMockup
            key={i}
            src={slide.screenSrc}
            alt={`${slide.feature} screen`}
            visible={i === activeIndex}
          />
        ))}
      </div>
    </div>
  );
}

/* ── Main component ──────────────────────────────────────── */
export default function HowItWorks() {
  const headerRef = useFadeIn();
  const bulletRef = useFadeIn();

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
        <div className={styles.brandLogo} aria-label="School AI by CoSchool">
          <div className={styles.brandLogoMain}>
            <img src={SCHOOL_AI_LOGO_LEFT} alt="School AI" className={styles.logoLeft} width="138" loading="eager" />
            <img src={SCHOOL_AI_LOGO_RIGHT} alt="" className={styles.logoRight} width="41" loading="eager" aria-hidden="true" />
          </div>
          <div className={styles.brandByRow}>
            <span className={styles.brandByText}>by</span>
            <img src={BY_COSCHOOL} alt="CoSchool" width="73" height="13" loading="eager" />
          </div>
        </div>

        <p className={styles.subtitle}>Built for schools, designed for success</p>
        <h2 className={styles.heading}>Closes the learning loop with key measures</h2>
      </div>

      {/* ── Feature bullets — plain ──────────────────────── */}
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
        <p className={styles.howLabel}>How it works</p>
        <div className={styles.howConnector} aria-hidden="true" />
      </div>

      {/* ── Persona sections ─────────────────────────────── */}
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
