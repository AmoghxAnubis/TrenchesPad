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
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b-brutal shadow-brutal">
            <div className="container mx-auto px-6">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <div className="bg-[var(--accent-yellow)] border-brutal shadow-brutal px-4 py-2 brutal-hover">
                            <span className="text-xl font-black font-[family-name:var(--font-space-grotesk)] uppercase">
                                TrenchesPad
                            </span>
                        </div>
                    </Link>

                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center gap-6">
                        <Link
                            href="/dashboard"
                            className="font-black uppercase text-sm hover:text-[var(--accent-pink)] transition-colors"
                        >
                            CAMPAIGNS
                        </Link>
                        <Link
                            href="/create"
                            className="font-black uppercase text-sm hover:text-[var(--accent-cyan)] transition-colors"
                        >
                            LAUNCH
                        </Link>
                        <a
                            href="https://docs.base.org"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-black uppercase text-sm hover:text-[var(--accent-lime)] transition-colors"
                        >
                            DOCS
                        </a>
                    </div>

                    {/* Connect Wallet Button */}
                    <div>
                        {isConnected ? (
                            <div className="flex items-center gap-3 bg-[var(--accent-lime)] border-brutal shadow-brutal px-4 py-2">
                                <div className="text-sm font-black uppercase">
                                    {formatAddress(address)}
                                </div>
                                <div className="w-3 h-3 bg-black rounded-full"></div>
                            </div>
                        ) : (
                            <Button onClick={connectWallet} variant="primary" size="sm">
                                CONNECT
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};
