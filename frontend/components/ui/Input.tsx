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
                <label className="text-sm font-medium text-[var(--text-secondary)] tracking-wide">
                    {label}
                </label>
            )}
            <input
                className={`
          bg-[var(--surface)] 
          border border-[var(--border)] 
          rounded-lg 
          px-4 py-3 
          text-[var(--text-primary)] 
          placeholder:text-[var(--text-muted)]
          focus:outline-none 
          focus:border-[var(--border-hover)]
          focus:ring-1
          focus:ring-[var(--border-hover)]
          transition-all
          duration-200
          ${error ? 'border-red-900 bg-red-950/20' : ''}
          ${className}
        `}
                {...props}
            />
            {error && (
                <span className="text-sm text-red-400">{error}</span>
            )}
            {helperText && !error && (
                <span className="text-xs text-[var(--text-muted)]">{helperText}</span>
            )}
        </div>
    );
};
