import React from 'react';

interface ProgressBarProps {
    current: number;
    goal: number;
    showPercentage?: boolean;
    className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
    current,
    goal,
    showPercentage = true,
    className = '',
}) => {
    const percentage = Math.min((current / goal) * 100, 100);
    const isComplete = percentage >= 100;

    return (
        <div className={`w-full ${className}`}>
            <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-black uppercase tracking-tight">
                    {current.toFixed(2)} ETH / {goal.toFixed(2)} ETH
                </span>
                {showPercentage && (
                    <span className={`text-sm font-black ${isComplete ? 'text-[var(--accent-lime)]' : 'text-[var(--accent-pink)]'}`}>
                        {percentage.toFixed(0)}%
                    </span>
                )}
            </div>
            <div className="w-full h-8 bg-white border-brutal shadow-brutal relative overflow-hidden">
                <div
                    style={{ width: `${percentage}%` }}
                    className={`h-full transition-all duration-500 ease-out border-r-4 border-black ${isComplete
                            ? 'bg-[var(--accent-lime)]'
                            : 'bg-[var(--accent-yellow)]'
                        }`}
                />
            </div>
        </div>
    );
};
