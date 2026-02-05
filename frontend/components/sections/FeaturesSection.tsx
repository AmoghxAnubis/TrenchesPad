'use client';

import React, { useState } from 'react';
import { Card } from '../ui';

const features = [
    {
        icon: '🔒',
        title: 'SELF-CUSTODY',
        description: 'Your keys, your crypto. No intermediaries. Period.',
        accent: 'yellow' as const,
    },
    {
        icon: '⚡',
        title: 'INSTANT TOKENS',
        description: 'ERC-20 tokens minted on contribution. Tradeable immediately.',
        accent: 'cyan' as const,
    },
    {
        icon: '🛡️',
        title: '100% REFUND',
        description: 'Goal not met? Get your ETH back. Smart contract guaranteed.',
        accent: 'pink' as const,
    },
    {
        icon: '🌐',
        title: 'BASE L2',
        description: 'Low fees, fast transactions. Coinbase infrastructure.',
        accent: 'lime' as const,
    },
];

export const FeaturesSection: React.FC = () => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <section className="section bg-white">
            <div className="container mx-auto px-6">
                <div className="mb-16 slide-in-up">
                    <div className="inline-block bg-[var(--accent-pink)] border-brutal shadow-brutal px-6 py-3 mb-6 rotate-brutal hover:rotate-0 hover:scale-110 transition-all duration-300 cursor-pointer">
                        <h2 className="font-[family-name:var(--font-space-grotesk)] text-4xl md:text-5xl font-black text-white">
                            WHY US?
                        </h2>
                    </div>
                    <p className="text-lg font-bold max-w-2xl">
                        No fluff. Just the features that matter.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="slide-in-up"
                            style={{ animationDelay: `${index * 0.1}s` }}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            <Card accent={feature.accent} className="h-full group">
                                <div className={`text-5xl mb-4 transition-transform duration-300 ${hoveredIndex === index ? 'scale-125 rotate-12' : ''
                                    }`}>
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-black mb-3 uppercase group-hover:text-[var(--accent-pink)] transition-colors">
                                    {feature.title}
                                </h3>
                                <p className="font-semibold text-sm leading-relaxed">
                                    {feature.description}
                                </p>
                                {/* Animated underline */}
                                <div className={`mt-4 h-1 bg-black transition-all duration-300 ${hoveredIndex === index ? 'w-full' : 'w-0'
                                    }`}></div>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
