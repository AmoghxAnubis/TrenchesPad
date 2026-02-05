'use client';

import React, { useState } from 'react';
import { Button } from '../ui';
import Link from 'next/link';

export const CTASection: React.FC = () => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <section className="section bg-[var(--bg-primary)] relative overflow-hidden">
            {/* Interactive decorative elements */}
            <div className="absolute top-10 left-1/4 w-32 h-32 bg-[var(--accent-purple)] border-brutal rotate-brutal rotate-on-hover cursor-pointer"></div>
            <div className="absolute bottom-10 right-1/4 w-24 h-24 bg-[var(--accent-yellow)] border-brutal rotate-brutal-reverse rotate-on-hover cursor-pointer"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto slide-in-up">
                    <div
                        className="bg-[var(--bg-secondary)] border-brutal-thick shadow-brutal-lg p-12 text-center transition-all duration-300 hover:shadow-[16px_16px_0px_var(--border)] hover:translate-x-[-4px] hover:translate-y-[-4px]"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        <h2 className="font-[family-name:var(--font-space-grotesk)] text-5xl md:text-6xl font-black mb-6 leading-none">
                            READY TO
                            <br />
                            <span className={`bg-[var(--accent-pink)] text-white px-4 inline-block rotate-[-1deg] transition-all duration-300 ${isHovered ? 'rotate-[1deg] scale-110' : ''
                                }`}>
                                LAUNCH
                            </span>
                            <br />
                            YOUR PROJECT?
                        </h2>

                        <p className="text-xl font-bold mb-10 max-w-2xl mx-auto">
                            No gatekeepers. No approval process. Just deploy and go.
                        </p>

                        <div className="flex flex-wrap gap-4 justify-center mb-8">
                            <Link href="/create">
                                <Button variant="accent" size="lg" className="pulse-brutal">
                                    🚀 START NOW
                                </Button>
                            </Link>
                            <Link href="/dashboard">
                                <Button variant="secondary" size="lg">
                                    BROWSE CAMPAIGNS
                                </Button>
                            </Link>
                        </div>

                        {/* Trust indicators */}
                        <div className="flex flex-wrap justify-center gap-6 pt-8 border-t-4 border-black">
                            {[
                                { emoji: '🔒', text: 'AUDITED', bg: 'var(--accent-yellow)' },
                                { emoji: '⚡', text: 'INSTANT', bg: 'var(--accent-cyan)' },
                                { emoji: '🌐', text: 'BASE L2', bg: 'var(--accent-lime)' },
                            ].map((badge, i) => (
                                <div
                                    key={i}
                                    className="bg-[var(--bg-secondary)] border-brutal px-4 py-2 brutal-hover cursor-pointer"
                                    style={{
                                        backgroundColor: badge.bg,
                                        animationDelay: `${i * 0.1}s`
                                    }}
                                >
                                    <span className="font-black text-sm">
                                        <span className="inline-block hover:scale-125 transition-transform duration-200">
                                            {badge.emoji}
                                        </span>{' '}
                                        {badge.text}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
