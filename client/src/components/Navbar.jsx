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
        <header style={{ background: '#111', color: 'white', borderBottom: '1px solid #222' }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '90px' }}>
                {/* Logo */}
                <Link to="/" className="logo" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
                    <div style={{ background: '#FF9F1C', color: '#111', fontWeight: 'bold', fontSize: '1.5rem', padding: '5px 10px', borderRadius: '4px' }}>BTS</div>
                    <div style={{ display: 'flex', flexDirection: 'column', lineHeight: '1' }}>
                        <span style={{ fontSize: '1.4rem', fontWeight: 700, fontFamily: 'Oswald', letterSpacing: '1px' }}>EARTH MOVERS</span>
                        <span style={{ fontSize: '0.7rem', color: '#888', textTransform: 'uppercase', letterSpacing: '2px' }}>Equipment Rentals</span>
                    </div>
                </Link>

                {/* Mobile Menu Icon */}
                <div className="mobile-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)} style={{ display: 'none', cursor: 'pointer' }}>
                    {isMenuOpen ? <X color="#FF9F1C" /> : <Menu color="#FF9F1C" />}
                </div>

                {/* Desktop Nav */}
                <nav className={`nav-links ${isMenuOpen ? 'active' : ''}`} style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
                    <Link to="/" className="nav-link" style={{ color: 'white' }} onClick={() => setIsMenuOpen(false)}>{t('nav.home')}</Link>
                    <Link to="/equipment" className="nav-link" style={{ color: 'white' }} onClick={() => setIsMenuOpen(false)}>{t('nav.equipment')}</Link>
                    <Link to="/about" className="nav-link" style={{ color: 'white' }} onClick={() => setIsMenuOpen(false)}>{t('nav.about')}</Link>
                    <Link to="/contact" className="nav-link" style={{ color: 'white' }} onClick={() => setIsMenuOpen(false)}>{t('nav.contact')}</Link>

                    <button onClick={toggleLang} style={{ background: 'transparent', border: '1px solid #444', color: '#ccc', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <Globe size={16} />
                        {lang === 'en' ? 'TA' : 'EN'}
                    </button>

                    <Link to="/booking" className="btn" onClick={() => setIsMenuOpen(false)} style={{ padding: '10px 24px' }}>{t('nav.book')}</Link>
                </nav>
            </div>
            <style>{`
                @media (max-width: 900px) {
                    .mobile-menu-btn { display: block !important; }
                    .nav-links {
                        position: fixed;
                        right: -100%;
                        top: 90px;
                        height: calc(100vh - 90px);
                        background-color: #111;
                        flex-direction: column;
                        width: 100%;
                        text-align: center;
                        padding-top: 3rem;
                        transition: right 0.3s;
                        z-index: 999;
                    }
                    .nav-links.active { right: 0; }
                }
            `}</style>
        </header>
    );
};

export default Navbar;
