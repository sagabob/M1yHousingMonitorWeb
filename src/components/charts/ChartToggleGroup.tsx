import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

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
                                "h-7 text-[15px] focus:z-10 border border-[#5f6062]",
                                index === 0 && "rounded-r-none border-r-0",
                                index === options.length - 1 && "rounded-l-none",
                                isActive && "bg-[#5f6062] text-white hover:bg-[#5f6062] hover:text-white"
                            )}
                        >
                            {option.label}
                        </Button>
                    );
                })}
            </div>
        </div>
    );
};
