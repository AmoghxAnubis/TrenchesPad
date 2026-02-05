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
                <span className="text-sm text-[var(--text-secondary)] font-medium">
                    {current.toFixed(2)} ETH / {goal.toFixed(2)} ETH
                </span>
                {showPercentage && (
                    <span className={`text-sm font-bold ${isComplete ? 'text-gradient-cyan' : 'text-[var(--accent-primary)]'}`}>
                        {percentage.toFixed(1)}%
                    </span>
                )}
            </div>
            <div className="w-full h-3 bg-[var(--surface)] rounded-full overflow-hidden border border-[var(--border)] relative">
                <div
                    style={{ width: `${percentage}%` }}
                    className={`h-full transition-all duration-1000 ease-out ${isComplete
                            ? 'bg-gradient-to-r from-[#43e97b] to-[#38f9d7] shadow-[0_0_15px_rgba(67,233,123,0.6)]'
                            : 'bg-gradient-to-r from-[#667eea] to-[#764ba2] shadow-[0_0_15px_rgba(102,126,234,0.6)]'
                        }`}
                />
            </div>
        </div>
    );
};
