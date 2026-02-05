'use client';

import React, { useState, useEffect } from 'react';

export const ThemeToggle: React.FC = () => {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        // Check for saved theme preference or default to light
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
        setIsDark(initialTheme === 'dark');
        document.documentElement.setAttribute('data-theme', initialTheme);
    }, []);

    const toggleTheme = () => {
        const newTheme = isDark ? 'light' : 'dark';
        setIsDark(!isDark);
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    };

    return (
        <button
            onClick={toggleTheme}
            className="bg-[var(--accent-yellow)] border-brutal shadow-brutal px-4 py-2 brutal-hover font-black uppercase text-sm hover:bg-[var(--accent-cyan)] transition-colors duration-300"
            aria-label="Toggle theme"
        >
            {isDark ? '☀️ LIGHT' : '🌙 DARK'}
        </button>
    );
};
