import React, { useMemo } from 'react';
import { isEmpty, last } from 'lodash';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    Label
} from 'recharts';
import ChartWrapper from './ChartWrapper';
import { useChartTheme } from '@/hooks/useChartTheme';
import { CustomLegend } from './CustomLegend';
import TooltipWrapper from './TooltipWrapper';
import * as Datasource from '@/data-services/config/text-constants';
import { ErrorMessageChart } from './ErrorMessageChart';
import type { BuildingApprovalsLGA } from '@/data-services/schemas/buildingApprovalsLGA.schema';

// --- Types ---

interface HousingApprovalsChartProps {
    data: BuildingApprovalsLGA | null | undefined;
    dataNotes?: string;
    chartInfo?: string;
}

// --- Helper Functions ---
const formatNumber = (value: number): string => {
    return value.toLocaleString(undefined, { maximumFractionDigits: 0 });
};

// --- Sub-Components ---

interface TooltipPayloadItem {
    name: string;
    value: number;
    color: string;
}

interface CustomTooltipContentProps {
    active?: boolean;
    payload?: TooltipPayloadItem[];
    label?: string;
}

const CustomTooltipContent = React.memo(({ active, payload, label }: CustomTooltipContentProps) => {
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
                    {item.name}: {formatNumber(item.value ?? 0)}
                </div>
            ))}
        </TooltipWrapper>
    );
});
CustomTooltipContent.displayName = 'CustomTooltipContent';

// --- Main Component ---

const HousingApprovalsChart: React.FC<HousingApprovalsChartProps> = ({
    data,
    dataNotes,
    chartInfo,
}) => {
    const theme = useChartTheme();
    const COLOR_PRIMARY = theme.primary;
    const COLOR_MUTED = theme.chart1;

    const chartData = useMemo(() => {
        if (!data || isEmpty(data.LGA)) return [];
        return data.LGA;
    }, [data]);

    const legendItems = useMemo(() => {
        return [
            { label: 'Houses', color: COLOR_PRIMARY },
            { label: 'Other types', color: COLOR_MUTED }
        ];
    }, [COLOR_PRIMARY, COLOR_MUTED]);

    if (isEmpty(chartData)) {
        return <ErrorMessageChart />;
    }

    const lastYearLabel = last(chartData)?.Year_Label || '';
    const dynamicChartNotes = lastYearLabel.includes('*')
        ? 'Current financial year to date'
        : null;

    return (
        <ChartWrapper
            title="How are residential building approvals tracking?"
            subTitle="Approvals by dwelling type"
            dataSource={Datasource.ChartBuildingApproval}
            dataNotes={dataNotes}
            chartInfo={chartInfo}
        >
            <div className="mb-4 flex flex-col gap-4">
                {/* Legend */}
                <CustomLegend items={legendItems} />

                {/* Chart */}
                <div className="w-full h-[360px]">
                    <ResponsiveContainer>
                        <BarChart data={chartData} margin={{ top: 10, left: 0, right: 0, bottom: 25 }}>
                            <CartesianGrid vertical={false} strokeDasharray="3 3" />
                            <YAxis
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={formatNumber}
                                domain={['auto', 'auto']}
                                width={48}
                                tick={{ fontSize: 11 }}
                            />
                            <XAxis
                                dataKey="Year_Label"
                                tick={{ fontSize: 11 }}
                            >
                                <Label
                                    value={Datasource.FinancialYearChartLabel}
                                    offset={-5}
                                    position="insideBottom"
                                    style={{ fontSize: 11 }}
                                />
                            </XAxis>
                            <Tooltip
                                content={(props) => <CustomTooltipContent {...(props as any)} />}
                                cursor={{ fill: '#eee' }}
                            />

                            <Bar
                                dataKey="Number_House"
                                stackId="a"
                                fill={COLOR_PRIMARY}
                                name="Houses"
                            />
                            <Bar
                                dataKey="Number_Other"
                                stackId="a"
                                fill={COLOR_MUTED}
                                name="Other types"
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                {dynamicChartNotes && (
                    <div className="text-xs text-gray-500 italic mt-2">
                        * {dynamicChartNotes}
                    </div>
                )}
            </div>
        </ChartWrapper>
    );
};

export default HousingApprovalsChart;
