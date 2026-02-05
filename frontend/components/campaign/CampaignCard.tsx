import React from 'react';
import Link from 'next/link';
import { ProgressBar } from '../ui';

interface CampaignCardProps {
    id: string;
    name: string;
    tokenSymbol: string;
    description: string;
    currentAmount: number;
    goalAmount: number;
    deadline: Date;
    status: 'active' | 'funded' | 'failed';
    creator: string;
}

export const CampaignCard: React.FC<CampaignCardProps> = ({
    id,
    name,
    tokenSymbol,
    description,
    currentAmount,
    goalAmount,
    deadline,
    status,
    creator,
}) => {
    const getStatusColor = () => {
        switch (status) {
            case 'active': return 'yellow';
            case 'funded': return 'lime';
            case 'failed': return 'pink';
            default: return 'none';
        }
    };

    const getTimeRemaining = () => {
        const now = new Date();
        const diff = deadline.getTime() - now.getTime();

        if (diff <= 0) return 'Ended';

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

        if (days > 0) return `${days}d ${hours}h`;
        return `${hours}h`;
    };

    return (
        <Link href={`/campaign/${id}`}>
            <div className={`bg-[var(--bg-secondary)] border-brutal shadow-brutal p-6 brutal-hover cursor-pointer h-full flex flex-col border-l-[12px] border-l-[var(--accent-${getStatusColor()})]`}>
                {/* Status Badge */}
                <div className="mb-4">
                    <span
                        className={`inline-block px-3 py-1 text-xs font-black uppercase border-4 border-[var(--border)]`}
                        style={{ backgroundColor: `var(--accent-${getStatusColor()})` }}
                    >
                        {status}
                    </span>
                </div>

                {/* Campaign Name */}
                <h3 className="text-2xl font-black uppercase mb-2 hover:text-[var(--accent-pink)] transition-colors">
                    {name}
                </h3>

                {/* Token Symbol */}
                <div className="text-sm font-bold text-[var(--text-muted)] mb-3">
                    ${tokenSymbol}
                </div>

                {/* Description */}
                <p className="text-sm font-semibold mb-4 line-clamp-2 flex-grow">
                    {description}
                </p>

                {/* Progress Bar */}
                <div className="mb-4">
                    <ProgressBar
                        current={currentAmount}
                        goal={goalAmount}
                        showPercentage={true}
                    />
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-3 pt-4 border-t-4 border-[var(--border)]">
                    <div>
                        <div className="text-xs font-black uppercase text-[var(--text-muted)]">
                            Raised
                        </div>
                        <div className="text-lg font-black">
                            {currentAmount.toFixed(2)} ETH
                        </div>
                    </div>
                    <div>
                        <div className="text-xs font-black uppercase text-[var(--text-muted)]">
                            Time Left
                        </div>
                        <div className="text-lg font-black">
                            {getTimeRemaining()}
                        </div>
                    </div>
                </div>

                {/* Creator */}
                <div className="mt-3 pt-3 border-t-2 border-[var(--border)]">
                    <div className="text-xs font-bold text-[var(--text-muted)]">
                        By: {creator.slice(0, 6)}...{creator.slice(-4)}
                    </div>
                </div>
            </div>
        </Link>
    );
};
