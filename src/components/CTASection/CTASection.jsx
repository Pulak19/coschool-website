import { useRef, useEffect } from 'react';
import styles from './CTASection.module.css';

/* ── YouTube embed (product walkthrough — controls on, no autoplay) ── */
const YT_ID         = '61iN2emMqbs';
const YT_WALKTHROUGH = `https://www.youtube.com/embed/${YT_ID}?rel=0&playsinline=1`;

const VERT_LINE     = '/assets/635e69af13927df7c1865331535343f2b5d088df.svg';
const QUOTE_ICON    = '/assets/ea9c058485855fde34df078855b6702d7b35aa9c.svg';

function useFadeIn() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('visible'); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

export default function CTASection() {
  const ctaRef   = useFadeIn();
  const videoRef = useFadeIn();
  const quoteRef = useFadeIn();

  return (
    <section id="cta" className={styles.section} aria-label="Book a demo">

      {/* ── Green bg area ─────────────────────────────────── */}
      <div className={styles.greenBg}>

        {/* Background orbs */}
        <div className={styles.orbTR} aria-hidden="true" />
        <div className={styles.orbBL} aria-hidden="true" />

        <div className={styles.inner}>

          {/* ── CTA text (left on desktop) ───────────────── */}
          <div ref={ctaRef} className={`${styles.ctaText} fade-in`}>
            <h2 className={styles.heading}>Your next step</h2>
            <p className={styles.subheading}>
              Book a 30&#8209;Minute Conversation
            </p>
            <div className={styles.body}>
              <p>
                We'll show you how SchoolAI works with your curriculum,
                what implementation looks like, and what changes for your school.
              </p>
              <p>&nbsp;</p>
              <p><strong>No slides.</strong></p>
              <p>&nbsp;</p>
              <p><strong>Real conversation.</strong></p>
            </div>
            <a href="mailto:demo@coschool.in" className="btn-primary" aria-label="Book your demo with CoSchool">
              Book your Demo
            </a>
          </div>

          {/* ── Video (right on desktop) ──────────────────── */}
          <div ref={videoRef} className={`${styles.videoCol} fade-in`}>
            {/* Vertical line */}
            <div className={styles.vertLine} aria-hidden="true">
              <img src={VERT_LINE} alt="" width="1" height="98" loading="lazy" />
            </div>

            {/* YouTube embed — product walkthrough, user-initiated play */}
            <div className={styles.videoFrame}>
              <iframe
                className={styles.video}
                src={YT_WALKTHROUGH}
                title="Product walkthrough for CoSchool"
                allow="encrypted-media; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            </div>

            <p className={styles.videoLabel}>Product Walkthrough</p>
          </div>
        </div>
      </div>

      {/* ── Quote section (white bg) ──────────────────────── */}
      <div ref={quoteRef} className={`${styles.quoteSection} fade-in`}>
        <img src={QUOTE_ICON} alt="" width="33" height="36" loading="lazy" aria-hidden="true" />
        <blockquote className={styles.quote}>
          If gaps are forming in your school today—and you can surface them
          tomorrow—<em>why wait?</em>
        </blockquote>
      </div>
    </section>
  );
}
