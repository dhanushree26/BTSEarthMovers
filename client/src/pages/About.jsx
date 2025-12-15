import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const About = () => {
    const { t } = useLanguage();

    return (
        <div className="section-padding container">
            <div className="text-center" style={{ marginBottom: '3rem' }}>
                <h1>{t('nav.about')}</h1>
            </div>

            <div style={{ maxWidth: '800px', margin: '0 auto', fontSize: '1.1rem', lineHeight: '1.8' }}>
                <p style={{ marginBottom: '1.5rem' }}>
                    <strong>BTS Earth Movers</strong> has been a trusted name in the construction equipment rental industry for over a decade. Founded with a mission to provide high-quality heavy machinery to contractors and developers across the region, we have grown into a premier provider of earthmoving solutions.
                </p>
                <p style={{ marginBottom: '1.5rem' }}>
                    Our fleet consists of the latest models from top manufacturers like CAT, Komatsu, and JCB. We take pride in our rigorous maintenance schedule, ensuring that every machine you rent performs at its peak, minimizing downtime on your project.
                </p>
                <p>
                    Whether you are building a skyscraper, paving a highway, or landscaping a residential complex, our team of experts is here to assist you in selecting the right equipment for the job. We believe in building strong foundations—both for your projects and our client relationships.
                </p>

                <div style={{ marginTop: '3rem', display: 'flex', gap: '2rem', justifyContent: 'center', textAlign: 'center' }}>
                    <div>
                        <h3 style={{ fontSize: '2.5rem', color: '#FFD700', marginBottom: '0.5rem' }}>10+</h3>
                        <p>Years Experience</p>
                    </div>
                    <div>
                        <h3 style={{ fontSize: '2.5rem', color: '#FFD700', marginBottom: '0.5rem' }}>50+</h3>
                        <p>Heavy Machines</p>
                    </div>
                    <div>
                        <h3 style={{ fontSize: '2.5rem', color: '#FFD700', marginBottom: '0.5rem' }}>500+</h3>
                        <p>Happy Clients</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
