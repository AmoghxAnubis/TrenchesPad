import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'accent';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
    children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
    variant = 'primary',
    size = 'md',
    isLoading = false,
    children,
    className = '',
    disabled,
    ...props
}) => {
    const baseStyles = 'font-black uppercase tracking-tight border-brutal shadow-brutal brutal-hover disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-100';

    const variantStyles = {
        primary: 'bg-[var(--accent-yellow)] text-black border-black hover:bg-[var(--accent-lime)]',
        secondary: 'bg-white text-black border-black hover:bg-[var(--accent-cyan)]',
        accent: 'bg-[var(--accent-pink)] text-white border-black hover:bg-[var(--accent-purple)]',
    };

    const sizeStyles = {
        sm: 'px-6 py-3 text-sm',
        md: 'px-8 py-4 text-base',
        lg: 'px-10 py-5 text-lg',
    };

    return (
        <button
            className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                    <span className="inline-block w-5 h-5 border-4 border-black border-t-transparent rounded-full animate-spin"></span>
                    LOADING...
                </span>
            ) : (
                children
            )}
        </button>
    );
};
