import React from 'react';
import { motion } from 'framer-motion';

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
            <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-[var(--text-secondary)]">
                    {current.toFixed(2)} ETH / {goal.toFixed(2)} ETH
                </span>
                {showPercentage && (
                    <span className={`text-sm font-semibold ${isComplete ? 'text-white' : 'text-[var(--text-secondary)]'}`}>
                        {percentage.toFixed(1)}%
                    </span>
                )}
            </div>
            <div className="w-full h-2 bg-[var(--surface)] rounded-full overflow-hidden border border-[var(--border)]">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className={`h-full ${isComplete ? 'bg-white' : 'bg-gradient-to-r from-gray-400 to-gray-200'}`}
                />
            </div>
        </div>
    );
};
