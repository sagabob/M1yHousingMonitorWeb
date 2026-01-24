import React from 'react';
import type { ScaleQuantile } from 'd3-scale';
import { formatNumber } from './utils/map-utils';

interface MapLegendProps {
    scale: ScaleQuantile<string>;
    title?: string;
}

export const MapLegend: React.FC<MapLegendProps> = ({ scale, title }) => {
    const range = scale.range();
    const quantiles = scale.quantiles();
    const domain = scale.domain();

    if (!domain || domain.length === 0) return null;

    const min = Math.min(...domain);
    const max = Math.max(...domain);

    return (
        <div className="bg-white/90 dark:bg-slate-900/90 p-3 rounded-md shadow-md text-xs absolute bottom-8 right-4 z-[1000] border border-gray-200 dark:border-gray-800 backdrop-blur-sm pointer-events-auto">
            {title && <div className="font-semibold mb-2">{title}</div>}
            <div className="flex flex-col gap-1">
                {range.map((color, i) => {
                    const low = i === 0 ? min : quantiles[i - 1];
                    const high = i === range.length - 1 ? max : quantiles[i];

                    return (
                        <div key={i} className="flex items-center gap-2">
                            <span
                                className="w-4 h-4 rounded-sm border border-gray-300 dark:border-gray-600 inline-block"
                                style={{ backgroundColor: color }}
                            />
                            <span className="text-gray-700 dark:text-gray-300">
                                {formatNumber(low)} – {formatNumber(high)}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
