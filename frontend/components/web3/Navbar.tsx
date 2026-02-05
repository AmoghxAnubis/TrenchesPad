'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button, ThemeToggle } from '../ui';

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
        <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--bg-secondary)] border-b-brutal shadow-brutal transition-colors duration-300">
            <div className="container mx-auto px-6">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <div className="bg-[var(--accent-yellow)] border-brutal shadow-brutal px-4 py-2 brutal-hover hover:bg-[var(--accent-cyan)] transition-colors duration-300">
                            <span className="text-xl font-black font-[family-name:var(--font-space-grotesk)] uppercase">
                                TrenchesPad
                            </span>
                        </div>
                    </Link>

                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center gap-6">
                        {[
                            { href: '/dashboard', label: 'CAMPAIGNS', color: 'var(--accent-pink)' },
                            { href: '/create', label: 'LAUNCH', color: 'var(--accent-cyan)' },
                            { href: 'https://docs.base.org', label: 'DOCS', color: 'var(--accent-lime)', external: true },
                        ].map((link, i) => (
                            <Link
                                key={i}
                                href={link.href}
                                target={link.external ? '_blank' : undefined}
                                rel={link.external ? 'noopener noreferrer' : undefined}
                                className="font-black uppercase text-sm hover:scale-110 transition-all duration-200 relative group"
                            >
                                {link.label}
                                <span
                                    className="absolute bottom-0 left-0 w-0 h-1 group-hover:w-full transition-all duration-300"
                                    style={{ backgroundColor: link.color }}
                                ></span>
                            </Link>
                        ))}
                    </div>

                    {/* Theme Toggle & Connect Wallet */}
                    <div className="flex items-center gap-4">
                        <ThemeToggle />

                        {isConnected ? (
                            <div className="flex items-center gap-3 bg-[var(--accent-lime)] border-brutal shadow-brutal px-4 py-2 brutal-hover cursor-pointer">
                                <div className="text-sm font-black uppercase">
                                    {formatAddress(address)}
                                </div>
                                <div className="w-3 h-3 bg-[var(--border)] rounded-full pulse-brutal"></div>
                            </div>
                        ) : (
                            <Button
                                onClick={connectWallet}
                                variant="primary"
                                size="sm"
                                className="hover:scale-105 active:scale-95"
                            >
                                CONNECT
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};
