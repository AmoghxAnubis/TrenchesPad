'use client';

import React from 'react';
import { motion } from 'framer-motion';

const steps = [
    {
        number: '01',
        title: 'Create Campaign',
        description: 'Define your token, funding goal, and duration in minutes.',
    },
    {
        number: '02',
        title: 'Share with Backers',
        description: 'Get your unique campaign link and start raising funds.',
    },
    {
        number: '03',
        title: 'Receive Contributions',
        description: 'Backers get tokens instantly. Everything on-chain.',
    },
    {
        number: '04',
        title: 'Withdraw or Refund',
        description: 'Automated based on goal achievement. No manual intervention.',
    },
];

export const HowItWorksSection: React.FC = () => {
    return (
        <section className="section">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="font-[family-name:var(--font-space-grotesk)] text-4xl md:text-5xl font-semibold mb-4">
                        How It Works
                    </h2>
                    <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
                        Four steps to launch your project and start raising funds.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.15 }}
                            className="relative"
                        >
                            {/* Large faded number */}
                            <div className="text-8xl font-bold text-[var(--border)] opacity-30 mb-4">
                                {step.number}
                            </div>

                            {/* Content */}
                            <h3 className="text-2xl font-semibold mb-3">{step.title}</h3>
                            <p className="text-[var(--text-secondary)] leading-relaxed">
                                {step.description}
                            </p>

                            {/* Connector line (except last item) */}
                            {index < steps.length - 1 && (
                                <div className="hidden lg:block absolute top-12 left-full w-full h-[2px] bg-gradient-to-r from-[var(--border)] to-transparent" />
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
