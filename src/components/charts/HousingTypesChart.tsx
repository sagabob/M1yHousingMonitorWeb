import React, { useState, useMemo, useCallback } from 'react';
import { isEmpty } from 'lodash';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
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

// --- Types ---

export interface DwellingStructureItem {
    DwellingStructure: string;
    [key: string]: any;
}

interface HousingTypesChartProps {
    data: DwellingStructureItem[];
    benchmarkData: DwellingStructureItem[];
    areaName: string;
    benchmarkName: string;
    dataNotes?: string;
    chartInfo?: string;
}

type DataType = 'percent' | 'number';

// --- Constants ---
const YEARS = [2006, 2011, 2016, 2021] as const;
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
            <strong className="block mb-1">{label}</strong>
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

const HousingTypesChart: React.FC<HousingTypesChartProps> = ({
    data,
    dataNotes,
    benchmarkData,
    areaName,
    benchmarkName,
}) => {
    const [dataType, setDataType] = useState<DataType>('percent');

    // CSS Variables - resolving to values for Recharts compatibility
    const getVar = (name: string) => typeof window !== 'undefined' ? getComputedStyle(document.body).getPropertyValue(name).trim() : '#000';
    const COLOR_PRIMARY = getVar('--primary') || '#7513b8';
    const COLOR_MUTED = getVar('--muted-foreground') || '#8c94a3';

    const changeToPercent = useCallback(() => setDataType('percent'), []);
    const changeToNumber = useCallback(() => setDataType('number'), []);

    // 1. Prepare Chart Data (Memoized)
    const chartData = useMemo(() => {
        if (isEmpty(data)) return [];

        const mappedData = data.map((item) => {
            const benchmarkNode = benchmarkData.find(
                (bmItem) => bmItem.DwellingStructure === item.DwellingStructure
            ) || ({} as DwellingStructureItem);

            const yearData = YEARS.map((year) => {
                const per = safeNumber(item[`Per_${year}`]);
                const per_bm = safeNumber(benchmarkNode[`Per_${year}`]);
                return {
                    year,
                    value: safeNumber(item[`Num_${year}`]),
                    per: roundToDecimal(per, 1),
                    value_bm: safeNumber(benchmarkNode[`Num_${year}`]),
                    per_bm: roundToDecimal(per_bm, 1),
                };
            });

            return {
                dwellingStructure: item.DwellingStructure,
                data: yearData,
            };
        });

        return mappedData.sort((a, b) => {
            const orderA = DWELLING_STRUCTURE_ORDER[a.dwellingStructure] ?? 99;
            const orderB = DWELLING_STRUCTURE_ORDER[b.dwellingStructure] ?? 99;
            return orderA - orderB;
        });
    }, [data, benchmarkData]);

    // 2. Calculate Max Value & Ticks (Memoized)
    const { ticks } = useMemo(() => {
        if (isEmpty(chartData)) return { ticks: [0, 100] };

        // Efficiently find max value without heavy lodash chaining
        let currentMax = 0;

        chartData.forEach(chart => {
            chart.data.forEach(d => {
                if (dataType === 'number') {
                    if (d.value > currentMax) currentMax = d.value;
                } else {
                    if (d.per > currentMax) currentMax = d.per;
                    if (d.per_bm > currentMax) currentMax = d.per_bm;
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
            title="What is the dominant housing type?"
            subTitle="Dwellings by dwelling type, 2006 to 2021"
            dataSource={Datasource.ABS2006}
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
                    {chartData.map(({ dwellingStructure, data }) => (
                        <div className="col-span-1 min-w-0" key={dwellingStructure}>
                            <div className="w-full h-[200px]">
                                <ResponsiveContainer>
                                    <BarChart data={data} margin={{ top: 10, left: 0, right: 0 }}>
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
                                        <XAxis dataKey="year" tick={{ fontSize: 11 }} />
                                        <Tooltip
                                            content={(props) => <CustomTooltipContent {...(props as any)} dataType={dataType} />}
                                            cursor={{ fill: 'transparent' }}
                                        />

                                        {dataType === 'percent' && (
                                            <Bar dataKey="per" fill={COLOR_PRIMARY} name={areaName} />
                                        )}
                                        {dataType === 'percent' && (
                                            <Bar dataKey="per_bm" fill={COLOR_MUTED} name={benchmarkName} />
                                        )}
                                        {dataType === 'number' && (
                                            <Bar dataKey="value" fill={COLOR_PRIMARY} name="LGA" />
                                        )}
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="text-center mt-2">
                                <ChartIcon dwellingType={dwellingStructure} className="w-10 h-10 mb-1" />
                                <span className="font-medium text-xs leading-tight block">
                                    {dwellingStructure}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </ChartWrapper>
    );
};

export default HousingTypesChart;
