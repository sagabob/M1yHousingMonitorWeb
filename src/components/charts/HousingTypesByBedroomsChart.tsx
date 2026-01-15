import React, { useState, useMemo, useCallback } from 'react';
import { isEmpty, groupBy, map, sortBy } from 'lodash';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    Label,
} from 'recharts';
import { scaleLinear } from 'd3-scale';
import {
    LandcomHouseIcon,
    LandcomTownhousesIcon,
    LandcomApartmentsIcon,
} from '../icons/landcom-icons';
import ChartWrapper from './ChartWrapper';
import { Button } from '@/components/ui/button';
import { CustomLegend } from './CustomLegend';
import { formatPercentage } from '@/data-services/data-utils/core-utils';
import TooltipWrapper from './TooltipWrapper';
import * as Datasource from '@/data-services/config/text-constants';
import { ErrorMessageChart } from './ErrorMessageChart';
import type { DwellingTypeBedrooms } from '@/data-services/api/getDwellingStructureData';

// --- Types ---
interface HousingTypesByBedroomsChartProps {
    data: DwellingTypeBedrooms[];
    areaName: string;
    dataNotes?: string;
}

type DataType = 'percent' | 'number';

// --- Constants ---
const DWELLING_STRUCTURE_ORDER: Record<string, number> = {
    'Separate house': 1,
    'Medium density': 2,
    'High density': 3
};

// --- Helper Functions ---
const formatNumber = (value: number): string => {
    return value.toLocaleString(undefined, { maximumFractionDigits: 0 });
};

const safeNumber = (value: unknown): number => {
    const num = Number(value);
    return isNaN(num) ? 0 : num;
};

const roundToDecimal = (value: number, decimals: number): number => {
    return Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
};

// Extract the starting number from bedroom string for sorting
// Handles formats like "0-2", "3", "4+", "0-1", "2", "3+" etc.
const getStartNumber = (bedroomStr: string): number => {
    const match = bedroomStr.match(/^(\d+)/);
    return match ? parseInt(match[1], 10) : 999;
};

// --- Sub-Components ---
const ChartIcon = React.memo(({ dwellingType, className }: { dwellingType: string, className?: string }) => {
    const iconClass = `w-12 h-12 text-primary mx-auto mb-2 ${className || ''}`;

    switch (dwellingType) {
        case 'Separate house':
            return <LandcomHouseIcon className={iconClass} />;
        case 'Medium density':
            return <LandcomTownhousesIcon className={iconClass} />;
        case 'High density':
            return <LandcomApartmentsIcon className={iconClass} />;
        default:
            return null;
    }
});
ChartIcon.displayName = 'ChartIcon';

interface TooltipPayloadItem {
    name: string;
    value: number;
    color: string;
}

interface CustomTooltipContentProps {
    active?: boolean;
    payload?: TooltipPayloadItem[];
    label?: string;
    dataType: DataType;
}

const CustomTooltipContent = React.memo(({ active, payload, label, dataType }: CustomTooltipContentProps) => {
    if (!active || !payload || payload.length === 0) {
        return null;
    }

    return (
        <TooltipWrapper>
            <strong className="block mb-1">{label} bedrooms</strong>
            {payload.map((item, index) => (
                <div
                    key={index}
                    className="text-sm"
                    style={{ color: item.color }}
                >
                    {item.name}:{' '}
                    {dataType === 'percent'
                        ? formatPercentage(item.value ?? 0)
                        : formatNumber(item.value ?? 0)}
                </div>
            ))}
        </TooltipWrapper>
    );
});
CustomTooltipContent.displayName = 'CustomTooltipContent';

// --- Main Component ---
const HousingTypesByBedroomsChart: React.FC<HousingTypesByBedroomsChartProps> = ({
    data,
    areaName,
    dataNotes,
}) => {
    const [dataType, setDataType] = useState<DataType>('percent');

    // CSS Variables - resolving to values for Recharts compatibility
    const getVar = (name: string) => typeof window !== 'undefined' ? getComputedStyle(document.body).getPropertyValue(name).trim() : '#000';
    const COLOR_PRIMARY = getVar('--primary') || '#7513b8';
    const COLOR_MUTED = getVar('--muted-foreground') || '#8c94a3';

    const changeToPercent = useCallback(() => setDataType('percent'), []);
    const changeToNumber = useCallback(() => setDataType('number'), []);

    // Get benchmark name from first data item
    const benchmarkName = useMemo(() => {
        return data.length > 0 ? data[0].Benchmark_Name || '' : '';
    }, [data]);

    // 1. Prepare Chart Data (Memoized) - Group by dwelling structure and sort by bedroom number
    const chartData = useMemo(() => {
        if (isEmpty(data)) return [];

        const grouped = groupBy(data, 'Dwelling_Structure');
        
        return map(grouped, (value, key) => {
            const sorted = sortBy(value, (item) => {
                return getStartNumber(item.Bedroom_Number);
            });

            return {
                type: key,
                data: sorted.map(item => ({
                    Bedroom_Number: item.Bedroom_Number,
                    Num_2021: safeNumber(item.Num_2021),
                    Per_2021: roundToDecimal(safeNumber(item.Per_2021), 1),
                    bNum_2021: safeNumber(item.bNum_2021),
                    bPer_2021: roundToDecimal(safeNumber(item.bPer_2021), 1),
                })),
            };
        }).sort((a, b) => {
            const orderA = DWELLING_STRUCTURE_ORDER[a.type] ?? 99;
            const orderB = DWELLING_STRUCTURE_ORDER[b.type] ?? 99;
            return orderA - orderB;
        });
    }, [data]);

    // 2. Calculate Max Value & Ticks (Memoized)
    const { ticks } = useMemo(() => {
        if (isEmpty(chartData)) return { ticks: [0, 100] };

        let currentMax = 0;

        chartData.forEach(chart => {
            chart.data.forEach(d => {
                if (dataType === 'number') {
                    if (d.Num_2021 > currentMax) currentMax = d.Num_2021;
                } else {
                    if (d.Per_2021 > currentMax) currentMax = d.Per_2021;
                    if (d.bPer_2021 > currentMax) currentMax = d.bPer_2021;
                }
            });
        });

        const safeMax = currentMax || 100;

        const scale = scaleLinear()
            .domain([0, safeMax])
            .nice(4);

        return {
            ticks: scale.ticks(4)
        };
    }, [chartData, dataType]);

    // 3. Formatters (Memoized)
    const yAxisFormatter = useCallback((value: number) => {
        if (value === 0) return '0';
        return dataType === 'percent' ? `${value}%` : formatNumber(value);
    }, [dataType]);

    const legendItems = useMemo(() => {
        const items = [{ label: areaName, color: COLOR_PRIMARY }];
        if (dataType === 'percent') {
            items.push({ label: benchmarkName, color: COLOR_MUTED });
        }
        return items;
    }, [areaName, benchmarkName, dataType, COLOR_PRIMARY, COLOR_MUTED]);

    if (isEmpty(data)) {
        return <ErrorMessageChart />;
    }

    return (
        <ChartWrapper
            title="What is the mix of housing?"
            subTitle="Occupied dwellings by dwelling type and no. of bedrooms, 2021"
            dataSource={Datasource.ABS2021}
            dataNotes={dataNotes}
        >
            <div className="mb-4 flex flex-col gap-4">
                {/* Controls */}
                <div className="flex justify-start d-print-none">
                    <div className="flex items-center">
                        <Button
                            variant={dataType === 'percent' ? 'secondary' : 'outline'}
                            size="sm"
                            onClick={changeToPercent}
                            className={`h-7 text-xs rounded-r-none border-r-0 focus:z-10 ${dataType === 'percent' ? 'text-white' : ''}`}
                        >
                            Percent
                        </Button>
                        <Button
                            variant={dataType === 'number' ? 'secondary' : 'outline'}
                            size="sm"
                            onClick={changeToNumber}
                            className={`h-7 text-xs rounded-l-none focus:z-10 ${dataType === 'number' ? 'text-white' : ''}`}
                        >
                            Number
                        </Button>
                    </div>
                </div>

                {/* Legend */}
                <CustomLegend items={legendItems} />

                {/* Charts Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {chartData.map(({ type, data }) => (
                        <div className="col-span-1 min-w-0" key={type}>
                            <div className="w-full h-[200px]">
                                <ResponsiveContainer>
                                    <BarChart data={data} margin={{ top: 10, left: 0, right: 0, bottom: 25 }}>
                                        <CartesianGrid vertical={false} strokeDasharray="3 3" />
                                        <YAxis
                                            tickLine={false}
                                            tickFormatter={yAxisFormatter}
                                            type="number"
                                            domain={[0, ticks[ticks.length - 1]]}
                                            ticks={ticks}
                                            width={48}
                                            tick={{ fontSize: 11 }}
                                        />
                                        <XAxis 
                                            dataKey="Bedroom_Number" 
                                            tick={{ fontSize: 11 }}
                                        >
                                            <Label
                                                value="Bedrooms"
                                                offset={-5}
                                                position="insideBottom"
                                                style={{ fontSize: 11 }}
                                            />
                                        </XAxis>
                                        <Tooltip
                                            content={(props) => <CustomTooltipContent {...(props as any)} dataType={dataType} />}
                                            cursor={{ fill: 'transparent' }}
                                        />

                                        {dataType === 'percent' && (
                                            <Bar dataKey="Per_2021" fill={COLOR_PRIMARY} name={areaName} />
                                        )}
                                        {dataType === 'percent' && (
                                            <Bar dataKey="bPer_2021" fill={COLOR_MUTED} name={benchmarkName} />
                                        )}
                                        {dataType === 'number' && (
                                            <Bar dataKey="Num_2021" fill={COLOR_PRIMARY} name="LGA" />
                                        )}
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="text-center mt-3">
                                <ChartIcon dwellingType={type} className="w-10 h-10 mb-1" />
                                <span className="font-medium text-xs leading-tight block">
                                    {type}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </ChartWrapper>
    );
};

export default HousingTypesByBedroomsChart;
