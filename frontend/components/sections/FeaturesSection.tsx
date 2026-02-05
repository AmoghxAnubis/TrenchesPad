'use client';

import React from 'react';
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
    return (
        <section className="section bg-white">
            <div className="container mx-auto px-6">
                <div className="mb-16">
                    <div className="inline-block bg-[var(--accent-pink)] border-brutal shadow-brutal px-6 py-3 mb-6 rotate-brutal">
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
                        <Card key={index} accent={feature.accent} className="h-full">
                            <div className="text-5xl mb-4">{feature.icon}</div>
                            <h3 className="text-xl font-black mb-3 uppercase">
                                {feature.title}
                            </h3>
                            <p className="font-semibold text-sm leading-relaxed">
                                {feature.description}
                            </p>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};
