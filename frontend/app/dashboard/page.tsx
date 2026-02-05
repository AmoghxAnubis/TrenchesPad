'use client';

import React, { useState } from 'react';
import { CampaignCard } from '@/components/campaign';
import { Button } from '@/components/ui';

// Mock data - will be replaced with actual contract data
const MOCK_CAMPAIGNS = [
    {
        id: '1',
        name: 'DeFi Revolution',
        tokenSymbol: 'DEFI',
        description: 'Building the next generation of decentralized finance protocols on Base L2',
        currentAmount: 15.5,
        goalAmount: 20,
        deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
        status: 'active' as const,
        creator: '0x1234567890123456789012345678901234567890',
    },
    {
        id: '2',
        name: 'NFT Marketplace',
        tokenSymbol: 'NFTM',
        description: 'Zero-fee NFT marketplace with brutal design and instant settlements',
        currentAmount: 25,
        goalAmount: 25,
        deadline: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
        status: 'funded' as const,
        creator: '0x2345678901234567890123456789012345678901',
    },
    {
        id: '3',
        name: 'Gaming DAO',
        tokenSymbol: 'GAME',
        description: 'Community-driven gaming platform with play-to-earn mechanics',
        currentAmount: 8.2,
        goalAmount: 30,
        deadline: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        status: 'failed' as const,
        creator: '0x3456789012345678901234567890123456789012',
    },
    {
        id: '4',
        name: 'Social Protocol',
        tokenSymbol: 'SOCIAL',
        description: 'Decentralized social media protocol with on-chain reputation',
        currentAmount: 12.8,
        goalAmount: 15,
        deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days from now
        status: 'active' as const,
        creator: '0x4567890123456789012345678901234567890123',
    },
];

type FilterType = 'all' | 'active' | 'funded' | 'failed';

export default function DashboardPage() {
    const [filter, setFilter] = useState<FilterType>('all');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredCampaigns = MOCK_CAMPAIGNS.filter(campaign => {
        const matchesFilter = filter === 'all' || campaign.status === filter;
        const matchesSearch =
            campaign.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            campaign.tokenSymbol.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesFilter && matchesSearch;
    });

    const filters: { label: string; value: FilterType; color: string }[] = [
        { label: 'ALL', value: 'all', color: 'var(--accent-cyan)' },
        { label: 'ACTIVE', value: 'active', color: 'var(--accent-yellow)' },
        { label: 'FUNDED', value: 'funded', color: 'var(--accent-lime)' },
        { label: 'FAILED', value: 'failed', color: 'var(--accent-pink)' },
    ];

    return (
        <div className="min-h-screen pt-32 pb-16 bg-[var(--bg-primary)]">
            <div className="container mx-auto px-6">
                {/* Header */}
                <div className="mb-12 slide-in-up">
                    <div className="inline-block bg-[var(--accent-cyan)] border-brutal shadow-brutal px-6 py-3 mb-6 rotate-brutal hover:rotate-0 transition-transform duration-300">
                        <h1 className="font-[family-name:var(--font-space-grotesk)] text-4xl md:text-5xl font-black text-[var(--text-primary)]">
                            CAMPAIGNS
                        </h1>
                    </div>
                    <p className="text-lg font-bold max-w-2xl">
                        Browse active campaigns. Find projects to support. Get tokens instantly.
                    </p>
                </div>

                {/* Filters & Search */}
                <div className="mb-8 space-y-4">
                    {/* Filter Buttons */}
                    <div className="flex flex-wrap gap-3">
                        {filters.map((f) => (
                            <button
                                key={f.value}
                                onClick={() => setFilter(f.value)}
                                className={`px-6 py-3 font-black uppercase text-sm border-brutal shadow-brutal brutal-hover transition-all duration-100 ${filter === f.value
                                        ? 'scale-105'
                                        : ''
                                    }`}
                                style={{
                                    backgroundColor: filter === f.value ? f.color : 'var(--bg-secondary)',
                                    color: 'var(--text-primary)',
                                }}
                            >
                                {f.label}
                            </button>
                        ))}
                    </div>

                    {/* Search Bar */}
                    <div className="max-w-md">
                        <input
                            type="text"
                            placeholder="SEARCH CAMPAIGNS..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-[var(--bg-secondary)] border-brutal shadow-brutal px-4 py-3 font-bold text-[var(--text-primary)] placeholder:text-[var(--text-muted)] placeholder:font-semibold focus:outline-none focus:shadow-brutal focus:translate-x-[-2px] focus:translate-y-[-2px] transition-all duration-100"
                        />
                    </div>
                </div>

                {/* Campaign Grid */}
                {filteredCampaigns.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredCampaigns.map((campaign, index) => (
                            <div
                                key={campaign.id}
                                className="slide-in-up"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <CampaignCard {...campaign} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <div className="bg-[var(--bg-secondary)] border-brutal shadow-brutal-lg p-12 inline-block">
                            <div className="text-6xl mb-4">🔍</div>
                            <h3 className="text-2xl font-black uppercase mb-2">
                                NO CAMPAIGNS FOUND
                            </h3>
                            <p className="font-bold text-[var(--text-muted)]">
                                Try adjusting your filters
                            </p>
                        </div>
                    </div>
                )}

                {/* CTA Section */}
                <div className="mt-16 text-center">
                    <div className="bg-[var(--bg-secondary)] border-brutal-thick shadow-brutal-lg p-12 inline-block max-w-2xl">
                        <h2 className="text-3xl md:text-4xl font-black mb-4">
                            READY TO <span className="bg-[var(--accent-yellow)] px-3">LAUNCH</span>?
                        </h2>
                        <p className="text-lg font-bold mb-6">
                            Create your own campaign in minutes
                        </p>
                        <Button variant="accent" size="lg" onClick={() => window.location.href = '/create'}>
                            🚀 CREATE CAMPAIGN
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
