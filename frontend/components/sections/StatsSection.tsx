'use client';

import React, { useState, useEffect } from 'react';

const useCounter = (end: number, duration: number = 2000, shouldStart: boolean = false) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!shouldStart) return;

        let startTime: number;
        let animationFrame: number;

        const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);

            setCount(Math.floor(progress * end));

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, [end, duration, shouldStart]);

    return count;
};

export const StatsSection: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [clickedIndex, setClickedIndex] = useState<number | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.3 }
        );

        const section = document.getElementById('stats-section');
        if (section) observer.observe(section);

        return () => observer.disconnect();
    }, []);

    const stats = [
        { value: 0, suffix: '+', label: 'CAMPAIGNS', bg: 'var(--accent-yellow)' },
        { value: 0, suffix: ' ETH', label: 'RAISED', bg: 'var(--accent-cyan)' },
        { value: 100, suffix: '%', label: 'AUDITED', bg: 'var(--accent-pink)' },
        { value: 0, suffix: '%', label: 'FEES', bg: 'var(--accent-lime)' },
    ];

    const handleClick = (index: number) => {
        setClickedIndex(index);
        setTimeout(() => setClickedIndex(null), 300);
    };

    return (
        <section id="stats-section" className="section bg-[var(--bg-primary)]">
            <div className="container mx-auto px-6">
                <div className="mb-16 text-center slide-in-up">
                    <h2 className="font-[family-name:var(--font-space-grotesk)] text-4xl md:text-5xl font-black mb-4">
                        BY THE{' '}
                        <span className="bg-[var(--accent-yellow)] px-4 hover:bg-[var(--accent-cyan)] transition-colors duration-300 cursor-pointer">
                            NUMBERS
                        </span>
                    </h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, index) => {
                        const animatedValue = useCounter(stat.value, 2000, isVisible);

                        return (
                            <div
                                key={index}
                                className={`bg-[var(--bg-secondary)] border-brutal shadow-brutal-lg p-8 text-center brutal-hover cursor-pointer slide-in-up ${clickedIndex === index ? 'shake-brutal' : ''
                                    }`}
                                style={{ animationDelay: `${index * 0.1}s` }}
                                onClick={() => handleClick(index)}
                            >
                                <div
                                    className="inline-block px-4 py-2 mb-4 border-4 border-black transition-transform duration-300 hover:scale-110 hover:rotate-3"
                                    style={{ backgroundColor: stat.bg }}
                                >
                                    <div className="text-4xl md:text-5xl font-black">
                                        {animatedValue}{stat.suffix}
                                    </div>
                                </div>
                                <div className="text-sm font-black uppercase tracking-wider">
                                    {stat.label}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};
