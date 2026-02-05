'use client';

import React from 'react';

export const StatsSection: React.FC = () => {
    const stats = [
        { value: '0', label: 'Campaigns Created', suffix: '+', gradient: 'text-gradient' },
        { value: '0', label: 'ETH Raised', suffix: ' ETH', gradient: 'text-gradient-cyan' },
        { value: '100%', label: 'Smart Contract Audited', suffix: '', gradient: 'text-gradient-pink' },
        { value: '0%', label: 'Platform Fees', suffix: '', gradient: 'text-gradient' },
    ];

    return (
        <section className="section bg-[var(--bg-secondary)]/50 backdrop-blur-sm relative overflow-hidden">
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-cyan-500/5 to-pink-500/5 animate-gradient"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="font-[family-name:var(--font-space-grotesk)] text-4xl md:text-5xl font-semibold mb-4">
                        Built on <span className="text-gradient-pink">Trust</span>
                    </h2>
                    <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
                        Transparent, audited, and ready for the future.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="text-center group"
                        >
                            <div className={`text-5xl md:text-6xl font-bold mb-3 ${stat.gradient} group-hover:scale-110 transition-transform duration-300`}>
                                {stat.value}
                                {stat.suffix}
                            </div>
                            <div className="text-[var(--text-secondary)] text-sm uppercase tracking-wider">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 15s ease infinite;
        }
      `}</style>
        </section>
    );
};
