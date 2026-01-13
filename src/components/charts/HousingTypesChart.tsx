import React, { useState } from 'react';
import { flatMapDeep, flow, find, max, map, isEmpty } from 'lodash';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from 'recharts';
import numeral from 'numeral';
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

// Type Definitions
export interface DwellingStructureItem {
    DwellingStructure: string;
    [key: string]: any; // Allow dynamic access for Num_2021 etc
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

const HousingTypesChart: React.FC<HousingTypesChartProps> = ({
    data,
    dataNotes,
    benchmarkData,
    areaName,
    benchmarkName,
}) => {
    const [dataType, setDataType] = useState<DataType>('percent');

    const changeToPercent = () => setDataType('percent');
    const changeToNumber = () => setDataType('number');

    const COLOR_PRIMARY = "var(--primary)";
    const COLOR_MUTED = "var(--muted-foreground)";

    try {
        if (isEmpty(data)) {
            return <ErrorMessageChart />;
        }

        const chartData = data.map((item) => {
            const benchmarkNode = find(
                benchmarkData,
                (bmItem) => bmItem.DwellingStructure === item.DwellingStructure
            ) || ({} as DwellingStructureItem);

            const years = [2006, 2011, 2016, 2021];
            const yearData = years.map((year) => ({
                year: year,
                value: item[`Num_${year}`],
                per: item[`Per_${year}`],
                value_bm: benchmarkNode[`Num_${year}`],
                per_bm: benchmarkNode[`Per_${year}`],
            }));

            return {
                dwellingStructure: item.DwellingStructure,
                data: yearData,
            };
        }).sort((a, b) => {
            const order: Record<string, number> = {
                'Separate house': 1,
                'Medium density': 2,
                'High density': 3
            };
            const orderA = order[a.dwellingStructure] || 99;
            const orderB = order[b.dwellingStructure] || 99;
            return orderA - orderB;
        });

        // Calculate max value for Y-axis scaling
        const maxValue = flow([
            (x: typeof chartData) =>
                flatMapDeep(x, ({ data }) => {
                    return map(data, (item) =>
                        dataType === 'number'
                            ? item.value
                            : [item.per, item.per_bm]
                    );
                }),
            max,
        ])(chartData) || 100;

        const ticksScale = scaleLinear()
            .domain([0, maxValue])
            .nice(4);

        const ticks = ticksScale.ticks(4);

        const yAxisFormatter = (value: number) => {
            if (value === 0) return '0';
            return dataType === 'percent'
                ? `${numeral(value).format('0[.]0')}%`
                : value.toLocaleString(undefined, { maximumFractionDigits: 0 });
        };

        const getLegendItems = () => {
            const items = [{ label: areaName, color: COLOR_PRIMARY }];

            if (dataType === 'percent') {
                items.push({ label: benchmarkName, color: COLOR_MUTED });
            }

            return items;
        };

        const ChartIcon = ({ dwellingType, className }: { dwellingType: string, className?: string }) => {
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
        };
        const CustomTooltip = ({ active, payload, label }: any) => {
            if (active && payload && payload.length) {
                return (
                    <TooltipWrapper>
                        <strong className="block mb-1">{label}</strong>
                        {payload.map((item: any, key: number) => (
                            <div
                                key={key}
                                className="text-sm"
                                style={{ color: item.color }}
                            >
                                {item.name}:{' '}
                                {dataType === 'percent'
                                    ? formatPercentage(item.value)
                                    : item.value.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                            </div>
                        ))}
                    </TooltipWrapper>
                );
            }
            return null;
        };



        const charts = chartData.map(({ dwellingStructure, data }, index) => {
            return (
                <div className="col-span-1 min-w-0" key={index}>
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
                                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
                                {dataType === 'percent' && (
                                    <Bar
                                        dataKey="per"
                                        fill={COLOR_PRIMARY}
                                        name={areaName}
                                    />
                                )}
                                {dataType === 'percent' && (
                                    <Bar
                                        dataKey="per_bm"
                                        fill={COLOR_MUTED}
                                        name={benchmarkName}
                                    />
                                )}

                                {dataType === 'number' && (
                                    <Bar
                                        dataKey="value"
                                        fill={COLOR_PRIMARY}
                                        name="LGA"
                                    />
                                )}
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="text-center mt-2">
                        <ChartIcon dwellingType={dwellingStructure} className="w-10 h-10 mb-1" />
                        <span className="font-medium text-xs leading-tight block">{dwellingStructure}</span>
                    </div>
                </div>
            );
        });

        return (
            <ChartWrapper
                title={`What is the dominant housing type?`}
                subTitle={`Dwellings by dwelling type, 2006 to 2021`}
                dataSource={Datasource.ABS2006}
                dataNotes={dataNotes}

            >
                <div className="mb-4 flex flex-col gap-4">
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
                    <CustomLegend items={getLegendItems()} />
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {charts}
                    </div>
                </div>
            </ChartWrapper>
        );
    } catch (error) {
        console.error("Chart Error:", error);
        return <ErrorMessageChart />;
    }
};

export default HousingTypesChart;
