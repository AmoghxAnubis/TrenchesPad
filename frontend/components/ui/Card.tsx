import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    hover?: boolean;
    onClick?: () => void;
    accent?: 'yellow' | 'cyan' | 'pink' | 'lime' | 'purple' | 'none';
}

export const Card: React.FC<CardProps> = ({
    children,
    className = '',
    hover = true,
    onClick,
    accent = 'none'
}) => {
    const baseStyles = 'bg-white border-brutal shadow-brutal p-6 transition-all duration-100';
    const hoverStyles = hover ? 'brutal-hover cursor-pointer' : '';

    const accentStyles = {
        yellow: 'border-l-[12px] border-l-[var(--accent-yellow)]',
        cyan: 'border-l-[12px] border-l-[var(--accent-cyan)]',
        pink: 'border-l-[12px] border-l-[var(--accent-pink)]',
        lime: 'border-l-[12px] border-l-[var(--accent-lime)]',
        purple: 'border-l-[12px] border-l-[var(--accent-purple)]',
        none: '',
    };

    return (
        <div
            className={`${baseStyles} ${hoverStyles} ${accentStyles[accent]} ${className}`}
            onClick={onClick}
        >
            {children}
        </div>
    );
};
