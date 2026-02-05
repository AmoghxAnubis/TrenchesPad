'use client';

import React from 'react';

const steps = [
    {
        number: '01',
        title: 'Create Campaign',
        description: 'Define your token, funding goal, and duration in minutes.',
        icon: '🎯',
    },
    {
        number: '02',
        title: 'Share with Backers',
        description: 'Get your unique campaign link and start raising funds.',
        icon: '📢',
    },
    {
        number: '03',
        title: 'Receive Contributions',
        description: 'Backers get tokens instantly. Everything on-chain.',
        icon: '💰',
    },
    {
        number: '04',
        title: 'Withdraw or Refund',
        description: 'Automated based on goal achievement. No manual intervention.',
        icon: '✅',
    },
];

export const HowItWorksSection: React.FC = () => {
    return (
        <section className="section relative">
            {/* Background gradient orb */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-full blur-3xl"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="font-[family-name:var(--font-space-grotesk)] text-4xl md:text-5xl font-semibold mb-4">
                        How It <span className="text-gradient-cyan">Works</span>
                    </h2>
                    <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
                        Four steps to launch your project and start raising funds.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className="relative group"
                        >
                            {/* Large faded number with gradient */}
                            <div className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-[var(--border)] to-transparent opacity-20 mb-4 group-hover:opacity-40 transition-opacity">
                                {step.number}
                            </div>

                            {/* Icon */}
                            <div className="text-4xl mb-4 group-hover:scale-125 transition-transform duration-300">
                                {step.icon}
                            </div>

                            {/* Content */}
                            <h3 className="text-2xl font-semibold mb-3 group-hover:text-gradient transition-all">
                                {step.title}
                            </h3>
                            <p className="text-[var(--text-secondary)] leading-relaxed">
                                {step.description}
                            </p>

                            {/* Connector line with gradient (except last item) */}
                            {index < steps.length - 1 && (
                                <div className="hidden lg:block absolute top-12 left-full w-full h-[2px] bg-gradient-to-r from-[var(--accent-primary)] to-transparent opacity-30" />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
