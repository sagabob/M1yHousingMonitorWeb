import React from 'react';

interface LegendItem {
    label: string;
    color?: string;
}

interface CustomLegendProps {
    items: LegendItem[];
}

export const CustomLegend: React.FC<CustomLegendProps> = ({ items }) => {
    return (
        <div className="flex flex-wrap gap-4 justify-start my-2">
            {items.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                    <span
                        className="block w-3 h-3 rounded-full"
                        style={{ backgroundColor: item.color || '#ccc' }}
                    />
                    <span className="text-sm text-[#333333] font-medium">
                        {item.label}
                    </span>
                </div>
            ))}
        </div>
    );
};

export default CustomLegend;
