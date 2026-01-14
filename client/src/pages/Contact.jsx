import { useLanguage } from '../context/LanguageContext';
import { Phone, MapPin } from 'lucide-react';
import './Contact.css';

const Contact = () => {
    const { t } = useLanguage();

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Thanks! We'll call you back.");
    };

    return (
        <div>
            {/* Header */}
            {/* <div className="contact-header" style={{ background: '#111', padding: '4rem 0', textAlign: 'center', color: 'white' }}>
                <h1>{t('nav.contact')}</h1>
                <p style={{ color: '#ccc' }}>Get in touch with our team</p>
            </div> */}

            <div className="section-padding container">
                <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '4rem' }}>
                    {/* Info */}
                    <div className="contact-info-section">
                        <h3 style={{ marginBottom: '2rem', borderBottom: '3px solid #FF9F1C', display: 'inline-block', paddingBottom: '5px' }}>{t('common.contactInfo')}</h3>

                        <div className="contact-info-item" style={{ display: 'flex', marginBottom: '2rem', gap: '1.5rem' }}>
                            <div className="contact-icon-box" style={{ background: '#FFF4E0', padding: '15px', borderRadius: '8px', height: 'fit-content' }}>
                                <MapPin size={24} color="#FF9F1C" />
                            </div>
                            <div>
                                <h4 style={{ margin: 0, fontSize: '1.1rem' }}>Address</h4>
                                <p className="contact-text" style={{ color: '#666' }}>{t('common.address')}</p>
                            </div>
                        </div>

                        <div className="contact-info-item" style={{ display: 'flex', marginBottom: '2rem', gap: '1.5rem' }}>
                            <div className="contact-icon-box" style={{ background: '#FFF4E0', padding: '15px', borderRadius: '8px', height: 'fit-content' }}>
                                <Phone size={24} color="#FF9F1C" />
                            </div>
                            <div>
                                <h4 style={{ margin: 0, fontSize: '1.1rem' }}>Phone</h4>
                                <p className="contact-text" style={{ color: '#666' }}>{t('common.phone')}</p>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="contact-form" style={{ background: 'white', padding: '2.5rem', borderRadius: '8px', boxShadow: '0 5px 20px rgba(0,0,0,0.05)', borderTop: '4px solid #FF9F1C' }}>
                        <h3 style={{ marginBottom: '1.5rem' }}>Send Message</h3>
                        <div className="form-group">
                            <label className="form-label">{t('booking.name')}</label>
                            <input type="text" className="form-control" required />
                        </div>
                        <div className="form-group">
                            <label className="form-label">{t('booking.email')}</label>
                            <input type="email" className="form-control" required />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Message</label>
                            <textarea rows="4" className="form-control" required></textarea>
                        </div>
                        <button type="submit" className="btn contact-submit-btn" style={{ width: '100%' }}>Send Message</button>
                    </form>
                </div>
            </div>

            {/* Map */}
            <div className="contact-map" style={{ height: '400px', width: '100%', filter: 'grayscale(100%)' }}>
                <iframe
                    title="Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.0!2d77.05207!3d11.0554192!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba857c99b8f30bd%3A0x109369aaaa6240b!2sBTS%20earth%20movers!5e0!3m2!1sen!2sin!4v1614234567890!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                ></iframe>
            </div>
        </div>
    );
};

export default Contact;
