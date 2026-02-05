'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const StatsSection: React.FC = () => {
    const stats = [
        { value: '0', label: 'Campaigns Created', suffix: '+' },
        { value: '0', label: 'ETH Raised', suffix: ' ETH' },
        { value: '100%', label: 'Smart Contract Audited', suffix: '' },
        { value: '0%', label: 'Platform Fees', suffix: '' },
    ];

    return (
        <section className="section bg-[var(--bg-secondary)]">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="font-[family-name:var(--font-space-grotesk)] text-4xl md:text-5xl font-semibold mb-4">
                        Built on Trust
                    </h2>
                    <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
                        Transparent, audited, and ready for the future.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="text-center"
                        >
                            <div className="text-5xl md:text-6xl font-bold text-white mb-3">
                                {stat.value}
                                {stat.suffix}
                            </div>
                            <div className="text-[var(--text-secondary)] text-sm uppercase tracking-wider">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
