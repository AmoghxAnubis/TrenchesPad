'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '../ui';

export const Navbar: React.FC = () => {
    const [isConnected, setIsConnected] = useState(false);
    const [address, setAddress] = useState('');

    const connectWallet = async () => {
        if (typeof window.ethereum !== 'undefined') {
            try {
                const accounts = await window.ethereum.request({
                    method: 'eth_requestAccounts'
                }) as string[];
                setAddress(accounts[0]);
                setIsConnected(true);
            } catch (error) {
                console.error('Error connecting wallet:', error);
            }
        } else {
            alert('Please install MetaMask or Coinbase Wallet');
        }
    };

    const formatAddress = (addr: string) => {
        return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--bg-primary)]/80 backdrop-blur-xl border-b border-[var(--border)]">
            <div className="container mx-auto px-6">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="text-2xl font-bold font-[family-name:var(--font-space-grotesk)] text-gradient group-hover:scale-105 transition-transform">
                            TrenchesPad
                        </div>
                    </Link>

                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link
                            href="/dashboard"
                            className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors relative group"
                        >
                            Campaigns
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[var(--accent-primary)] to-transparent group-hover:w-full transition-all duration-300"></span>
                        </Link>
                        <Link
                            href="/create"
                            className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors relative group"
                        >
                            Launch
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[var(--accent-primary)] to-transparent group-hover:w-full transition-all duration-300"></span>
                        </Link>
                        <a
                            href="https://docs.base.org"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors relative group"
                        >
                            Docs
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[var(--accent-primary)] to-transparent group-hover:w-full transition-all duration-300"></span>
                        </a>
                    </div>

                    {/* Connect Wallet Button */}
                    <div>
                        {isConnected ? (
                            <div className="flex items-center gap-3 px-4 py-2 bg-[var(--surface)] border border-[var(--accent-primary)]/30 rounded-xl shadow-[0_0_20px_rgba(0,245,255,0.2)]">
                                <div className="text-sm text-[var(--text-secondary)]">
                                    {formatAddress(address)}
                                </div>
                                <div className="w-2 h-2 rounded-full bg-[var(--accent-tertiary)] animate-pulse shadow-[0_0_10px_rgba(0,255,136,0.6)]"></div>
                            </div>
                        ) : (
                            <Button onClick={connectWallet} variant="gradient" size="sm">
                                Connect Wallet
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};
