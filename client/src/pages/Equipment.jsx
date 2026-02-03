import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { equipmentData } from '../data';
import { Filter, X } from 'lucide-react';
import './Equipment.css';

const Equipment = () => {
    const { t } = useLanguage();
    const [searchParams] = useSearchParams();
    const [filter, setFilter] = useState('all');
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

    // Set filter from URL parameter on mount
    useEffect(() => {
        const urlFilter = searchParams.get('filter');
        if (urlFilter) {
            setFilter(urlFilter);
        }
    }, [searchParams]);

    const filteredData = filter === 'all'
        ? equipmentData
        : equipmentData.filter(item => {
            if (filter === 'compactor-roller') {
                return item.type === 'compactor' || item.type === 'roller';
            }
            return item.type === filter;
        });

    const categories = ['all', 'excavator', 'loader', 'compactor-roller', 'dozer', 'skid-steer', 'crane', 'trailer', 'tipper'];

    // Handle mobile filter selection
    const handleMobileFilterSelect = (cat) => {
        setFilter(cat);
        setIsMobileFilterOpen(false);
    };

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isMobileFilterOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        // Cleanup on unmount
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMobileFilterOpen]);

    // Close modal when clicking outside
    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            setIsMobileFilterOpen(false);
        }
    };

    return (
        <div style={{ padding: '2rem 0', minHeight: '80vh', background: '#f9f9f9' }}>
            <div className="container">
                <div className="text-center" style={{ marginBottom: '2rem' }}>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Heavy Construction Equipment Rental Services</h1>
                    <p style={{ color: '#666', maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem' }}>
                        Modern fleet of excavators, JCBs, compactors, and earthmoving machinery available for infrastructure projects across Tamil Nadu. Professional equipment rental services with 24/7 support and nationwide project capability.
                    </p>
                    
                    {/* Catalog Download Button */}
                    {/* <div style={{ marginTop: '1.5rem' }}>
                        <a 
                            href="/Catlog.pdf" 
                            download="BTS-Earth-Movers-Equipment-Catalog.pdf"
                            className="btn"
                            style={{ 
                                display: 'inline-flex', 
                                alignItems: 'center', 
                                gap: '8px',
                                backgroundColor: '#FF9F1C',
                                color: '#111',
                                padding: '12px 24px',
                                borderRadius: '6px',
                                textDecoration: 'none',
                                fontWeight: 'bold',
                                fontSize: '1rem',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseOver={(e) => {
                                e.target.style.backgroundColor = '#E08C1F';
                                e.target.style.transform = 'translateY(-2px)';
                            }}
                            onMouseOut={(e) => {
                                e.target.style.backgroundColor = '#FF9F1C';
                                e.target.style.transform = 'translateY(0)';
                            }}
                        >
                            📄 Download Equipment Catalog
                        </a>
                    </div> */}
                </div>

                {/* Desktop Filter Bar */}
                <div className="equipment-filters desktop-filters" style={{
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
                            className="equipment-filter-button"
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
                            {cat === 'all' ? t('equipment.filterAll') : 
                             cat === 'compactor-roller' ? 'Compactor / Roller' :
                             cat === 'skid-steer' ? 'Skid Steer' :
                             cat.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </button>
                    ))}
                </div>

                {/* Mobile Filter Button */}
                <div className="mobile-filter-trigger" style={{ marginBottom: '2rem' }}>
                    <button
                        onClick={() => setIsMobileFilterOpen(true)}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '12px 20px',
                            background: '#FF9F1C',
                            color: '#111',
                            border: 'none',
                            borderRadius: '30px',
                            cursor: 'pointer',
                            fontWeight: '600',
                            fontSize: '0.9rem',
                            boxShadow: '0 4px 10px rgba(255, 159, 28, 0.3)',
                            transition: 'all 0.3s'
                        }}
                    >
                        <Filter size={18} />
                        Filter Equipment
                    </button>
                </div>

                {/* Mobile Filter Modal */}
                {isMobileFilterOpen && (
                    <div 
                        className="mobile-filter-overlay"
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'rgba(0, 0, 0, 0.5)',
                            zIndex: 1000,
                            display: 'flex',
                            alignItems: 'flex-end',
                            justifyContent: 'center'
                        }}
                        onClick={handleOverlayClick}
                    >
                        <div 
                            className="mobile-filter-panel"
                            style={{
                                background: 'white',
                                borderRadius: '20px 20px 0 0',
                                padding: '1.5rem',
                                width: '100%',
                                maxHeight: '70vh',
                                overflowY: 'auto',
                                animation: 'slideUp 0.3s ease-out'
                            }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Modal Header */}
                            <div style={{ 
                                display: 'flex', 
                                justifyContent: 'space-between', 
                                alignItems: 'center', 
                                marginBottom: '1.5rem',
                                paddingBottom: '1rem',
                                borderBottom: '1px solid #eee'
                            }}>
                                <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: '600' }}>Filter Equipment</h3>
                                <button
                                    onClick={() => setIsMobileFilterOpen(false)}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        padding: '8px',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <X size={24} color="#666" />
                                </button>
                            </div>

                            {/* Filter Options */}
                            <div style={{ display: 'grid', gap: '12px' }}>
                                {categories.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => handleMobileFilterSelect(cat)}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            padding: '16px 20px',
                                            background: filter === cat ? '#FFF4E0' : '#fff',
                                            color: filter === cat ? '#FF9F1C' : '#555',
                                            border: filter === cat ? '2px solid #FF9F1C' : '1px solid #ddd',
                                            borderRadius: '12px',
                                            cursor: 'pointer',
                                            fontWeight: filter === cat ? '600' : '500',
                                            fontSize: '1rem',
                                            transition: 'all 0.3s',
                                            textAlign: 'left'
                                        }}
                                    >
                                        <span>
                                            {cat === 'all' ? t('equipment.filterAll') : 
                                             cat === 'compactor-roller' ? 'Compactor / Roller' :
                                             cat === 'skid-steer' ? 'Skid Steer' :
                                             cat.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                        </span>
                                        {filter === cat && (
                                            <div style={{
                                                width: '20px',
                                                height: '20px',
                                                borderRadius: '50%',
                                                background: '#FF9F1C',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}>
                                                <div style={{
                                                    width: '8px',
                                                    height: '8px',
                                                    borderRadius: '50%',
                                                    background: 'white'
                                                }} />
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

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
                                <img src={item.image} alt={item.alt || item.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
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
