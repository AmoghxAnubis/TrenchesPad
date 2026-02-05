import React, { useState } from 'react';
import { Button, Input } from '../ui';

interface ContributionFormProps {
    tokenSymbol: string;
    tokenPrice: number; // ETH per token
    onContribute: (amount: number) => void;
}

export const ContributionForm: React.FC<ContributionFormProps> = ({
    tokenSymbol,
    tokenPrice,
    onContribute,
}) => {
    const [ethAmount, setEthAmount] = useState('');
    const [error, setError] = useState('');

    const tokenAmount = ethAmount ? (parseFloat(ethAmount) / tokenPrice).toFixed(2) : '0';

    const handleContribute = () => {
        const amount = parseFloat(ethAmount);

        if (!ethAmount || amount <= 0) {
            setError('Enter valid amount');
            return;
        }

        if (amount < 0.01) {
            setError('Minimum 0.01 ETH');
            return;
        }

        onContribute(amount);
    };

    return (
        <div className="bg-[var(--accent-cyan)] border-brutal-thick shadow-brutal-lg p-8">
            <h3 className="text-2xl font-black uppercase mb-6">
                💰 CONTRIBUTE NOW
            </h3>

            <div className="space-y-4">
                <Input
                    label="Amount (ETH)"
                    type="number"
                    step="0.01"
                    placeholder="1.0"
                    value={ethAmount}
                    onChange={(e) => {
                        setEthAmount(e.target.value);
                        setError('');
                    }}
                    error={error}
                />

                {/* Token Preview */}
                <div className="bg-[var(--bg-secondary)] border-brutal shadow-brutal p-4">
                    <div className="text-xs font-black uppercase text-[var(--text-muted)] mb-2">
                        You'll Receive
                    </div>
                    <div className="text-3xl font-black">
                        {tokenAmount} ${tokenSymbol}
                    </div>
                </div>

                <Button
                    variant="accent"
                    size="lg"
                    onClick={handleContribute}
                    className="w-full pulse-brutal"
                >
                    CONTRIBUTE {ethAmount ? `${ethAmount} ETH` : ''}
                </Button>

                {/* Info */}
                <div className="bg-[var(--bg-secondary)] border-brutal p-3">
                    <div className="text-xs font-bold">
                        ⚡ Tokens minted instantly on contribution
                    </div>
                </div>
            </div>
        </div>
    );
};
