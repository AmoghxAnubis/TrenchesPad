'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { Button, ProgressBar } from '@/components/ui';
import { ContributionForm } from '@/components/campaign';

// Mock campaign data - will be replaced with contract data
const MOCK_CAMPAIGN = {
    id: '1',
    name: 'DeFi Revolution',
    tokenSymbol: 'DEFI',
    description: 'Building the next generation of decentralized finance protocols on Base L2. Our platform will enable seamless swaps, lending, and yield farming with minimal fees and maximum security.',
    currentAmount: 15.5,
    goalAmount: 20,
    deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    status: 'active' as const,
    creator: '0x1234567890123456789012345678901234567890',
    tokenPrice: 0.001, // ETH per token
    contributors: [
        { address: '0xabcd...1234', amount: 5.0, tokens: 5000 },
        { address: '0xefgh...5678', amount: 3.5, tokens: 3500 },
        { address: '0xijkl...9012', amount: 7.0, tokens: 7000 },
    ],
};

export default function CampaignDetailPage() {
    const params = useParams();
    const campaignId = params?.id as string;

    // In production, fetch campaign data based on campaignId
    const campaign = MOCK_CAMPAIGN;

    const handleContribute = (amount: number) => {
        // TODO: Integrate with smart contract
        console.log('Contributing:', amount, 'ETH');
        alert(`Contributing ${amount} ETH will be integrated with smart contract!`);
    };

    const handleClaim = () => {
        alert('Claim tokens will be integrated with smart contract!');
    };

    const handleRefund = () => {
        alert('Refund will be integrated with smart contract!');
    };

    const handleWithdraw = () => {
        alert('Withdraw will be integrated with smart contract!');
    };

    const getTimeRemaining = () => {
        const now = new Date();
        const diff = campaign.deadline.getTime() - now.getTime();

        if (diff <= 0) return 'Campaign Ended';

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

        return `${days}d ${hours}h remaining`;
    };

    return (
        <div className="min-h-screen pt-32 pb-16 bg-[var(--bg-primary)]">
            <div className="container mx-auto px-6">
                {/* Hero Section */}
                <div className="mb-12 slide-in-up">
                    <div className="inline-block bg-[var(--accent-yellow)] border-brutal shadow-brutal px-6 py-3 mb-4 rotate-brutal hover:rotate-0 transition-transform duration-300">
                        <h1 className="font-[family-name:var(--font-space-grotesk)] text-4xl md:text-5xl font-black">
                            {campaign.name}
                        </h1>
                    </div>

                    <div className="flex flex-wrap gap-3 mb-4">
                        <div className="bg-[var(--bg-secondary)] border-brutal shadow-brutal px-4 py-2">
                            <span className="font-black text-sm">
                                ${campaign.tokenSymbol}
                            </span>
                        </div>
                        <div className="bg-[var(--accent-lime)] border-brutal shadow-brutal px-4 py-2">
                            <span className="font-black text-sm uppercase">
                                {campaign.status}
                            </span>
                        </div>
                    </div>

                    <p className="text-lg font-bold max-w-3xl">
                        {campaign.description}
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Progress Section */}
                        <div className="bg-[var(--bg-secondary)] border-brutal-thick shadow-brutal-lg p-8 slide-in-up">
                            <h2 className="text-2xl font-black uppercase mb-6">
                                FUNDING PROGRESS
                            </h2>

                            <ProgressBar
                                current={campaign.currentAmount}
                                goal={campaign.goalAmount}
                                showPercentage={true}
                            />

                            <div className="mt-6 text-center">
                                <div className="text-sm font-black uppercase text-[var(--text-muted)]">
                                    {getTimeRemaining()}
                                </div>
                            </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid md:grid-cols-4 gap-4 slide-in-up" style={{ animationDelay: '0.1s' }}>
                            {[
                                { label: 'Raised', value: `${campaign.currentAmount} ETH`, bg: 'var(--accent-yellow)' },
                                { label: 'Goal', value: `${campaign.goalAmount} ETH`, bg: 'var(--accent-cyan)' },
                                { label: 'Contributors', value: campaign.contributors.length, bg: 'var(--accent-pink)' },
                                { label: 'Token Price', value: `${campaign.tokenPrice} ETH`, bg: 'var(--accent-lime)' },
                            ].map((stat, i) => (
                                <div
                                    key={i}
                                    className="bg-[var(--bg-secondary)] border-brutal shadow-brutal p-6 text-center brutal-hover cursor-pointer"
                                >
                                    <div
                                        className="inline-block px-3 py-2 mb-3 border-4 border-[var(--border)]"
                                        style={{ backgroundColor: stat.bg }}
                                    >
                                        <div className="text-2xl font-black">{stat.value}</div>
                                    </div>
                                    <div className="text-xs font-black uppercase text-[var(--text-muted)]">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Contributors List */}
                        <div className="bg-[var(--bg-secondary)] border-brutal-thick shadow-brutal-lg p-8 slide-in-up" style={{ animationDelay: '0.2s' }}>
                            <h2 className="text-2xl font-black uppercase mb-6">
                                CONTRIBUTORS ({campaign.contributors.length})
                            </h2>

                            <div className="space-y-3">
                                {campaign.contributors.map((contributor, i) => (
                                    <div
                                        key={i}
                                        className="bg-[var(--bg-primary)] border-brutal shadow-brutal p-4 flex justify-between items-center brutal-hover"
                                    >
                                        <div>
                                            <div className="font-black">{contributor.address}</div>
                                            <div className="text-sm font-bold text-[var(--text-muted)]">
                                                {contributor.tokens.toLocaleString()} ${campaign.tokenSymbol}
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-xl font-black text-[var(--accent-yellow)]">
                                                {contributor.amount} ETH
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Campaign Info */}
                        <div className="bg-[var(--bg-secondary)] border-brutal-thick shadow-brutal-lg p-8 slide-in-up" style={{ animationDelay: '0.3s' }}>
                            <h2 className="text-2xl font-black uppercase mb-6">
                                CAMPAIGN INFO
                            </h2>

                            <div className="space-y-4">
                                <div className="flex justify-between pb-3 border-b-2 border-[var(--border)]">
                                    <span className="font-bold text-[var(--text-muted)]">Creator</span>
                                    <span className="font-black">{campaign.creator.slice(0, 10)}...{campaign.creator.slice(-8)}</span>
                                </div>
                                <div className="flex justify-between pb-3 border-b-2 border-[var(--border)]">
                                    <span className="font-bold text-[var(--text-muted)]">Deadline</span>
                                    <span className="font-black">{campaign.deadline.toLocaleDateString()}</span>
                                </div>
                                <div className="flex justify-between pb-3 border-b-2 border-[var(--border)]">
                                    <span className="font-bold text-[var(--text-muted)]">Status</span>
                                    <span className="font-black uppercase">{campaign.status}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Contribution Form */}
                        <div className="slide-in-right">
                            <ContributionForm
                                tokenSymbol={campaign.tokenSymbol}
                                tokenPrice={campaign.tokenPrice}
                                onContribute={handleContribute}
                            />
                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-3 slide-in-right" style={{ animationDelay: '0.1s' }}>
                            {campaign.status === 'funded' && (
                                <Button
                                    variant="primary"
                                    size="lg"
                                    onClick={handleClaim}
                                    className="w-full"
                                >
                                    ✓ CLAIM TOKENS
                                </Button>
                            )}

                            {campaign.status === 'failed' && (
                                <Button
                                    variant="accent"
                                    size="lg"
                                    onClick={handleRefund}
                                    className="w-full"
                                >
                                    ↩️ GET REFUND
                                </Button>
                            )}

                            {campaign.status === 'funded' && (
                                <Button
                                    variant="secondary"
                                    size="lg"
                                    onClick={handleWithdraw}
                                    className="w-full"
                                >
                                    💰 WITHDRAW (CREATOR)
                                </Button>
                            )}
                        </div>

                        {/* Info Box */}
                        <div className="bg-[var(--accent-yellow)] border-brutal shadow-brutal p-6 slide-in-right" style={{ animationDelay: '0.2s' }}>
                            <div className="text-2xl mb-3">ℹ️</div>
                            <div className="font-black text-sm uppercase mb-2">How it works</div>
                            <ul className="text-sm font-bold space-y-2">
                                <li>• Tokens minted instantly</li>
                                <li>• 100% refund if goal not met</li>
                                <li>• No platform fees</li>
                                <li>• Fully on-chain</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
