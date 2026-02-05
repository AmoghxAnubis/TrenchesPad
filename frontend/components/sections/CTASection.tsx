'use client';

import React from 'react';
import { Button } from '../ui';
import Link from 'next/link';

export const CTASection: React.FC = () => {
    return (
        <section className="section bg-[var(--bg-secondary)]/50 backdrop-blur-sm relative overflow-hidden">
            {/* Animated gradient orbs */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="font-[family-name:var(--font-space-grotesk)] text-5xl md:text-6xl font-bold mb-6">
                        Take <span className="text-gradient">ownership</span> of your{' '}
                        <span className="text-gradient-cyan">assets</span>.
                    </h2>

                    <p className="text-xl text-[var(--text-secondary)] mb-10">
                        Launch your project in minutes. No intermediaries. No custody.
                    </p>

                    <div className="flex flex-wrap gap-4 justify-center">
                        <Link href="/create">
                            <Button variant="gradient" size="lg" className="pulse-glow">
                                🚀 Launch Your Project
                            </Button>
                        </Link>
                        <Link href="/dashboard">
                            <Button variant="secondary" size="lg">
                                View All Campaigns
                            </Button>
                        </Link>
                    </div>

                    {/* Trust badges */}
                    <div className="flex flex-wrap justify-center gap-8 mt-12 pt-8 border-t border-[var(--border)]">
                        <div className="flex items-center gap-2">
                            <span className="text-2xl">🔒</span>
                            <span className="text-sm text-[var(--text-muted)]">Audited Contracts</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-2xl">⚡</span>
                            <span className="text-sm text-[var(--text-muted)]">Instant Deployment</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-2xl">🌐</span>
                            <span className="text-sm text-[var(--text-muted)]">Base Network</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
