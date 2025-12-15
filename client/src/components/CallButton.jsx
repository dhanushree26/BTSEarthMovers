import React from 'react';
import { Phone } from 'lucide-react';

const CallButton = () => {
    return (
        <a
            href="tel:5551234567"
            style={{
                position: 'fixed',
                bottom: '30px',
                right: '30px',
                background: '#FF9F1C',
                color: '#111',
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1000,
                transition: 'transform 0.3s'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
            <Phone size={28} />
        </a>
    );
};

export default CallButton;
