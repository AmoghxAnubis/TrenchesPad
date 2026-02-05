'use client';

import React from 'react';

export const StatsSection: React.FC = () => {
    const stats = [
        { value: '0+', label: 'CAMPAIGNS', bg: 'var(--accent-yellow)' },
        { value: '0 ETH', label: 'RAISED', bg: 'var(--accent-cyan)' },
        { value: '100%', label: 'AUDITED', bg: 'var(--accent-pink)' },
        { value: '0%', label: 'FEES', bg: 'var(--accent-lime)' },
    ];

    return (
        <section className="section bg-white">
            <div className="container mx-auto px-6">
                <div className="mb-16 text-center">
                    <h2 className="font-[family-name:var(--font-space-grotesk)] text-4xl md:text-5xl font-black mb-4">
                        BY THE <span className="bg-[var(--accent-yellow)] px-4">NUMBERS</span>
                    </h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="bg-white border-brutal shadow-brutal-lg p-8 text-center brutal-hover"
                        >
                            <div
                                className="inline-block px-4 py-2 mb-4 border-4 border-black"
                                style={{ backgroundColor: stat.bg }}
                            >
                                <div className="text-4xl md:text-5xl font-black">
                                    {stat.value}
                                </div>
                            </div>
                            <div className="text-sm font-black uppercase tracking-wider">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
