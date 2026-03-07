import styles from './Footer.module.css';

const LOGO_WHITE = 'http://localhost:3845/assets/732de6843b4f1bd5fbced728a151768a4837a1f2.svg';
const ARROW_ICON = 'http://localhost:3845/assets/4d92bef19e05594a36016139ac4b9d12b12fc197.svg';

const NAV_LINKS = [
  { label: 'Home',     href: '#hero' },
  { label: 'About Us', href: '#founders' },
  { label: 'Careers',  href: '#' },
  { label: 'Blog',     href: '#' },
];

export default function Footer() {
  return (
    <footer id="footer" className={styles.footer} role="contentinfo">
      <div className={styles.inner}>

        {/* ── Logo ───────────────────────────────────────── */}
        <a href="#hero" className={styles.logo} aria-label="CoSchool — back to top">
          <img src={LOGO_WHITE} alt="CoSchool" width="140" height="26" loading="lazy" />
        </a>

        {/* ── Nav + office ───────────────────────────────── */}
        <div className={styles.navOffice}>
          {/* Navigation links */}
          <nav aria-label="Footer navigation">
            <ul className={styles.navList}>
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className={styles.navLink}>{link.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Office locations */}
          <div className={styles.officeSection}>
            <p className={styles.officeLabel}>Office locations</p>
            <div className={styles.officeItem}>
              <button
                className={styles.officeToggle}
                aria-expanded="true"
                aria-controls="office-address"
              >
                <span className={styles.officeName}>Main Office</span>
                <span className={styles.officeArrow} aria-hidden="true">
                  <img src={ARROW_ICON} alt="" width="24" height="24" loading="lazy" />
                </span>
              </button>
              <address id="office-address" className={styles.officeAddress}>
                WeWork Office, 1st Floor, Rajapushpa Summit,
                Nanakramguda Road, Financial District,
                Hyderabad&#8209;500032
              </address>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ─────────────────────────────────── */}
        <div className={styles.bottomBar}>
          <div className={styles.legal}>
            <a href="#" className={styles.legalLink}>Terms</a>
            <span className={styles.legalSep} aria-hidden="true">•</span>
            <a href="#" className={styles.legalLink}>Privacy</a>
          </div>
          <p className={styles.copyright}>Copyright CoSchool 2025</p>
        </div>
      </div>
    </footer>
  );
}
