import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { useLanguage } from '../context/LanguageContext';
import { MessageCircle, X, Send } from 'lucide-react';

const socket = io('http://localhost:3001');

const ChatWidget = () => {
    const { t } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [sessionId] = useState(() => localStorage.getItem('chatSessionId') || Math.random().toString(36).substr(2, 9));

    const messagesEndRef = useRef(null);

    useEffect(() => {
        localStorage.setItem('chatSessionId', sessionId);
        socket.emit('join-session', sessionId);

        // Load history? (Optional, skipping for MVP complexity)

        socket.on('receive-message', (msg) => {
            setMessages((prev) => [...prev, msg]);
        });

        return () => {
            socket.off('receive-message');
        };
    }, [sessionId]);

    useEffect(() => {
        if (isOpen) {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, isOpen]);

    const sendMessage = (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const msgData = {
            sessionId,
            sender: 'user',
            text: input,
            timestamp: new Date()
        };

        // Optimistic UI updates are risky with socket if not careful, but okay here
        socket.emit('send-message', msgData);
        // We wait for server echo to add to list (simpler sync)

        setInput('');
    };

    return (
        <div className="chat-widget">
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#FFD700', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.3)' }}
                >
                    <MessageCircle size={30} color="#1a1a1a" />
                </button>
            )}

            {isOpen && (
                <div className="chat-window">
                    <div className="chat-header">
                        <span>{t('chat.header')}</span>
                        <X size={20} style={{ cursor: 'pointer' }} onClick={() => setIsOpen(false)} />
                    </div>
                    <div className="chat-messages">
                        {messages.length === 0 && <p style={{ textAlign: 'center', color: '#888', marginTop: '20px' }}>How can we help you?</p>}
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`msg ${msg.sender === 'user' ? 'user' : 'admin'}`}>
                                {msg.text}
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                    <form className="chat-input-area" onSubmit={sendMessage}>
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder={t('chat.placeholder')}
                            style={{ flexGrow: 1, border: 'none', outline: 'none', padding: '5px' }}
                        />
                        <button type="submit" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#FFD700' }}>
                            <Send size={20} />
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ChatWidget;
