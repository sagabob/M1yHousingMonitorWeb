import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { COLOR_BORDER_DEFAULT, COLOR_BG_HOVER } from '@/ui/constants/ui-constants';

export type ChartDataType = 'percent' | 'number';

interface ChartToggleGroupProps {
    value: ChartDataType;
    onChange: (value: ChartDataType) => void;
    className?: string;
}

export const ChartToggleGroup: React.FC<ChartToggleGroupProps> = ({
    value,
    onChange,
    className
}) => {
    const options: { value: ChartDataType; label: string }[] = [
        { value: 'percent', label: 'Percent' },
        { value: 'number', label: 'Number' },
    ];
    return (
        <div className={cn("flex justify-start d-print-none", className)}>
            <div className="flex items-center">
                {options.map((option, index) => {
                    const isActive = value === option.value;
                    return (
                        <Button
                            key={option.value}
                            variant="outline"
                            size="sm"
                            onClick={() => onChange(option.value as ChartDataType)}
                            className={cn(
                                "h-7 text-[15px] focus:z-10",
                                index === 0 && "rounded-r-none border-r-0",
                                index === options.length - 1 && "rounded-l-none",
                                isActive && "text-white hover:text-white"
                            )}
                            style={{
                                borderColor: COLOR_BORDER_DEFAULT,
                                backgroundColor: isActive ? COLOR_BORDER_DEFAULT : 'transparent',
                                color: isActive ? 'white' : undefined,
                            }}
                            onMouseEnter={(e) => {
                                if (!isActive) e.currentTarget.style.backgroundColor = COLOR_BG_HOVER;
                            }}
                            onMouseLeave={(e) => {
                                if (!isActive) e.currentTarget.style.backgroundColor = 'transparent';
                            }}
                        >
                            {option.label}
                        </Button>
                    );
                })}
            </div>
        </div>
    );
};
