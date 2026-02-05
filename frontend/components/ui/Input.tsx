import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helperText?: string;
}

export const Input: React.FC<InputProps> = ({
    label,
    error,
    helperText,
    className = '',
    ...props
}) => {
    return (
        <div className="flex flex-col gap-2">
            {label && (
                <label className="text-sm font-black uppercase tracking-tight">
                    {label}
                </label>
            )}
            <input
                className={`
          bg-white 
          border-brutal
          px-4 py-3 
          text-black
          font-bold
          placeholder:text-[var(--text-muted)]
          placeholder:font-semibold
          focus:outline-none 
          focus:shadow-brutal
          focus:translate-x-[-2px]
          focus:translate-y-[-2px]
          transition-all
          duration-100
          ${error ? 'border-[var(--accent-pink)] bg-red-50' : ''}
          ${className}
        `}
                {...props}
            />
            {error && (
                <span className="text-sm font-bold text-[var(--accent-pink)] uppercase">{error}</span>
            )}
            {helperText && !error && (
                <span className="text-xs font-semibold text-[var(--text-muted)]">{helperText}</span>
            )}
        </div>
    );
};
