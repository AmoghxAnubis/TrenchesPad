'use client';

import React from 'react';
import { Button } from '../ui';
import Link from 'next/link';

export const CTASection: React.FC = () => {
    return (
        <section className="section bg-[var(--bg-primary)] relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-10 left-1/4 w-32 h-32 bg-[var(--accent-purple)] border-brutal rotate-brutal"></div>
            <div className="absolute bottom-10 right-1/4 w-24 h-24 bg-[var(--accent-yellow)] border-brutal rotate-brutal-reverse"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white border-brutal-thick shadow-brutal-lg p-12 text-center">
                        <h2 className="font-[family-name:var(--font-space-grotesk)] text-5xl md:text-6xl font-black mb-6 leading-none">
                            READY TO
                            <br />
                            <span className="bg-[var(--accent-pink)] text-white px-4 inline-block rotate-[-1deg]">LAUNCH</span>
                            <br />
                            YOUR PROJECT?
                        </h2>

                        <p className="text-xl font-bold mb-10 max-w-2xl mx-auto">
                            No gatekeepers. No approval process. Just deploy and go.
                        </p>

                        <div className="flex flex-wrap gap-4 justify-center mb-8">
                            <Link href="/create">
                                <Button variant="accent" size="lg">
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
                            <div className="bg-[var(--accent-yellow)] border-brutal px-4 py-2">
                                <span className="font-black text-sm">🔒 AUDITED</span>
                            </div>
                            <div className="bg-[var(--accent-cyan)] border-brutal px-4 py-2">
                                <span className="font-black text-sm">⚡ INSTANT</span>
                            </div>
                            <div className="bg-[var(--accent-lime)] border-brutal px-4 py-2">
                                <span className="font-black text-sm">🌐 BASE L2</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
