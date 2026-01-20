import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const About = () => {
  const { t } = useLanguage();

  return (
    <section
      style={{
        padding: '4rem 1rem',
        fontFamily: "'Montserrat', sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '0 1rem', // LEFT & RIGHT SPACING
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ fontWeight: 600, letterSpacing: '0.5px' }}>
            About BTS Earth Movers - Leading Earthmoving Contractors in Tamil Nadu
          </h1>
        </div>

        {/* CONTENT */}
        <div
          style={{
            maxWidth: '800px',
            margin: '0 auto',
            fontSize: '1.05rem',
            lineHeight: '1.9',
            color: '#444',
          }}
        >
          <p style={{ marginBottom: '1.5rem' }}>
            <strong style={{ color: '#111' }}>BTS Earth Movers</strong> is Tamil Nadu's
            trusted earthmoving contractor with headquarters in Coimbatore. For over 15 years, 
            we have provided high-quality heavy machinery and excavation services to contractors 
            and developers across Tamil Nadu. We have grown into the region's premier provider 
            of earthmoving solutions with capability to execute projects anywhere in India.
          </p>

          <p style={{ marginBottom: '1.5rem' }}>
            Our extensive fleet consists of modern excavators, JCB loaders, soil compactors, 
            and earthmoving equipment from top manufacturers like CAT, Komatsu, and JCB. 
            With rigorous maintenance schedules and experienced operators, we ensure that every 
            machine performs at peak efficiency, minimizing project downtime and maximizing productivity.
          </p>

          <p style={{ marginBottom: '1.5rem' }}>
            Whether you are developing commercial complexes, constructing highways, or executing 
            residential projects, our team of experts assists you in selecting the right 
            earthmoving equipment and services. We believe in building strong foundations—both 
            for your construction projects and our long-term client relationships throughout India.
          </p>

          <p>
            From mini excavators for urban construction to heavy-duty bulldozers for large-scale 
            infrastructure projects, BTS Earth Movers is your reliable partner for comprehensive 
            earthmoving and excavation services across Tamil Nadu and beyond.
          </p>

          {/* STATS */}
          <div
            style={{
              marginTop: '3rem',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '2rem',
              textAlign: 'center',
            }}
          >
            <div>
              <div
                style={{
                  fontSize: '2.4rem',
                  fontWeight: 600,
                  color: '#FF9F1C',
                }}
              >
                15+
              </div>
              <p style={{ color: '#666' }}>Years Serving Coimbatore</p>
            </div>

            <div>
              <div
                style={{
                  fontSize: '2.4rem',
                  fontWeight: 600,
                  color: '#FF9F1C',
                }}
              >
                60+
              </div>
              <p style={{ color: '#666' }}>Heavy Machines Fleet</p>
            </div>

            <div>
              <div
                style={{
                  fontSize: '2.4rem',
                  fontWeight: 600,
                  color: '#FF9F1C',
                }}
              >
                1000+
              </div>
              <p style={{ color: '#666' }}>Projects Completed</p>
            </div>

            <div>
              <div
                style={{
                  fontSize: '2.4rem',
                  fontWeight: 600,
                  color: '#FF9F1C',
                }}
              >
                24/7
              </div>
              <p style={{ color: '#666' }}>Support Available</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
