import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Menu, Globe, X } from 'lucide-react';
import logo from '../assets/logo.png';

const Navbar = () => {
  const { lang, switchLanguage, t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleLang = () => {
    switchLanguage(lang === 'en' ? 'ta' : 'en');
  };

  return (
    <header className="floating-navbar-wrapper">
      <div className="floating-navbar">

        {/* LOGO */}
        <Link to="/" className="logo-wrap" onClick={() => setIsMenuOpen(false)}>
          <img 
            src={logo} 
            alt="BTS Earth Movers" 
            style={{ 
              height: '45px', 
              width: 'auto', 
              objectFit: 'contain' 
            }} 
          />
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
          <Link to="/projects" onClick={() => setIsMenuOpen(false)}>
            {t('nav.projects')}
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
   FLOATING NAVBAR WRAPPER
================================ */
.floating-navbar-wrapper {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  width: 100%;
  max-width: 1200px;
  padding: 0 20px;
}

/* ================================
   FLOATING PILL NAVBAR
================================ */
.floating-navbar {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(30px) saturate(180%);
  -webkit-backdrop-filter: blur(30px) saturate(180%);

  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 50px;
  
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.9);

  padding: 12px 24px;
  
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
  text-decoration: none;
  padding: 4px 8px;
  transition: transform 0.3s ease;
}

.logo-wrap:hover {
  transform: scale(1.05);
}

/* ================================
   NAV LINKS (DESKTOP)
================================ */
.nav-links {
  display: flex;
  align-items: center;
  gap: 32px;
}

.nav-links a {
  text-decoration: none;
  color: #111;
  font-weight: 500;
  font-size: 0.95rem;
  transition: color 0.3s ease;
  position: relative;
}

.nav-links a:hover {
  color: #FF9F1C;
}

.nav-links a::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 2px;
  background: #FF9F1C;
  transition: width 0.3s ease;
}

.nav-links a:hover::after {
  width: 100%;
}

/* ================================
   LANGUAGE BUTTON
================================ */
.lang-btn {
  display: flex;
  align-items: center;
  gap: 6px;

  background: rgba(17, 17, 17, 0.08);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(17, 17, 17, 0.12);

  padding: 8px 14px;
  border-radius: 50px;
  cursor: pointer;
  color: #111;
  font-weight: 500;
  transition: all 0.3s ease;
}

.lang-btn:hover {
  background: rgba(17, 17, 17, 0.12);
  border-color: rgba(17, 17, 17, 0.2);
}

/* ================================
   QUOTE BUTTON
================================ */
.quote-btn {
  background: #FF9F1C;
  color: #fff;
  padding: 10px 24px;
  border-radius: 50px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(255, 159, 28, 0.3);
}

.quote-btn:hover {
  background: #e68a0a;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 159, 28, 0.5);
  color: #fff;
}

.quote-btn::after {
  display: none;
}

/* ================================
   MOBILE MENU BUTTON
================================ */
.mobile-menu-btn {
  display: none;
  background: rgba(17, 17, 17, 0.08);
  border: 1px solid rgba(17, 17, 17, 0.12);
  border-radius: 50%;
  padding: 8px;
  cursor: pointer;
  color: #111;
  transition: all 0.3s ease;
}

.mobile-menu-btn:hover {
  background: rgba(17, 17, 17, 0.12);
}

/* ================================
   MOBILE RESPONSIVE
================================ */
@media (max-width: 900px) {
  .floating-navbar-wrapper {
    top: 10px;
    padding: 0 10px;
  }

  .floating-navbar {
    padding: 10px 16px;
  }

  .mobile-menu-btn {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .nav-links {
    position: absolute;
    top: 70px;
    right: 10px;
    width: 220px;

    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(30px) saturate(180%);
    -webkit-backdrop-filter: blur(30px) saturate(180%);

    border: 1px solid rgba(255, 255, 255, 0.5);
    border-radius: 20px;

    box-shadow:
      0 8px 32px rgba(0, 0, 0, 0.1),
      inset 0 1px 0 rgba(255, 255, 255, 0.9);

    flex-direction: column;
    gap: 16px;
    padding: 1.5rem;

    opacity: 0;
    transform: translateY(-12px) scale(0.95);
    pointer-events: none;

    transition: opacity 0.25s ease, transform 0.25s ease;
    z-index: 999;
  }

  .nav-links a {
    color: #111;
  }

  .nav-links .quote-btn {
    color: #fff;
  }

  .nav-links.active {
    opacity: 1;
    transform: translateY(0) scale(1);
    pointer-events: auto;
  }

  .nav-links a::after {
    display: none;
  }

  .logo-wrap {
    padding: 6px 12px;
  }

  .logo-wrap img {
    height: 32px !important;
  }
}

@media (max-width: 480px) {
  .floating-navbar-wrapper {
    padding: 0 5px;
  }

  .floating-navbar {
    padding: 8px 12px;
  }

  .nav-links {
    width: 200px;
    right: 5px;
  }
}

`}</style>

    </header>
  );
};

export default Navbar;
