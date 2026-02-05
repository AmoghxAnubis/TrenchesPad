import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    hover?: boolean;
    onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
    children,
    className = '',
    hover = true,
    onClick
}) => {
    const baseStyles = 'bg-[var(--surface)] border border-[var(--border)] rounded-[16px] p-6 transition-all duration-250';
    const hoverStyles = hover ? 'hover:border-[var(--border-hover)] hover:-translate-y-1 hover:shadow-lg cursor-pointer' : '';

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className={`${baseStyles} ${hoverStyles} ${className}`}
            onClick={onClick}
            whileHover={hover ? { scale: 1.01 } : {}}
        >
            {children}
        </motion.div>
    );
};
