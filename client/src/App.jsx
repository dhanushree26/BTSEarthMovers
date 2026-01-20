import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import CallButton from './components/CallButton';
import Home from './pages/Home';
import Equipment from './pages/Equipment';
import Booking from './pages/Booking';
import Admin from './pages/Admin';
import About from './pages/About';
import Contact from './pages/Contact';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import { Facebook, Twitter, Linkedin, ChevronRight } from 'lucide-react';
import './App.css';

function App() {
  return (
    <div className="App" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <ScrollToTop />
      <Navbar />
      <div style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/equipment" element={<Equipment />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>

      <CallButton />

      {/* Footer */}
      <footer className="app-footer">
        <div className="container">
          <div className="footer-grid">
            {/* Brand */}
            <div>
              <div className="footer-brand-logo">
                <div className="footer-brand-badge">BTS</div>
                <span className="footer-brand-text">EARTH MOVERS</span>
              </div>
              <p className="footer-description">Leading earthmoving contractors in Tamil Nadu with headquarters in Coimbatore. Professional excavation, site development, and heavy equipment rental services across India since 2010.</p>
              {/* <div className="footer-social">
                <div className="footer-social-icon"><Facebook size={18} color="white" /></div>
                <div className="footer-social-icon"><Twitter size={18} color="white" /></div>
                <div className="footer-social-icon"><Linkedin size={18} color="white" /></div>
              </div> */}
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="footer-heading">Quick Links</h4>
              <ul className="footer-links">
                <li><ChevronRight size={16} style={{ display: 'inline', marginRight: '5px', verticalAlign: 'middle' }} /><Link to="/equipment">Equipment Gallery</Link></li>
                <li><ChevronRight size={16} style={{ display: 'inline', marginRight: '5px', verticalAlign: 'middle' }} /><Link to="/booking">Book Equipment</Link></li>
                <li><ChevronRight size={16} style={{ display: 'inline', marginRight: '5px', verticalAlign: 'middle' }} /><Link to="/about">About Us</Link></li>
                <li><ChevronRight size={16} style={{ display: 'inline', marginRight: '5px', verticalAlign: 'middle' }} /><Link to="/contact">Contact</Link></li>
              </ul>
            </div>

            {/* Equipment */}
            <div>
              <h4 className="footer-heading">Equipment Rental</h4>
              <ul className="footer-links">
                <li><ChevronRight size={16} style={{ display: 'inline', marginRight: '5px', verticalAlign: 'middle' }} /><Link to="/equipment?filter=excavator">Excavator Rental </Link></li>
                <li><ChevronRight size={16} style={{ display: 'inline', marginRight: '5px', verticalAlign: 'middle' }} /><Link to="/equipment?filter=loader">JCB Loader Hire Tamil Nadu</Link></li>
                <li><ChevronRight size={16} style={{ display: 'inline', marginRight: '5px', verticalAlign: 'middle' }} /><Link to="/equipment?filter=compactor">Soil Compactor Rental</Link></li>
                <li><ChevronRight size={16} style={{ display: 'inline', marginRight: '5px', verticalAlign: 'middle' }} /><Link to="/equipment?filter=skid-steer">Skid Steer Rental</Link></li>
                <li><ChevronRight size={16} style={{ display: 'inline', marginRight: '5px', verticalAlign: 'middle' }} /><Link to="/equipment?filter=dozer">Bulldozer Hire Tamilnadu</Link></li>
                <li><ChevronRight size={16} style={{ display: 'inline', marginRight: '5px', verticalAlign: 'middle' }} /><Link to="/equipment?filter=crane">Crane Rental Tamil Nadu</Link></li>
                <li><ChevronRight size={16} style={{ display: 'inline', marginRight: '5px', verticalAlign: 'middle' }} /><a href="/Catlog.pdf" download="BTS-Earth-Movers-Catalog.pdf" style={{ color: '#FF9F1C', textDecoration: 'none', fontWeight: 'bold' }}>📄 Download Equipment Catalog</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="footer-heading">Contact Info</h4>
              <p className="footer-contact-text">No.1, Nallasiriar Street, Periyar Nagar,<br />Nehru Nagar West, Thottipalayam,<br />Tamil Nadu 641014</p>
              <p className="footer-phone">(+91) 90420 07695</p>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} BTS Earth Movers. All rights reserved.<br />Made with <span style={{ color: 'red' }}>❤</span> by <a href="https://aethrastudio.in" target="_blank" rel="noopener noreferrer">AethraStudio</a></p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
