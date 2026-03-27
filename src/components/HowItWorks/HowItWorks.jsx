import { useState, useEffect, useRef, useCallback } from 'react';
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

/* ── Persona data with multiple slides per role ──────────── */
const PERSONA_DATA = [
  {
    id: 'student',
    label: 'Students',
    icon: ICON_STUDENT,
    slides: [
      {
        feature: 'Teacher Assigns Homework',
        body: 'Set goals, unlocks chapters, maintains complete control — the natural way.',
        screenSrc: '/assets/de0511d6ca4655271fdce0eb2eb0753e8b72f669.png',
      },
      {
        feature: 'Practice with AI',
        body: 'Adaptive questions that meet students where they are — building confidence step by step.',
        screenSrc: '/assets/de0511d6ca4655271fdce0eb2eb0753e8b72f669.png',
      },
      {
        feature: 'Track Your Progress',
        body: 'Visual dashboards showing your learning journey, strengths, and areas to improve.',
        screenSrc: '/assets/de0511d6ca4655271fdce0eb2eb0753e8b72f669.png',
      },
    ],
  },
  {
    id: 'teacher',
    label: 'Teachers',
    icon: ICON_TEACHER,
    slides: [
      {
        feature: 'Learn with Ai',
        body: 'Set goals, unlocks chapters, maintains complete control — the natural way.',
        screenSrc: '/assets/cb1235a3896fed456878160b7b5b29c154f2f94b.png',
      },
      {
        feature: 'Monitor Learning',
        body: 'Real-time visibility into student practice — see who needs help before they fall behind.',
        screenSrc: '/assets/cb1235a3896fed456878160b7b5b29c154f2f94b.png',
      },
      {
        feature: 'Targeted Interventions',
        body: 'Identify gaps early and act precisely — no more guesswork in the classroom.',
        screenSrc: '/assets/cb1235a3896fed456878160b7b5b29c154f2f94b.png',
      },
    ],
  },
  {
    id: 'parent',
    label: 'Parents',
    icon: ICON_PARENT,
    slides: [
      {
        feature: 'Teacher Assigns Homework',
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
    label: 'School Leadership',
    icon: ICON_SCHOOL,
    slides: [
      {
        feature: 'Learn with Ai',
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

/* ── Persona carousel section ────────────────────────────── */
function PersonaSection({ persona }) {
  const sectionRef = useRef(null);
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const autoScrollTimerRef = useRef(null);
  const hasAutoScrolled = useRef(false);

  const slideCount = persona.slides.length;

  // Track active slide from scroll position
  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const slideWidth = el.offsetWidth;
    const idx = Math.round(el.scrollLeft / slideWidth);
    setActiveIndex(Math.min(idx, slideCount - 1));
  }, [slideCount]);

  // Scroll to specific slide
  const scrollToSlide = useCallback((idx) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ left: idx * el.offsetWidth, behavior: 'smooth' });
  }, []);

  // Auto-scroll when section enters center of viewport
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAutoScrolled.current) {
          hasAutoScrolled.current = true;
          // Start auto-advancing after a short pause
          let currentSlide = 0;
          autoScrollTimerRef.current = setInterval(() => {
            currentSlide += 1;
            if (currentSlide >= slideCount) {
              clearInterval(autoScrollTimerRef.current);
              return;
            }
            scrollToSlide(currentSlide);
          }, 2200);
        }
      },
      { threshold: 0.5 } // fires when 50% visible ≈ centered
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      if (autoScrollTimerRef.current) clearInterval(autoScrollTimerRef.current);
    };
  }, [slideCount, scrollToSlide]);

  // Stop auto-scroll on manual touch/interaction
  const stopAutoScroll = useCallback(() => {
    if (autoScrollTimerRef.current) {
      clearInterval(autoScrollTimerRef.current);
      autoScrollTimerRef.current = null;
    }
  }, []);

  return (
    <div ref={sectionRef} className={styles.persona} data-persona={persona.id}>
      {/* Pill badge */}
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

      {/* Horizontal scroll carousel */}
      <div
        ref={scrollRef}
        className={styles.carousel}
        onScroll={handleScroll}
        onTouchStart={stopAutoScroll}
        onMouseDown={stopAutoScroll}
      >
        {persona.slides.map((slide, i) => (
          <div key={i} className={styles.carouselSlide}>
            {/* Text content */}
            <div className={styles.slideText}>
              <img
                src={ACCENT_MARK}
                alt=""
                width="22"
                height="8"
                loading="lazy"
                aria-hidden="true"
              />
              <div className={styles.slideTextContent}>
                <h3 className={styles.slideFeature}>{slide.feature}</h3>
                <p className={styles.slideBody}>{slide.body}</p>
              </div>
            </div>
            {/* iPad mockup */}
            <div className={styles.slideMedia}>
              <IpadMockup
                src={slide.screenSrc}
                alt={`${slide.feature} screen in CoSchool app`}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Pagination dots */}
      <div className={styles.dots} role="tablist" aria-label={`${persona.label} slides`}>
        {persona.slides.map((_, i) => (
          <button
            key={i}
            className={`${styles.dot} ${i === activeIndex ? styles.dotActive : ''}`}
            onClick={() => { stopAutoScroll(); scrollToSlide(i); }}
            role="tab"
            aria-selected={i === activeIndex}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

/* ── Main component ──────────────────────────────────────── */
export default function HowItWorks() {
  const headerRef     = useFadeIn();
  const featureRef    = useFadeIn();
  const featureCardRef = useRef(null);

  /* ── Scroll-driven card tilt ────────────────────────────── */
  useEffect(() => {
    const card = featureCardRef.current;
    if (!card) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const onScroll = () => {
      const rect   = card.getBoundingClientRect();
      const mid    = rect.top + rect.height / 2;
      const vMid   = window.innerHeight / 2;
      const offset = Math.max(-1, Math.min(1, (mid - vMid) / (window.innerHeight * 0.5)));
      card.style.transform =
        `perspective(900px) rotateX(${offset * 1.5}deg) rotateZ(${-offset * 0.4}deg)`;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section id="how-it-works" className={styles.section} aria-label="How CoSchool works">

      {/* ── Gradient frame lines (3-sided ∩ around logo) ──── */}
      <div className={styles.logoFrame} aria-hidden="true">
        <span className={styles.logoFrameRight} />
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

        {/* Connector line: logo → heading */}
        <div className={styles.vertLine} aria-hidden="true">
          <img src={CONNECTOR_LINE} alt="" width="1" height="77" />
        </div>

        {/* Content group: heading + card */}
        <div className={styles.introContent}>
          <h2 className={styles.heading}>Closes the learning loop with key measures</h2>

          {/* Feature bullets card */}
          <div ref={(el) => { featureRef.current = el; featureCardRef.current = el; }}
            className={`${styles.featureCard} fade-in`}
          >
            {FEATURE_BULLETS.map((text) => (
              <div key={text} className={styles.featureBullet}>
                <img src={CHECK_ICON} alt="" width="18" height="18" loading="lazy" aria-hidden="true" />
                <span className={styles.featureBulletText}>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── HOW IT WORKS label + connector ───────────────── */}
      <div className={styles.howLabelGroup}>
        <p className={styles.howLabel} aria-label="How it works section">
          How it works
        </p>
        <div className={styles.howVertLine} aria-hidden="true">
          <img src={HOW_VERT_LINE} alt="" width="1" height="147" loading="lazy" />
        </div>
      </div>

      {/* ── Persona sections with carousels ────────────────── */}
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
