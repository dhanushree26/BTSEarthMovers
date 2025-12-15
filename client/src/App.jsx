import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import CallButton from './components/CallButton';
import Home from './pages/Home';
import Equipment from './pages/Equipment';
import Booking from './pages/Booking';
import Admin from './pages/Admin';
import About from './pages/About';
import Contact from './pages/Contact';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

function App() {
  return (
    <div className="App" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/equipment" element={<Equipment />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>

      <CallButton />

      {/* Titan Footer */}
      <footer style={{ background: '#222', color: '#888', padding: '5rem 0 2rem' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>
            {/* Brand */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
                <div style={{ background: '#FF9F1C', color: '#111', fontWeight: 'bold', padding: '5px 10px', borderRadius: '4px' }}>BTS</div>
                <span style={{ fontSize: '1.2rem', fontWeight: 700, fontFamily: 'Oswald', color: 'white' }}>EARTH MOVERS</span>
              </div>
              <p style={{ marginBottom: '1.5rem', lineHeight: '1.8' }}>Your trusted partner for heavy equipment rentals. Serving construction professionals since 2010.</p>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ background: '#333', padding: '10px', borderRadius: '50%' }}><Facebook size={18} color="white" /></div>
                <div style={{ background: '#333', padding: '10px', borderRadius: '50%' }}><Twitter size={18} color="white" /></div>
                <div style={{ background: '#333', padding: '10px', borderRadius: '50%' }}><Linkedin size={18} color="white" /></div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 style={{ color: 'white', marginBottom: '1.5rem' }}>Quick Links</h4>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <li><Link to="/equipment" style={{ color: '#888' }}>Equipment Gallery</Link></li>
                <li><Link to="/booking" style={{ color: '#888' }}>Book Equipment</Link></li>
                <li><Link to="/about" style={{ color: '#888' }}>About Us</Link></li>
                <li><Link to="/contact" style={{ color: '#888' }}>Contact</Link></li>
              </ul>
            </div>

            {/* Equipment */}
            <div>
              <h4 style={{ color: 'white', marginBottom: '1.5rem' }}>Equipment</h4>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <li>Bulldozers</li>
                <li>Excavators</li>
                <li>Motor Graders</li>
                <li>Dump Trucks</li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 style={{ color: 'white', marginBottom: '1.5rem' }}>Contact Us</h4>
              <p style={{ marginBottom: '10px' }}>123 Industrial Boulevard<br />Chennai, TN 600001</p>
              <p style={{ color: '#FF9F1C', fontWeight: 'bold' }}>(555) 123-4567</p>
              <p>info@btsearthmovers.com</p>
            </div>
          </div>

          <div style={{ borderTop: '1px solid #333', paddingTop: '2rem', textAlign: 'center', fontSize: '0.9rem' }}>
            <p>&copy; {new Date().getFullYear()} BTS Earth Movers. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
