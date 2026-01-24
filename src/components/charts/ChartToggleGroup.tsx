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
    return (
        <div className={cn("flex justify-start d-print-none", className)}>
            <div className="flex items-center">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onChange('percent')}
                    className={cn(
                        "h-7 text-xs rounded-r-none border-r-0 focus:z-10",
                        value === 'percent' && "bg-[#8c94a3] text-white border-[#8c94a3] hover:bg-[#8c94a3] hover:text-white"
                    )}
                >
                    Percent
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onChange('number')}
                    className={cn(
                        "h-7 text-xs rounded-l-none focus:z-10",
                        value === 'number' && "bg-[#8c94a3] text-white border-[#8c94a3] hover:bg-[#8c94a3] hover:text-white"
                    )}
                >
                    Number
                </Button>
            </div>
        </div>
    );
};
