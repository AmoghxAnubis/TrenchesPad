'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '../ui';
import { motion } from 'framer-motion';

export const Navbar: React.FC = () => {
    const [isConnected, setIsConnected] = useState(false);
    const [address, setAddress] = useState('');

    const connectWallet = async () => {
        if (typeof window.ethereum !== 'undefined') {
            try {
                const accounts = await window.ethereum.request({
                    method: 'eth_requestAccounts'
                });
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
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed top-0 left-0 right-0 z-50 bg-[var(--bg-primary)]/80 backdrop-blur-md border-b border-[var(--border)]"
        >
            <div className="container mx-auto px-6">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <div className="text-2xl font-bold font-[family-name:var(--font-space-grotesk)]">
                            TrenchesPad
                        </div>
                    </Link>

                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link href="/dashboard" className="text-[var(--text-secondary)] hover:text-white transition-colors">
                            Campaigns
                        </Link>
                        <Link href="/create" className="text-[var(--text-secondary)] hover:text-white transition-colors">
                            Launch
                        </Link>
                        <a
                            href="https://docs.base.org"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[var(--text-secondary)] hover:text-white transition-colors"
                        >
                            Docs
                        </a>
                    </div>

                    {/* Connect Wallet Button */}
                    <div>
                        {isConnected ? (
                            <div className="flex items-center gap-3">
                                <div className="text-sm text-[var(--text-secondary)]">
                                    {formatAddress(address)}
                                </div>
                                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                            </div>
                        ) : (
                            <Button onClick={connectWallet} variant="primary" size="sm">
                                Connect Wallet
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </motion.nav>
    );
};
