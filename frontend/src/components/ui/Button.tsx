import React, { type ButtonHTMLAttributes } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    cargando?: boolean;
    textoCarga?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    size = 'md',
    cargando = false,
    textoCarga,
    leftIcon,
    rightIcon,
    className = '',
    disabled,
    ...props
}) => {
    const variantStyles: Record<ButtonVariant, string> = {
        primary: 'bg-zinc-100 text-zinc-950 hover:bg-white border-transparent shadow-xs',
        secondary: 'bg-zinc-800 text-zinc-100 hover:bg-zinc-700/80 border-zinc-700/60 shadow-xs',
        outline: 'bg-transparent text-zinc-300 hover:text-zinc-100 hover:bg-zinc-800/60 border-zinc-800',
        ghost: 'bg-transparent text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40 border-transparent',
        danger: 'bg-rose-950/40 text-rose-300 hover:bg-rose-900/40 border-rose-900/50',
    };

    const sizeStyles: Record<ButtonSize, string> = {
        sm: 'text-xs py-1.5 px-3 rounded-md gap-1.5',
        md: 'text-xs py-2.5 px-4 rounded-lg gap-2',
        lg: 'text-sm py-3 px-5 rounded-lg gap-2.5',
    };

    return (
        <button
            disabled={disabled || cargando}
            className={`inline-flex items-center justify-center font-medium border transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
            {...props}
        >
            {cargando ? (
                <>
                    <svg
                        className="animate-spin w-3.5 h-3.5 text-current"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v8H4z"
                        />
                    </svg>
                    <span>{textoCarga || children}</span>
                </>
            ) : (
                <>
                    {leftIcon && <span className="shrink-0">{leftIcon}</span>}
                    {children}
                    {rightIcon && <span className="shrink-0">{rightIcon}</span>}
                </>
            )}
        </button>
    );
};
