import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { equipmentData } from '../data';
import { Filter } from 'lucide-react';

const Equipment = () => {
    const { t } = useLanguage();
    const [filter, setFilter] = useState('all');

    const filteredData = filter === 'all'
        ? equipmentData
        : equipmentData.filter(item => item.type === filter);

    const categories = ['all', 'bulldozer', 'excavator', 'grader', 'dump-truck', 'crane', 'loader'];

    return (
        <div style={{ padding: '2rem 0', minHeight: '80vh', background: '#f9f9f9' }}>
            <div className="container">
                <div className="text-center" style={{ marginBottom: '2rem' }}>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{t('equipment.title')}</h1>
                    <p style={{ color: '#666' }}>{t('equipment.subtitle')}</p>
                </div>

                {/* Mobile Friendly Filter Bar */}
                <div style={{
                    marginBottom: '2rem',
                    padding: '10px 0',
                    overflowX: 'auto',
                    whiteSpace: 'nowrap',
                    WebkitOverflowScrolling: 'touch', // Smooth scroll on iOS
                    display: 'flex',
                    gap: '12px',
                    paddingBottom: '15px', // Space for scrollbar
                    scrollbarWidth: 'none' // Hide scrollbar Firefox
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#888', marginRight: '5px' }}>
                        <Filter size={18} />
                        <small>Filters:</small>
                    </div>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            style={{
                                display: 'inline-block',
                                padding: '10px 20px',
                                background: filter === cat ? '#FF9F1C' : '#fff',
                                color: filter === cat ? '#111' : '#555',
                                border: filter === cat ? '1px solid #FF9F1C' : '1px solid #ddd',
                                borderRadius: '30px',
                                cursor: 'pointer',
                                textTransform: 'capitalize',
                                fontWeight: filter === cat ? 'bold' : '500',
                                boxShadow: filter === cat ? '0 4px 10px rgba(255, 159, 28, 0.3)' : '0 2px 5px rgba(0,0,0,0.05)',
                                transition: 'all 0.3s',
                                flexShrink: 0 // Prevent shrinking
                            }}
                        >
                            {cat === 'all' ? t('equipment.filterAll') : cat.replace('-', ' ')}
                        </button>
                    ))}
                </div>

                {/* Responsive Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                    gap: '2rem'
                }}>
                    {filteredData.map(item => (
                        <div key={item.id} className="card-hover" style={{
                            border: 'none',
                            background: '#fff',
                            borderRadius: '12px',
                            overflow: 'hidden',
                            boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
                            display: 'flex',
                            flexDirection: 'column'
                        }}>
                            <div style={{ position: 'relative' }}>
                                <img src={item.image} alt={item.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                                <span style={{
                                    position: 'absolute',
                                    bottom: '10px',
                                    left: '10px',
                                    background: 'rgba(0,0,0,0.7)',
                                    color: '#fff',
                                    padding: '4px 10px',
                                    borderRadius: '4px',
                                    fontSize: '0.75rem',
                                    textTransform: 'uppercase',
                                    fontWeight: 'bold',
                                    borderLeft: '3px solid #FF9F1C'
                                }}>
                                    {item.type}
                                </span>
                            </div>

                            <div style={{ padding: '1.5rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
                                    <h3 style={{ fontSize: '1.25rem', margin: 0 }}>{item.name}</h3>
                                </div>
                                <p style={{ color: '#666', fontSize: '0.95rem', marginBottom: '1.5rem', flexGrow: 1, lineHeight: '1.5' }}>{item.shortDesc}</p>

                                <div style={{
                                    background: '#F9F9F9',
                                    padding: '10px',
                                    borderRadius: '8px',
                                    marginBottom: '1.5rem',
                                    fontSize: '0.85rem',
                                    color: '#555',
                                    display: 'grid',
                                    gridTemplateColumns: '1fr 1fr',
                                    gap: '10px'
                                }}>
                                    {Object.entries(item.specs).slice(0, 2).map(([k, v]) => (
                                        <div key={k}>
                                            <span style={{ display: 'block', color: '#aaa', fontSize: '0.75rem', textTransform: 'uppercase' }}>{k}</span>
                                            <span style={{ fontWeight: 'bold', color: '#333' }}>{v}</span>
                                        </div>
                                    ))}
                                </div>

                                <Link to={`/booking?id=${item.id}`} className="btn" style={{ textAlign: 'center', width: '100%', padding: '12px', borderRadius: '8px' }}>
                                    {t('equipment.getQuote')}
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Equipment;
