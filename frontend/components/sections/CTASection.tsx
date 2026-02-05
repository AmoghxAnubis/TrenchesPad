'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui';
import Link from 'next/link';

export const CTASection: React.FC = () => {
    return (
        <section className="section bg-[var(--bg-secondary)]">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-3xl mx-auto"
                >
                    <h2 className="font-[family-name:var(--font-space-grotesk)] text-5xl md:text-6xl font-bold mb-6">
                        Take ownership of your assets.
                    </h2>

                    <p className="text-xl text-[var(--text-secondary)] mb-10">
                        Launch your project in minutes. No intermediaries. No custody.
                    </p>

                    <Link href="/create">
                        <Button variant="primary" size="lg">
                            Launch Your Project
                        </Button>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};
