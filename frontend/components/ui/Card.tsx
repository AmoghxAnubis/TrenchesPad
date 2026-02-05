import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    hover?: boolean;
    onClick?: () => void;
    gradient?: boolean;
}

export const Card: React.FC<CardProps> = ({
    children,
    className = '',
    hover = true,
    onClick,
    gradient = false
}) => {
    const baseStyles = 'bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 transition-all duration-300 backdrop-blur-sm';
    const hoverStyles = hover ? 'hover:border-[var(--accent-primary)] hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(102,126,234,0.4)] cursor-pointer' : '';
    const gradientStyles = gradient ? 'gradient-border' : '';

    return (
        <div
            className={`${baseStyles} ${hoverStyles} ${gradientStyles} ${className} group`}
            onClick={onClick}
        >
            {children}
        </div>
    );
};
