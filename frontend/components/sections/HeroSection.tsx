'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui';
import Link from 'next/link';

export const HeroSection: React.FC = () => {
    return (
        <section className="min-h-screen flex items-center relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left: Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        className="space-y-8"
                    >
                        <h1 className="font-[family-name:var(--font-space-grotesk)] text-6xl md:text-7xl font-bold leading-tight">
                            Secure.
                            <br />
                            Minimal.
                            <br />
                            On-chain.
                        </h1>

                        <p className="text-xl md:text-2xl text-[var(--text-secondary)] max-w-xl leading-relaxed">
                            A launchpad built for people who value control.
                        </p>

                        <div className="flex flex-wrap gap-4 pt-4">
                            <Link href="/create">
                                <Button variant="primary" size="lg">
                                    Launch Your Project
                                </Button>
                            </Link>
                            <Link href="/dashboard">
                                <Button variant="secondary" size="lg">
                                    Explore Campaigns
                                </Button>
                            </Link>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-6 pt-8 border-t border-[var(--border)]">
                            <div>
                                <div className="text-3xl font-bold text-white">100%</div>
                                <div className="text-sm text-[var(--text-muted)]">Refund Protection</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-white">0</div>
                                <div className="text-sm text-[var(--text-muted)]">Platform Fees</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-white">Base</div>
                                <div className="text-sm text-[var(--text-muted)]">Blockchain</div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Visual Element */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
                        className="relative hidden lg:block"
                    >
                        <div className="relative w-full h-[600px]">
                            {/* Floating Cards */}
                            <motion.div
                                animate={{ y: [0, -20, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                                className="absolute top-0 right-0 w-80 h-48 bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 shadow-lg"
                            >
                                <div className="text-sm text-[var(--text-muted)] mb-2">Campaign Status</div>
                                <div className="text-2xl font-bold mb-4">Active</div>
                                <div className="w-full h-2 bg-[var(--bg-secondary)] rounded-full overflow-hidden">
                                    <div className="h-full w-3/4 bg-white"></div>
                                </div>
                            </motion.div>

                            <motion.div
                                animate={{ y: [0, 20, 0] }}
                                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                                className="absolute bottom-0 left-0 w-72 h-40 bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 shadow-lg"
                            >
                                <div className="text-sm text-[var(--text-muted)] mb-2">Total Raised</div>
                                <div className="text-3xl font-bold">12.5 ETH</div>
                                <div className="text-sm text-[var(--text-secondary)] mt-2">of 20 ETH goal</div>
                            </motion.div>

                            <motion.div
                                animate={{ y: [0, -15, 0], x: [0, 10, 0] }}
                                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                                className="absolute top-1/3 right-1/4 w-64 h-32 bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 shadow-lg"
                            >
                                <div className="text-sm text-[var(--text-muted)] mb-2">Your Tokens</div>
                                <div className="text-2xl font-bold">1,000 VIBE</div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
