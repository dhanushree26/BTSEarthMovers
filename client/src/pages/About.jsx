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
        {/* TITLE */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ fontWeight: 600, letterSpacing: '0.5px' }}>
            {t('nav.about')}
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
            <strong style={{ color: '#111' }}>BTS Earth Movers</strong> has been a
            trusted name in the construction equipment rental industry for over a
            decade. Founded with a mission to provide high-quality heavy machinery
            to contractors and developers across the region, we have grown into a
            premier provider of earthmoving solutions.
          </p>

          <p style={{ marginBottom: '1.5rem' }}>
            Our fleet consists of the latest models from top manufacturers like
            CAT, Komatsu, and JCB. We take pride in our rigorous maintenance
            schedule, ensuring that every machine you rent performs at its peak,
            minimizing downtime on your project.
          </p>

          <p>
            Whether you are building a skyscraper, paving a highway, or
            landscaping a residential complex, our team of experts is here to
            assist you in selecting the right equipment for the job. We believe in
            building strong foundations—both for your projects and our client
            relationships.
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
                  color: '#FFD700',
                }}
              >
                10+
              </div>
              <p style={{ color: '#666' }}>Years Experience</p>
            </div>

            <div>
              <div
                style={{
                  fontSize: '2.4rem',
                  fontWeight: 600,
                  color: '#FFD700',
                }}
              >
                50+
              </div>
              <p style={{ color: '#666' }}>Heavy Machines</p>
            </div>

            <div>
              <div
                style={{
                  fontSize: '2.4rem',
                  fontWeight: 600,
                  color: '#FFD700',
                }}
              >
                500+
              </div>
              <p style={{ color: '#666' }}>Happy Clients</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
