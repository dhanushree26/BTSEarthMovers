import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Menu, Globe, X } from 'lucide-react';

const Navbar = () => {
  const { lang, switchLanguage, t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleLang = () => {
    switchLanguage(lang === 'en' ? 'ta' : 'en');
  };

  return (
    <header className="glass-navbar">
      <div className="nav-inner">

        {/* LOGO */}
        <Link to="/" className="logo-wrap" onClick={() => setIsMenuOpen(false)}>
          <div className="logo-badge">BTS</div>
          <div className="logo-text">
            <span className="logo-title">EARTH MOVERS</span>
            <span className="logo-sub">Equipment Rentals</span>
          </div>
        </Link>

        {/* MOBILE MENU ICON */}
        <button
          className="mobile-menu-btn"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* NAV LINKS */}
        <nav className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <Link to="/" onClick={() => setIsMenuOpen(false)}>
            {t('nav.home')}
          </Link>
          <Link to="/equipment" onClick={() => setIsMenuOpen(false)}>
            {t('nav.equipment')}
          </Link>
          <Link to="/about" onClick={() => setIsMenuOpen(false)}>
            {t('nav.about')}
          </Link>
          <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
            {t('nav.contact')}
          </Link>

          <button className="lang-btn" onClick={toggleLang}>
            <Globe size={16} />
            {lang === 'en' ? 'TA' : 'EN'}
          </button>

          <Link to="/booking" className="quote-btn" onClick={() => setIsMenuOpen(false)}>
            GET QUOTE
          </Link>
        </nav>
      </div>

      {/* CSS */}
      <style>{`
/* ================================
   GLOBAL RESET
================================ */
html, body {
  margin: 0;
  padding: 0;
}

/* ================================
   GLASS NAVBAR (DESKTOP + MOBILE)
================================ */
.glass-navbar {
  position: sticky;
  top: 0;
  z-index: 1000;

  background: rgba(255, 255, 255, 0.55);
  backdrop-filter: blur(18px) saturate(180%);
  -webkit-backdrop-filter: blur(18px) saturate(180%);

  border-bottom: 1px solid rgba(255, 255, 255, 0.4);
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,0.6),
    0 12px 30px rgba(0,0,0,0.12);

  border-radius: 0 0 22px 22px;
}

/* NAV INNER */
.nav-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  height: 80px;

  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* ================================
   LOGO
================================ */
.logo-wrap {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
}

.logo-badge {
  background: rgba(255,159,28,0.85);
  backdrop-filter: blur(18px) saturate(180%);
  -webkit-backdrop-filter: blur(18px) saturate(180%);
  color: #111;
  font-weight: 800;
  font-size: 1.2rem;
  padding: 6px 12px;
  border-radius: 8px;
}

.logo-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #111;
  letter-spacing: 1px;
}

.logo-sub {
  font-size: 0.7rem;
  color: #666;
  letter-spacing: 2px;
  text-transform: uppercase;
}

/* ================================
   NAV LINKS (DESKTOP)
================================ */
.nav-links {
  display: flex;
  align-items: center;
  gap: 26px;
}

.nav-links a {
  text-decoration: none;
  color: #111;
  font-weight: 500;
}

/* ================================
   LANGUAGE BUTTON
================================ */
.lang-btn {
  display: flex;
  align-items: center;
  gap: 6px;

  background: rgba(255,255,255,0.4);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.5);

  padding: 6px 10px;
  border-radius: 8px;
  cursor: pointer;
  color: #111;
}

/* ================================
   QUOTE BUTTON
================================ */
.quote-btn {
  background: rgba(255,159,28,0.85);
  backdrop-filter: blur(10px);
  color: #111;
  padding: 10px 22px;
  border-radius: 10px;
  font-weight: 600;
  text-decoration: none;
}

/* ================================
   MOBILE MENU BUTTON
================================ */
.mobile-menu-btn {
  display: none;
  background: transparent;
  border: none;
  cursor: pointer;
  color: #111;
}

/* ================================
   MOBILE GLASS DROPDOWN
================================ */
.glass-navbar {
  isolation: isolate;
}

@media (max-width: 900px) {
  .mobile-menu-btn {
    display: block;
  }

  .nav-links {
    position: absolute;
    top: 92px;
    right: 16px;
    width: 220px;

    background: rgba(0, 0, 0, 0.85);
    backdrop-filter: blur(18px) saturate(180%);
    -webkit-backdrop-filter: blur(18px) saturate(180%);

    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 16px;

    box-shadow:
      inset 0 1px 0 rgba(255,255,255,0.1),
      0 12px 30px rgba(0,0,0,0.3);

    flex-direction: column;
    gap: 18px;
    padding: 1.5rem;

    opacity: 0;
    transform: translateY(-12px) scale(0.95);
    pointer-events: none;

    transition: opacity 0.25s ease, transform 0.25s ease;
    will-change: backdrop-filter;
    z-index: 999;
  }

  .nav-links a {
    color: #fff;
  }

  .nav-links .lang-btn {
    background: rgba(255, 255, 255, 0.15);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: #fff;
  }

  .nav-links .quote-btn {
    background: rgba(255, 159, 28, 0.9);
    color: #111;
  }

  .nav-links.active {
    opacity: 1;
    transform: translateY(0) scale(1);
    pointer-events: auto;
  }
}

`}</style>

    </header>
  );
};

export default Navbar;
