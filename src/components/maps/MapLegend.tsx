import React from 'react';
import { formatNumber } from './utils/map-utils';

interface MapLegendProps {
    scale: any; // Generic scale to support Quantile, Threshold, and custom Cluster
    title?: string;
}

export const MapLegend: React.FC<MapLegendProps> = ({ scale, title }) => {
    const range = scale.range ? scale.range() : [];

    if (!range || range.length === 0) return null;

    // Helper to get extent for a color index
    const getExtent = (i: number, color: string) => {
        // Option 1: Scale supports invertExtent (Threshold, Quantile, Quantize)
        if (typeof scale.invertExtent === 'function') {
            const extent = scale.invertExtent(color);
            // invertExtent returns [undefined, undefined] or similar if not set, or [min, max]
            return extent;
        }

        // Option 2: Scale has quantiles (Quantile)
        if (typeof scale.quantiles === 'function') {
            const quantiles = scale.quantiles();
            const domain = scale.domain();
            let min = domain[0];
            let max = domain[0];
            for (let k = 1; k < domain.length; k++) {
                if (domain[k] < min) min = domain[k];
                if (domain[k] > max) max = domain[k];
            }

            const low = i === 0 ? min : quantiles[i - 1];
            const high = i === range.length - 1 ? max : quantiles[i];
            return [low, high];
        }
        return [null, null];
    };

    return (
        <div className="bg-white/90 dark:bg-slate-900/90 p-3 rounded-md shadow-md text-xs absolute bottom-8 right-4 z-[1000] border border-gray-200 dark:border-gray-800 backdrop-blur-sm pointer-events-auto">
            {title && <div className="font-semibold mb-2">{title}</div>}
            <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                    <span
                        className="w-4 h-4 rounded-sm border border-gray-300 dark:border-gray-600 inline-block"
                        style={{ backgroundColor: '#ffffff' }}
                    />
                    <span className="text-gray-700 dark:text-gray-300">
                        0
                    </span>
                </div>
                {range.map((color: string, i: number) => {
                    let [low, high] = getExtent(i, color) || [null, null];

                    // Fix for open-ended threshold scales
                    if (i === 0 && (low === null || low === undefined)) {
                        // Try to get min from domain if available
                        const domainData = typeof scale.domain === 'function' ? scale.domain() : [];
                        // Safe min calculation for large arrays
                        let minVal = 0;
                        if (Array.isArray(domainData) && domainData.length > 0) {
                            minVal = domainData[0];
                            for (let k = 1; k < domainData.length; k++) {
                                if (domainData[k] < minVal) minVal = domainData[k];
                            }
                        }
                        // Ensure we don't show 0 if 0 is excluded (default to 1)
                        if (minVal < 1) minVal = 1;
                        low = minVal;
                    }

                    // Format label intelligently based on bounds
                    let label = 'N/A';
                    if (low !== null && low !== undefined && high !== null && high !== undefined) {
                        label = `${formatNumber(low)} – ${formatNumber(high)}`;
                    } else if (low !== null && low !== undefined) {
                        // High is open-ended (last bucket)
                        label = `${formatNumber(low)}+`;
                    } else if (high !== null && high !== undefined) {
                        // Low is open-ended (first bucket, though handled above)
                        label = `< ${formatNumber(high)}`;
                    }

                    if (label === 'N/A') return null;

                    return (
                        <div key={i} className="flex items-center gap-2">
                            <span
                                className="w-4 h-4 rounded-sm border border-gray-300 dark:border-gray-600 inline-block"
                                style={{ backgroundColor: color }}
                            />
                            <span className="text-gray-700 dark:text-gray-300">
                                {label}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

