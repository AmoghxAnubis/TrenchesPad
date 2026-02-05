'use client';

import React from 'react';

const steps = [
    {
        number: '01',
        title: 'CREATE',
        description: 'Set up your token, goal, and deadline.',
        color: 'var(--accent-yellow)',
    },
    {
        number: '02',
        title: 'SHARE',
        description: 'Get your link and spread the word.',
        color: 'var(--accent-cyan)',
    },
    {
        number: '03',
        title: 'FUND',
        description: 'Backers contribute. Tokens mint instantly.',
        color: 'var(--accent-pink)',
    },
    {
        number: '04',
        title: 'WITHDRAW',
        description: 'Goal met? Withdraw. Goal missed? Refund.',
        color: 'var(--accent-lime)',
    },
];

export const HowItWorksSection: React.FC = () => {
    return (
        <section className="section bg-[var(--bg-primary)] relative">
            {/* Decorative squares */}
            <div className="absolute top-10 right-10 w-20 h-20 bg-[var(--accent-purple)] border-brutal rotate-brutal"></div>
            <div className="absolute bottom-10 left-10 w-16 h-16 bg-[var(--accent-yellow)] border-brutal"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="mb-16">
                    <h2 className="font-[family-name:var(--font-space-grotesk)] text-4xl md:text-5xl font-black mb-4">
                        HOW IT <span className="bg-[var(--accent-cyan)] px-4">WORKS</span>
                    </h2>
                    <p className="text-lg font-bold max-w-2xl">
                        Four steps. Zero complexity.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className="relative"
                        >
                            {/* Large number background */}
                            <div
                                className="text-9xl font-black opacity-10 absolute -top-8 -left-4"
                                style={{ color: step.color }}
                            >
                                {step.number}
                            </div>

                            {/* Content */}
                            <div className="relative bg-white border-brutal shadow-brutal p-6 brutal-hover">
                                <div
                                    className="inline-block px-3 py-1 mb-4 font-black text-sm border-4 border-black"
                                    style={{ backgroundColor: step.color }}
                                >
                                    STEP {step.number}
                                </div>

                                <h3 className="text-2xl font-black mb-3 uppercase">
                                    {step.title}
                                </h3>
                                <p className="font-semibold leading-relaxed">
                                    {step.description}
                                </p>
                            </div>

                            {/* Arrow connector (except last) */}
                            {index < steps.length - 1 && (
                                <div className="hidden lg:block absolute top-1/2 -right-4 text-4xl font-black z-20">
                                    →
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
