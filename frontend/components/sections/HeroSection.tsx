'use client';

import React from 'react';
import { Button } from '../ui';
import Link from 'next/link';

export const HeroSection: React.FC = () => {
    return (
        <section className="min-h-screen flex items-center relative overflow-hidden">
            {/* Floating gradient orbs */}
            <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left: Text Content */}
                    <div className="space-y-8">
                        <h1 className="font-[family-name:var(--font-space-grotesk)] text-6xl md:text-7xl font-bold leading-tight">
                            <span className="text-gradient">Secure.</span>
                            <br />
                            <span className="text-gradient-cyan">Minimal.</span>
                            <br />
                            <span className="text-gradient-pink">On-chain.</span>
                        </h1>

                        <p className="text-xl md:text-2xl text-[var(--text-secondary)] max-w-xl leading-relaxed">
                            A launchpad built for people who value{' '}
                            <span className="text-[var(--accent-primary)] font-semibold">control</span>.
                        </p>

                        <div className="flex flex-wrap gap-4 pt-4">
                            <Link href="/create">
                                <Button variant="gradient" size="lg">
                                    🚀 Launch Your Project
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
                                <div className="text-3xl font-bold text-gradient-cyan">100%</div>
                                <div className="text-sm text-[var(--text-muted)]">Refund Protection</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-gradient">0</div>
                                <div className="text-sm text-[var(--text-muted)]">Platform Fees</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-gradient-pink">Base</div>
                                <div className="text-sm text-[var(--text-muted)]">Blockchain</div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Visual Element */}
                    <div className="relative hidden lg:block">
                        <div className="relative w-full h-[600px]">
                            {/* Floating Cards with gradients */}
                            <div className="absolute top-0 right-0 w-80 h-48 bg-[var(--surface)] border-2 border-[var(--accent-primary)]/30 rounded-2xl p-6 shadow-[0_0_40px_rgba(0,245,255,0.3)] backdrop-blur-sm animate-float">
                                <div className="text-sm text-[var(--text-muted)] mb-2">Campaign Status</div>
                                <div className="text-2xl font-bold text-gradient mb-4">Active</div>
                                <div className="w-full h-2 bg-[var(--bg-secondary)] rounded-full overflow-hidden">
                                    <div className="h-full w-3/4 bg-gradient-to-r from-[#667eea] to-[#764ba2] shadow-[0_0_10px_rgba(102,126,234,0.6)]"></div>
                                </div>
                            </div>

                            <div className="absolute bottom-0 left-0 w-72 h-40 bg-[var(--surface)] border-2 border-[var(--accent-tertiary)]/30 rounded-2xl p-6 shadow-[0_0_40px_rgba(0,255,136,0.3)] backdrop-blur-sm animate-float-delayed">
                                <div className="text-sm text-[var(--text-muted)] mb-2">Total Raised</div>
                                <div className="text-3xl font-bold text-gradient-cyan">12.5 ETH</div>
                                <div className="text-sm text-[var(--text-secondary)] mt-2">of 20 ETH goal</div>
                            </div>

                            <div className="absolute top-1/3 right-1/4 w-64 h-32 bg-[var(--surface)] border-2 border-[var(--accent-secondary)]/30 rounded-2xl p-6 shadow-[0_0_40px_rgba(255,0,255,0.3)] backdrop-blur-sm animate-float-slow">
                                <div className="text-sm text-[var(--text-muted)] mb-2">Your Tokens</div>
                                <div className="text-2xl font-bold text-gradient-pink">1,000 VIBE</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float 5s ease-in-out infinite;
          animation-delay: 0.5s;
        }
        
        .animate-float-slow {
          animation: float 6s ease-in-out infinite;
          animation-delay: 1s;
        }
      `}</style>
        </section>
    );
};
