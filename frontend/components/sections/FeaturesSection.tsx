'use client';

import React from 'react';
import { Card } from '../ui';

const features = [
    {
        icon: '🔒',
        title: 'Self-Custody Security',
        description: 'Non-custodial, trustless funding. Your keys, your control. No intermediaries.',
        gradient: 'from-purple-500 to-pink-500',
    },
    {
        icon: '⚡',
        title: 'Automated Token Issuance',
        description: 'ERC-20 tokens minted instantly on contribution. Fully tradeable from day one.',
        gradient: 'from-cyan-500 to-blue-500',
    },
    {
        icon: '🛡️',
        title: 'Refund Protection',
        description: '100% ETH refund if goal not met. Smart contract enforced, no trust required.',
        gradient: 'from-green-500 to-teal-500',
    },
    {
        icon: '🌐',
        title: 'Built on Base',
        description: 'Low fees, fast transactions. Powered by Coinbase\'s L2 infrastructure.',
        gradient: 'from-orange-500 to-red-500',
    },
];

export const FeaturesSection: React.FC = () => {
    return (
        <section className="section bg-[var(--bg-secondary)]/50 backdrop-blur-sm">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="font-[family-name:var(--font-space-grotesk)] text-4xl md:text-5xl font-semibold mb-4">
                        Built for <span className="text-gradient">Control</span>
                    </h2>
                    <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
                        No middlemen. No custody. Just smart contracts and transparency.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <Card key={index} className="h-full group">
                            <div className={`text-5xl mb-4 transition-transform duration-300 group-hover:scale-110`}>
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-semibold mb-3 group-hover:text-gradient transition-all">
                                {feature.title}
                            </h3>
                            <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                                {feature.description}
                            </p>
                            {/* Gradient accent line */}
                            <div className={`mt-4 h-1 w-0 group-hover:w-full bg-gradient-to-r ${feature.gradient} transition-all duration-500 rounded-full`}></div>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};
