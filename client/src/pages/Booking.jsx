import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { useLanguage } from '../context/LanguageContext';
import { equipmentData } from '../data';
import { CheckCircle, AlertCircle } from 'lucide-react';

const Booking = () => {
    const { t, lang } = useLanguage();
    const [searchParams] = useSearchParams();
    const preSelectId = searchParams.get('id');

    const [form, setForm] = useState({
        customerName: '',
        phone: '',
        email: '',
        equipmentId: preSelectId || '',
        startDate: '',
        endDate: '',
        language: lang
    });

    const [status, setStatus] = useState('idle'); // idle, submitting, success, error
    const [validationMsg, setValidationMsg] = useState('');

    useEffect(() => {
        setForm(f => ({ ...f, language: lang }));
    }, [lang]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setValidationMsg(''); // Clear error on typing
    };

    const validateForm = () => {
        const phoneRegex = /^\d{10}$/; // Simple 10-digit validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!phoneRegex.test(form.phone.replace(/\D/g, ''))) {
            return "Please enter a valid 10-digit mobile number.";
        }
        if (form.email && !emailRegex.test(form.email)) {
            return "Please enter a valid email address.";
        }
        if (!form.startDate || !form.endDate) {
            return "Please select both start and end dates.";
        }
        if (form.startDate > form.endDate) {
            return "End date must be after start date.";
        }
        return null; // Valid
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const error = validateForm();
        if (error) {
            setValidationMsg(error);
            return;
        }

        setStatus('submitting');
        try {
            await axios.post('http://localhost:3001/api/bookings', form);
            setStatus('success');
        } catch (err) {
            console.error(err);
            setStatus('error');
        }
    };

    if (status === 'success') {
        return (
            <div className="section-padding container text-center">
                <div style={{ background: '#dff0d8', color: '#3c763d', padding: '3rem', borderRadius: '8px', border: '1px solid #d6e9c6', display: 'inline-block', maxWidth: '500px' }}>
                    <CheckCircle size={64} style={{ marginBottom: '1.5rem', color: '#28a745' }} />
                    <h2 style={{ marginBottom: '1rem' }}>{t('booking.success')}</h2>
                    <p style={{ fontSize: '1.1rem' }}>Your quote request has been received. Our team will verify your details and contact you shortly at <strong>{form.phone}</strong>.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="section-padding container">
            <div className="text-center" style={{ marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '3rem', color: '#111' }}>{t('booking.title')}</h1>
                <p style={{ color: '#666' }}>{t('booking.subtitle')}</p>
            </div>

            <form onSubmit={handleSubmit} style={{ maxWidth: '700px', margin: '0 auto', background: 'white', padding: '3rem', borderRadius: '8px', boxShadow: '0 5px 25px rgba(0,0,0,0.05)', borderTop: '4px solid #FF9F1C' }}>

                {validationMsg && (
                    <div style={{ background: '#ffe6e6', color: '#d32f2f', padding: '12px', borderRadius: '4px', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <AlertCircle size={20} />
                        {validationMsg}
                    </div>
                )}

                <div className="form-group">
                    <label className="form-label">{t('booking.machine')}</label>
                    <select name="equipmentId" value={form.equipmentId} onChange={handleChange} className="form-control" required style={{ borderLeft: '4px solid #FF9F1C' }}>
                        <option value="">-- Select Equipment --</option>
                        {equipmentData.map(item => (
                            <option key={item.id} value={item.id}>{item.name} ({item.type})</option>
                        ))}
                    </select>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                    <div className="form-group">
                        <label className="form-label">{t('booking.name')}</label>
                        <input type="text" name="customerName" value={form.customerName} onChange={handleChange} className="form-control" placeholder="John Doe" required />
                    </div>

                    <div className="form-group">
                        <label className="form-label">{t('booking.phone')}</label>
                        <input type="tel" name="phone" value={form.phone} onChange={handleChange} className="form-control" placeholder="9876543210" required />
                        <small style={{ color: '#888' }}>10-digit mobile number</small>
                    </div>
                </div>

                <div className="form-group">
                    <label className="form-label">{t('booking.email')}</label>
                    <input type="email" name="email" value={form.email} onChange={handleChange} className="form-control" placeholder="john@example.com" required />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                    <div className="form-group">
                        <label className="form-label">Start Date</label>
                        <input type="date" name="startDate" value={form.startDate} onChange={handleChange} className="form-control" required min={new Date().toISOString().split('T')[0]} />
                    </div>
                    <div className="form-group">
                        <label className="form-label">End Date</label>
                        <input type="date" name="endDate" value={form.endDate} onChange={handleChange} className="form-control" required min={form.startDate} />
                    </div>
                </div>

                <button type="submit" className="btn" style={{ width: '100%', marginTop: '1.5rem', padding: '16px' }} disabled={status === 'submitting'}>
                    {status === 'submitting' ? 'Processing...' : 'Submit Quote Request'}
                </button>
            </form>
        </div>
    );
};

export default Booking;
