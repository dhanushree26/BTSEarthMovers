import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLanguage } from '../context/LanguageContext';
import { Shield, Lock, LayoutDashboard, Phone, CheckCircle, Clock } from 'lucide-react';

const Admin = () => {
    const [auth, setAuth] = useState(false);
    const [loginForm, setLoginForm] = useState({ username: '', password: '' });
    const [bookings, setBookings] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        if (auth) {
            fetchBookings();
            const interval = setInterval(fetchBookings, 5000); // Polling for simplicity
            return () => clearInterval(interval);
        }
    }, [auth]);

    const fetchBookings = async () => {
        try {
            const res = await axios.get('http://localhost:3001/api/bookings');
            setBookings(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const updateStatus = async (id, newStatus) => {
        try {
            await axios.put(`http://localhost:3001/api/bookings/${id}/status`, { status: newStatus });
            fetchBookings(); // Refresh immediately
        } catch (err) {
            console.error("Failed to update status", err);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:3001/api/login', loginForm);
            if (res.data.success) {
                setAuth(true);
                setError('');
            }
        } catch (err) {
            setError('Invalid credentials');
        }
    };

    if (!auth) {
        return (
            <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f4f4f4' }}>
                <form onSubmit={handleLogin} style={{ background: 'white', padding: '3rem', borderRadius: '8px', width: '100%', maxWidth: '400px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', borderTop: '4px solid #FF9F1C' }}>
                    <div className="text-center" style={{ marginBottom: '2rem' }}>
                        <div style={{ background: '#FFF4E0', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto' }}>
                            <Lock color="#FF9F1C" size={30} />
                        </div>
                        <h2>Admin Portal</h2>
                        <p style={{ color: '#666' }}>Secure login required</p>
                    </div>
                    {error && <div style={{ background: '#ffe6e6', color: '#d32f2f', padding: '10px', borderRadius: '4px', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}
                    <div className="form-group">
                        <label className="form-label">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            value={loginForm.username}
                            onChange={e => setLoginForm({ ...loginForm, username: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            value={loginForm.password}
                            onChange={e => setLoginForm({ ...loginForm, password: e.target.value })}
                        />
                    </div>
                    <button type="submit" className="btn" style={{ width: '100%' }}>Login to Dashboard</button>
                </form>
            </div>
        );
    }

    return (
        <div className="section-padding container">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '3rem', borderBottom: '1px solid #ddd', paddingBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <LayoutDashboard size={32} color="#FF9F1C" />
                    <h1 style={{ margin: 0 }}>Dashboard</h1>
                </div>
                <button onClick={() => setAuth(false)} className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>Logout</button>
            </div>

            <div style={{ background: 'white', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
                <div style={{ padding: '1.5rem', background: '#222', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ margin: 0, color: 'white' }}>Quote Requests</h3>
                    <span style={{ background: '#FF9F1C', color: '#111', padding: '4px 8px', borderRadius: '4px', fontWeight: 'bold' }}>{bookings.length} Total</span>
                </div>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ background: '#f9f9f9', textAlign: 'left', borderBottom: '1px solid #ddd' }}>
                                <th style={{ padding: '15px' }}>ID</th>
                                <th style={{ padding: '15px' }}>Customer</th>
                                <th style={{ padding: '15px' }}>Mobile No.</th>
                                <th style={{ padding: '15px' }}>Equipment</th>
                                <th style={{ padding: '15px' }}>Dates</th>
                                <th style={{ padding: '15px' }}>Action / Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map(book => (
                                <tr key={book.id} style={{ borderBottom: '1px solid #eee' }}>
                                    <td style={{ padding: '15px', color: '#888' }}>#{book.id}</td>

                                    <td style={{ padding: '15px' }}>
                                        <strong>{book.customerName}</strong><br />
                                        <small style={{ color: '#666' }}>{book.email}</small>
                                    </td>

                                    <td style={{ padding: '15px' }}>
                                        <a
                                            href={`tel:${book.phone}`}
                                            onClick={() => updateStatus(book.id, 'Completed')} // Auto-mark completed on call click
                                            style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#007bff', fontWeight: 'bold', textDecoration: 'none' }}
                                        >
                                            <Phone size={16} /> {book.phone}
                                        </a>
                                    </td>

                                    <td style={{ padding: '15px' }}>
                                        <span style={{ background: '#e3f2fd', color: '#0d47a1', padding: '4px 8px', borderRadius: '4px', fontSize: '0.9rem' }}>{book.equipmentId}</span>
                                    </td>

                                    <td style={{ padding: '15px' }}>
                                        {book.startDate} <span style={{ color: '#aaa' }}>to</span> {book.endDate}
                                    </td>

                                    <td style={{ padding: '15px' }}>
                                        {book.status === 'Completed' ? (
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'green', fontWeight: 'bold' }}>
                                                <CheckCircle size={16} /> Completed
                                            </span>
                                        ) : (
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#856404', background: '#ffeeba', padding: '4px 8px', borderRadius: '4px', fontSize: '0.85rem' }}>
                                                    <Clock size={14} /> Pending
                                                </span>
                                                <button
                                                    onClick={() => updateStatus(book.id, 'Completed')}
                                                    className="btn"
                                                    style={{ padding: '5px 10px', fontSize: '0.8rem', background: '#28a745', color: 'white' }}
                                                >
                                                    Verify / Mark Done
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            {bookings.length === 0 && (
                                <tr>
                                    <td colSpan="6" className="text-center" style={{ padding: '3rem', color: '#888' }}>No booking requests found yet.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Admin;
