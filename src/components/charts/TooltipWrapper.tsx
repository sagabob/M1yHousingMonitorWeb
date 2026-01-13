import React from 'react';
import type { ReactNode } from 'react';

interface TooltipWrapperProps {
    children: ReactNode;
    className?: string;
    style?: React.CSSProperties;
}

export const TooltipWrapper: React.FC<TooltipWrapperProps> = ({ children, className, style }) => {
    return (
        <div
            className={`bg-white p-2 border border-slate-200 shadow-md rounded-md ${className || ''}`}
            style={style}
        >
            {children}
        </div>
    );
};

export default TooltipWrapper;
