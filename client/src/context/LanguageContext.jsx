import React, { createContext, useState, useContext, useEffect } from 'react';
import { translations } from '../translations';

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
    const [lang, setLang] = useState('en');

    useEffect(() => {
        const savedLang = localStorage.getItem('appLang');
        if (savedLang) {
            setLang(savedLang);
        }
    }, []);

    const switchLanguage = (code) => {
        setLang(code);
        localStorage.setItem('appLang', code);
    };

    const t = (path) => {
        const keys = path.split('.');
        let current = translations[lang];
        for (let key of keys) {
            if (current[key] === undefined) return path;
            current = current[key];
        }
        return current;
    };

    return (
        <LanguageContext.Provider value={{ lang, switchLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};
