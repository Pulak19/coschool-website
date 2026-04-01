import { useState, useEffect, useRef, useCallback } from 'react';
import styles from './HowItWorks.module.css';

/* ── Assets ──────────────────────────────────────────────── */
const IPAD_FRAME           = '/assets/113f6c88d43c35ec11a950e6656f2781a318356c.png';
const PAGINATION_SVG       = '/assets/pagination.svg';

/* ── Persona data with slides ────────────────────────────── */
const PERSONA_DATA = [
  {
    id: 'teacher',
    gradientTitle: "Teacher's Assistant",
    gradient: 'linear-gradient(98.42deg, #D2EAD2 2.06%, #F2F9F2 84.8%)',
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
    gradientTitle: "Student's AI tutor",
    gradient: 'linear-gradient(104.93deg, #FCE4E4 1.71%, #FFF4F4 88.63%)',
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
    gradientTitle: "Parent's confidant",
    gradient: 'linear-gradient(104.76deg, #E2DEF8 2.28%, #F8F6FF 80.36%)',
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
    gradientTitle: "Admin's insights",
    gradient: 'linear-gradient(109.21deg, #E2E2E2 2.92%, #F7F7F7 72.11%)',
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

/* ── Persona section — text scroll + image crossfade ─────── */
function PersonaSection({ persona }) {
  const sectionRef = useRef(null);
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const autoTimerRef = useRef(null);

  const slideCount = persona.slides.length;

  // Scroll text to a given index
  const scrollTo = useCallback((idx) => {
    const el = scrollRef.current;
    if (!el) return;
    const slideW = el.firstChild?.offsetWidth || el.offsetWidth;
    el.scrollTo({ left: idx * slideW, behavior: 'smooth' });
  }, []);

  // Sync activeIndex from scroll position
  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const slideW = el.firstChild?.offsetWidth || el.offsetWidth;
    const idx = Math.round(el.scrollLeft / slideW);
    setActiveIndex(Math.min(idx, slideCount - 1));
  }, [slideCount]);

  // Auto-advance when section enters viewport
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
            scrollTo(current);
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
  }, [slideCount, scrollTo]);

  // Stop auto on manual touch
  const stopAuto = useCallback(() => {
    if (autoTimerRef.current) {
      clearInterval(autoTimerRef.current);
      autoTimerRef.current = null;
    }
  }, []);

  return (
    <div ref={sectionRef} className={styles.persona} data-persona={persona.id}>
      {/* Gradient title */}
      <h3
        className={styles.gradientTitle}
        style={{ backgroundImage: persona.gradient }}
      >
        {persona.gradientTitle}
      </h3>

      {/* Functional pagination dots */}
      <div className={styles.dots}>
        {persona.slides.map((_, i) => (
          <span
            key={i}
            className={`${styles.dot} ${i === activeIndex ? styles.dotActive : ''}`}
          />
        ))}
      </div>

      {/* Text — horizontal scroll, clipped */}
      <div className={styles.textClip}>
        <div
          ref={scrollRef}
          className={styles.textScroll}
          onScroll={handleScroll}
          onTouchStart={stopAuto}
          onMouseDown={stopAuto}
        >
          {persona.slides.map((slide, i) => (
            <div key={i} className={styles.textSlide}>
              <h3 className={styles.slideFeature}>{slide.feature}</h3>
              <p className={styles.slideBody}>{slide.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Image — crossfade, stays in place */}
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
  return (
    <section id="how-it-works" className={styles.section} aria-label="How CoSchool works">

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
