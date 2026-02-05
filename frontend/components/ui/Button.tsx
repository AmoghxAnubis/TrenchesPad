import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'gradient';
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
    const baseStyles = 'font-medium transition-all duration-300 ease-out rounded-xl disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group';

    const variantStyles = {
        primary: 'bg-white text-black hover:scale-105 hover:shadow-lg',
        secondary: 'bg-transparent text-white border-2 border-[var(--border)] hover:border-[var(--accent-primary)] hover:shadow-[0_0_20px_rgba(0,245,255,0.3)]',
        gradient: 'bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white hover:scale-105 hover:shadow-[0_0_30px_rgba(102,126,234,0.6)]',
    };

    const sizeStyles = {
        sm: 'px-5 py-2.5 text-sm',
        md: 'px-7 py-3.5 text-base',
        lg: 'px-9 py-4 text-lg',
    };

    return (
        <button
            className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
            disabled={disabled || isLoading}
            {...props}
        >
            {/* Gradient overlay on hover */}
            {variant === 'gradient' && (
                <span className="absolute inset-0 bg-gradient-to-r from-[#4facfe] to-[#00f2fe] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            )}

            <span className="relative z-10 flex items-center justify-center gap-2">
                {isLoading ? (
                    <>
                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Loading...
                    </>
                ) : (
                    children
                )}
            </span>
        </button>
    );
};
