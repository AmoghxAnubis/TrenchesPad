'use client';

import React, { useEffect, useRef } from 'react';
import { Button } from '../ui';
import Link from 'next/link';

export const HeroSection: React.FC = () => {
    const decorRef1 = useRef<HTMLDivElement>(null);
    const decorRef2 = useRef<HTMLDivElement>(null);
    const decorRef3 = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const moveX = (clientX / window.innerWidth - 0.5) * 20;
            const moveY = (clientY / window.innerHeight - 0.5) * 20;

            if (decorRef1.current) {
                decorRef1.current.style.transform = `translate(${moveX}px, ${moveY}px) rotate(-2deg)`;
            }
            if (decorRef2.current) {
                decorRef2.current.style.transform = `translate(${-moveX}px, ${-moveY}px) rotate(2deg)`;
            }
            if (decorRef3.current) {
                decorRef3.current.style.transform = `translate(${moveX * 0.5}px, ${moveY * 0.5}px)`;
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <section className="min-h-screen flex items-center relative overflow-hidden bg-[var(--bg-primary)]">
            {/* Interactive decorative elements */}
            <div
                ref={decorRef1}
                className="absolute top-20 right-20 w-32 h-32 bg-[var(--accent-yellow)] border-brutal transition-transform duration-300 ease-out cursor-pointer hover:scale-110 hover:rotate-[15deg]"
            ></div>
            <div
                ref={decorRef2}
                className="absolute bottom-40 left-10 w-24 h-24 bg-[var(--accent-cyan)] border-brutal transition-transform duration-300 ease-out cursor-pointer hover:scale-110 hover:rotate-[-15deg]"
            ></div>
            <div
                ref={decorRef3}
                className="absolute top-1/2 right-1/3 w-16 h-16 bg-[var(--accent-pink)] border-brutal transition-transform duration-300 ease-out cursor-pointer hover:scale-110"
            ></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left: Text Content */}
                    <div className="space-y-8 slide-in-left">
                        <div className="inline-block bg-[var(--accent-yellow)] border-brutal shadow-brutal px-4 py-2 rotate-brutal hover:rotate-0 transition-transform duration-300 cursor-pointer">
                            <span className="font-black text-sm uppercase">Web3 Launchpad</span>
                        </div>

                        <h1 className="font-[family-name:var(--font-space-grotesk)] text-6xl md:text-7xl font-black leading-none">
                            FUND YOUR
                            <br />
                            <span className="bg-[var(--accent-pink)] text-white px-4 inline-block rotate-[-1deg] hover:rotate-[1deg] transition-transform duration-300 cursor-pointer">
                                PROJECT
                            </span>
                            <br />
                            ON-CHAIN
                        </h1>

                        <p className="text-xl md:text-2xl font-bold max-w-xl leading-tight">
                            No middlemen. No BS. Just pure{' '}
                            <span className="bg-[var(--accent-cyan)] px-2 hover:bg-[var(--accent-lime)] transition-colors duration-200 cursor-pointer">
                                DECENTRALIZED
                            </span>{' '}
                            funding.
                        </p>

                        <div className="flex flex-wrap gap-4 pt-4">
                            <Link href="/create">
                                <Button variant="primary" size="lg" className="hover:scale-105 active:scale-95">
                                    🚀 LAUNCH NOW
                                </Button>
                            </Link>
                            <Link href="/dashboard">
                                <Button variant="secondary" size="lg" className="hover:scale-105 active:scale-95">
                                    VIEW CAMPAIGNS
                                </Button>
                            </Link>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-4 pt-8">
                            {[
                                { value: '100%', label: 'Refund' },
                                { value: '0%', label: 'Fees' },
                                { value: 'BASE', label: 'Chain' },
                            ].map((stat, i) => (
                                <div
                                    key={i}
                                    className="bg-[var(--bg-secondary)] border-brutal shadow-brutal p-4 brutal-hover cursor-pointer"
                                    style={{ animationDelay: `${i * 0.1}s` }}
                                >
                                    <div className="text-3xl font-black">{stat.value}</div>
                                    <div className="text-xs font-bold uppercase">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Visual Element */}
                    <div className="relative hidden lg:block slide-in-right">
                        <div className="relative w-full h-[600px]">
                            {/* Stacked Cards with interactions */}
                            <div className="absolute top-0 right-0 w-80 bg-[var(--bg-secondary)] border-brutal shadow-brutal-lg p-6 rotate-brutal brutal-hover cursor-pointer">
                                <div className="text-xs font-black uppercase mb-2 bg-[var(--accent-lime)] inline-block px-2 py-1 pulse-brutal">
                                    Active
                                </div>
                                <div className="text-2xl font-black mb-4">CAMPAIGN #1</div>
                                <div className="w-full h-3 bg-[var(--bg-primary)] border-4 border-black overflow-hidden">
                                    <div className="h-full w-3/4 bg-[var(--accent-yellow)] transition-all duration-1000 hover:w-full"></div>
                                </div>
                                <div className="text-sm font-bold mt-2">75% FUNDED</div>
                            </div>

                            <div className="absolute bottom-20 left-0 w-72 bg-[var(--bg-secondary)] border-brutal shadow-brutal-lg p-6 rotate-brutal-reverse brutal-hover cursor-pointer">
                                <div className="text-xs font-black uppercase mb-2">Total Raised</div>
                                <div className="text-4xl font-black text-[var(--accent-pink)] hover:text-[var(--accent-purple)] transition-colors">
                                    12.5 ETH
                                </div>
                                <div className="text-sm font-bold mt-2">OF 20 ETH GOAL</div>
                            </div>

                            <div className="absolute top-1/3 right-1/4 w-64 bg-[var(--accent-cyan)] border-brutal shadow-brutal p-6 brutal-hover cursor-pointer hover:bg-[var(--accent-lime)] transition-colors">
                                <div className="text-xs font-black uppercase mb-2">Your Balance</div>
                                <div className="text-3xl font-black">1,000</div>
                                <div className="text-sm font-bold">VIBE TOKENS</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
