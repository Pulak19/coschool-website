import { useState, useEffect, useRef, useCallback } from 'react';
import styles from './HowItWorks.module.css';

/* ── Assets ──────────────────────────────────────────────── */
const IPAD_FRAME           = '/assets/113f6c88d43c35ec11a950e6656f2781a318356c.png';
const IPHONE_FRAME         = '/assets/iphone-17-black-portrait.png';
const PAGINATION_SVG       = '/assets/pagination.svg';

/* ── Persona data with slides ────────────────────────────── */
const PERSONA_DATA = [
  {
    id: 'teacher',
    gradientLabel: 'For',
    gradientTitle: 'Teacher',
    gradient: 'linear-gradient(101.16deg, #D2EAD2 2.06%, #F2F9F2 84.8%)',
    mockup: 'ipad',
    slides: [
      {
        feature: 'Teacher Assigns Homework',
        body: "Set goals and assign differentiated homework — aligned to students' needs.",
        screenSrc: '/assets/de0511d6ca4655271fdce0eb2eb0753e8b72f669.png',
      },
      {
        feature: 'Get insights without correction load',
        body: 'See learning gaps by student and concept — without manual correction.',
        screenSrc: '/assets/de0511d6ca4655271fdce0eb2eb0753e8b72f669.png',
      },
      {
        feature: 'Intervene where it matters',
        body: 'Give every student the right support — in one click.',
        screenSrc: '/assets/de0511d6ca4655271fdce0eb2eb0753e8b72f669.png',
      },
      {
        feature: 'Get adaptive lesson plans',
        body: 'Get lesson plans that update daily based on class gaps.',
        screenSrc: '/assets/de0511d6ca4655271fdce0eb2eb0753e8b72f669.png',
      },
    ],
  },
  {
    id: 'student',
    gradientLabel: 'For',
    gradientTitle: 'Student',
    gradient: 'linear-gradient(109.58deg, #FCE4E4 1.71%, #FFF4F4 88.63%)',
    mockup: 'ipad',
    slides: [
      {
        feature: 'Do homework without getting stuck',
        body: 'AI tutor, Vin supports students without giving away answers — building the habit of finding them.',
        screenSrc: '/assets/cb1235a3896fed456878160b7b5b29c154f2f94b.png',
      },
      {
        feature: 'Get a personalised study plan',
        body: "Study plans adapt to each student's gaps and goals — and update as they improve.",
        screenSrc: '/assets/cb1235a3896fed456878160b7b5b29c154f2f94b.png',
      },
      {
        feature: 'See their learning index',
        body: "Students see their learning journey over time — what's mastered and what needs focus.",
        screenSrc: '/assets/cb1235a3896fed456878160b7b5b29c154f2f94b.png',
      },
    ],
  },
  {
    id: 'parent',
    gradientLabel: 'For',
    gradientTitle: 'Parents',
    gradient: 'linear-gradient(109.35deg, #E2DEF8 2.28%, #F8F6FF 80.36%)',
    mockup: 'iphone',
    slides: [
      {
        feature: 'Get insights on their child',
        body: 'Clear visibility into strengths, gaps, and progress — without needing to ask.',
        screenSrc: '/assets/1c63e34f92b80349e2364f3e551c5057aa1cee4f.png',
      },
      {
        feature: 'Support learning at home',
        body: 'Simple, actionable steps help parents support learning beyond school.',
        screenSrc: '/assets/1c63e34f92b80349e2364f3e551c5057aa1cee4f.png',
      },
    ],
  },
  {
    id: 'admin',
    gradientLabel: 'For',
    gradientTitle: 'Leadership',
    gradient: 'linear-gradient(114.91deg, #E2E2E2 2.92%, #F7F7F7 72.11%)',
    mockup: 'iphone',
    slides: [
      {
        feature: 'Get school-wide insights',
        body: 'A single view of learning across classes, grades, and subjects — at a glance.',
        screenSrc: '/assets/71cc0798fdcb1e14b3d0fbf37d1137e8a3480bf8.png',
      },
      {
        feature: 'Get alerts, take action',
        body: 'Real-time alerts highlight issues early — with clear next steps to act fast.',
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

/* ── iPhone mockup ────────────────────────────────────────── */
function IphoneMockup({ src, alt, visible }) {
  return (
    <div className={`${styles.iphoneWrap} ${visible ? styles.ipadVisible : styles.ipadHidden}`}>
      <div className={styles.iphoneInner}>
        <img
          src={IPHONE_FRAME}
          alt=""
          className={styles.iphoneFrame}
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
      {/* Gradient title — 2-line: small label + large name */}
      <div
        className={styles.gradientTitle}
        style={{ backgroundImage: persona.gradient }}
      >
        <span className={styles.gradientLabel}>{persona.gradientLabel}</span>
        <span className={styles.gradientName}>{persona.gradientTitle}</span>
      </div>

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
      <div className={persona.mockup === 'iphone' ? styles.imageAreaPhone : styles.imageArea}>
        {persona.slides.map((slide, i) => (
          persona.mockup === 'iphone' ? (
            <IphoneMockup
              key={i}
              src={slide.screenSrc}
              alt={`${slide.feature} screen`}
              visible={i === activeIndex}
            />
          ) : (
            <IpadMockup
              key={i}
              src={slide.screenSrc}
              alt={`${slide.feature} screen`}
              visible={i === activeIndex}
            />
          )
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
