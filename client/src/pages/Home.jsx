import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { equipmentData } from '../data';
import { Star, Truck, Shield, Clock, Award, ArrowRight } from 'lucide-react';
import heroVideo from '../assets/Sunrise_Construction_Site_Cinematic_Video.mp4';

const Home = () => {
    const { t, switchLanguage } = useLanguage();
    const [showLangModal, setShowLangModal] = useState(false);

    // Aggressive Autoplay Fix: Use raw HTML to bypass React attribute hydration issues
    const videoMarkup = {
        __html: `
            <video 
                autoplay 
                loop 
                muted 
                playsinline 
                preload="auto"
                style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; z-index: -2; pointer-events: none;"
            >
                <source src="${heroVideo}" type="video/mp4" />
            </video>
            <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.6); z-index: -1;"></div>
        `
    };

    useEffect(() => {
        if (!localStorage.getItem('appLang')) {
            setShowLangModal(true);
        }
    }, []);

    const selectLang = (lang) => {
        switchLanguage(lang);
        setShowLangModal(false);
    };

    return (
        <div>
            {/* Language Modal */}
            {showLangModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.85)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ background: '#222', padding: '2.5rem', borderRadius: '8px', textAlign: 'center', maxWidth: '400px', border: '1px solid #444', color: 'white' }}>
                        <h2 style={{ marginBottom: '1.5rem', color: '#FF9F1C' }}>Select Language</h2>
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                            <button onClick={() => selectLang('en')} className="btn">English</button>
                            <button onClick={() => selectLang('ta')} className="btn btn-secondary">தமிழ்</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Hero - Titan Style with Video Background */}
            <section style={{
                position: 'relative',
                height: '85vh',
                display: 'flex',
                alignItems: 'center',
                color: 'white',
                overflow: 'hidden'
            }}>
                {/* Raw HTML Video Injection */}
                <div
                    dangerouslySetInnerHTML={videoMarkup}
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}
                />

                <div className="container" style={{ width: '100%', position: 'relative', zIndex: 1 }}>
                    <div style={{ background: '#333', color: '#FF9F1C', display: 'inline-block', padding: '8px 16px', borderRadius: '20px', fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                        Trusted by 500+ Contractors
                    </div>
                    <h1 style={{ fontSize: '4.5rem', lineHeight: '1', marginBottom: '1.5rem', color: 'white', maxWidth: '800px' }}>
                        HEAVY EQUIPMENT <span style={{ color: '#FF9F1C' }}>RENTALS</span>
                    </h1>
                    <p style={{ fontSize: '1.25rem', marginBottom: '2.5rem', maxWidth: '600px', color: '#ddd' }}>
                        {t('hero.subtitle')}
                    </p>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <Link to="/equipment" className="btn" style={{ padding: '16px 32px', fontSize: '1.1rem' }}>
                            Browse Equipment <ArrowRight size={20} style={{ verticalAlign: 'middle', marginLeft: '5px' }} />
                        </Link>
                        <Link to="/booking" className="btn btn-secondary" style={{ padding: '16px 32px', color: 'white', borderColor: 'white' }}>
                            {t('hero.cta2')}
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Icons */}
            <section style={{ padding: '4rem 0', background: '#f4f4f4' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                        {[
                            { icon: Truck, title: "Same-Day Delivery", text: "Get your equipment on-site within hours, not days." },
                            { icon: Shield, title: "Fully Insured", text: "Every rental includes comprehensive insurance coverage." },
                            { icon: Clock, title: "24/7 Support", text: "Round-the-clock technical support for all rentals." },
                            { icon: Award, title: "Premium Fleet", text: "Newest models maintained to manufacturer standards." }
                        ].map((feature, i) => (
                            <div key={i} style={{ background: 'white', padding: '2rem', borderRadius: '8px', textAlign: 'center', boxShadow: '0 5px 15px rgba(0,0,0,0.05)' }}>
                                <div style={{ background: '#FFF4E0', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
                                    <feature.icon color="#FF9F1C" size={30} />
                                </div>
                                <h3>{feature.title}</h3>
                                <p style={{ color: '#666', fontSize: '0.95rem' }}>{feature.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Section */}
            <section className="section-padding">
                <div className="container">
                    <div className="text-center" style={{ marginBottom: '4rem' }}>
                        <p style={{ color: '#FF9F1C', fontWeight: 'bold', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '10px' }}>Our Fleet</p>
                        <h2 style={{ fontSize: '3rem', margin: 0 }}>FEATURED <span style={{ color: '#FF9F1C' }}>EQUIPMENT</span></h2>
                        <p style={{ maxWidth: '600px', margin: '1rem auto 0', color: '#666' }}>Browse our selection of premium construction equipment available for rent.</p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem' }}>
                        {equipmentData.slice(0, 4).map(item => (
                            <div key={item.id} className="card-hover" style={{ border: '1px solid #eee', background: '#fff', borderRadius: '8px', overflow: 'hidden' }}>
                                <div style={{ position: 'relative' }}>
                                    <img src={item.image} alt={item.name} style={{ width: '100%', height: '250px', objectFit: 'cover' }} />
                                    <span style={{ position: 'absolute', top: '15px', left: '15px', background: '#FF9F1C', color: '#111', padding: '4px 12px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                                        {item.type}
                                    </span>
                                </div>
                                <div style={{ padding: '2rem' }}>
                                    <h3>{item.name}</h3>
                                    <p style={{ color: '#666', marginBottom: '1.5rem', lineHeight: '1.6' }}>{item.shortDesc}</p>

                                    <div style={{ background: '#f9f9f9', padding: '1rem', borderRadius: '4px', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between' }}>
                                        <div>
                                            <small style={{ color: '#888', display: 'block' }}>Power</small>
                                            <strong>{item.specs.power || 'N/A'}</strong>
                                        </div>
                                        <div>
                                            <small style={{ color: '#888', display: 'block' }}>Weight</small>
                                            <strong>{item.specs.weight || 'N/A'}</strong>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', gap: '10px' }}>
                                        <Link to={`/equipment`} className="btn btn-secondary" style={{ flex: 1, textAlign: 'center', padding: '10px' }}>View Details</Link>
                                        <Link to={`/booking?id=${item.id}`} className="btn" style={{ flex: 1, textAlign: 'center', padding: '10px' }}>Get Quote</Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center" style={{ marginTop: '4rem' }}>
                        <Link to="/equipment" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', color: '#FF9F1C', fontWeight: 'bold', fontSize: '1.1rem', borderBottom: '2px solid #FF9F1C', paddingBottom: '5px' }}>
                            View All Equipment <ArrowRight size={20} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Testimonials - Dark Theme */}
            <section className="section-padding" style={{ background: '#1A1A1A', color: 'white' }}>
                <div className="container">
                    <div className="text-center" style={{ marginBottom: '4rem' }}>
                        <p style={{ color: '#FF9F1C', fontWeight: 'bold', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '10px' }}>Testimonials</p>
                        <h2 style={{ fontSize: '3rem', margin: 0, color: 'white' }}>WHAT OUR <span style={{ color: '#FF9F1C' }}>CLIENTS SAY</span></h2>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
                        {[
                            { text: "Titan Earth has been our go-to partner for 5 years. Always reliable.", auth: "John D., Project Manager" },
                            { text: "Outstanding service. The D8 bulldozer helped us finish ahead of schedule.", auth: "Sarah L., Site Supervisor" },
                            { text: "Professional team and competitive rates. Highly recommended!", auth: "Mike R., Contractor" }
                        ].map((t, i) => (
                            <div key={i} style={{ background: '#252525', padding: '2.5rem', borderRadius: '8px', borderTop: '4px solid #FF9F1C' }}>
                                <div style={{ color: '#FF9F1C', marginBottom: '1rem', display: 'flex' }}><Star fill="#FF9F1C" size={18} /><Star fill="#FF9F1C" size={18} /><Star fill="#FF9F1C" size={18} /><Star fill="#FF9F1C" size={18} /><Star fill="#FF9F1C" size={18} /></div>
                                <p style={{ fontStyle: 'italic', marginBottom: '1.5rem', fontSize: '1.1rem', color: '#ddd' }}>"{t.text}"</p>
                                <div style={{ fontWeight: 'bold', color: 'white' }}>- {t.auth}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section style={{ background: '#FF9F1C', padding: '4rem 0', textAlign: 'center' }}>
                <div className="container">
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#111' }}>READY TO START YOUR PROJECT?</h2>
                    <p style={{ maxWidth: '700px', margin: '0 auto 2rem', color: '#333', fontSize: '1.1rem' }}>Get a free quote today and see why hundreds of contractors trust us.</p>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                        <Link to="/booking" className="btn" style={{ background: '#111', color: '#FF9F1C' }}>Request a Quote</Link>
                        <Link to="/contact" className="btn" style={{ background: 'transparent', border: '2px solid #111', color: '#111' }}>Contact Us</Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
