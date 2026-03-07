import { useState, useEffect } from 'react';
import styles from './Nav.module.css';

const LOGO_SRC       = 'http://localhost:3845/assets/e66d37c4b88483b3c6d7f9aa4633d64091ca67e2.svg';
const LOGO_WHITE_SRC = 'http://localhost:3845/assets/732de6843b4f1bd5fbced728a151768a4837a1f2.svg';

const NAV_LINKS = [
  { label: 'Home',     href: '#hero' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'About Us', href: '#founders' },
  { label: 'Blog',     href: '#' },
];

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu on escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <header
      className={`${styles.header} ${scrolled ? styles.headerScrolled : ''}`}
      role="banner"
    >
      <div className={styles.inner}>
        {/* Logo */}
        <a href="#hero" className={styles.logo} aria-label="CoSchool Home">
          <img src={LOGO_SRC} alt="CoSchool" width="131" height="24" />
        </a>

        {/* Desktop Nav */}
        <nav className={styles.desktopNav} aria-label="Main navigation">
          <ul className={styles.navList}>
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <a href={link.href} className={styles.navLink}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop CTA */}
        <a href="#cta" className={`btn-primary ${styles.desktopCta}`}>
          Book a Demo
        </a>

        {/* Mobile hamburger */}
        <button
          className={styles.hamburger}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((o) => !o)}
        >
          <img
            src="http://localhost:3845/assets/66c420125efae681354f488f24bff9b7af3facbc.svg"
            alt=""
            width="18"
            height="18"
          />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav
          id="mobile-menu"
          className={styles.mobileMenu}
          aria-label="Mobile navigation"
        >
          <ul className={styles.mobileNavList}>
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className={styles.mobileNavLink}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a href="#cta" className={`btn-primary ${styles.mobileCta}`} onClick={() => setMenuOpen(false)}>
                Book a Demo
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
