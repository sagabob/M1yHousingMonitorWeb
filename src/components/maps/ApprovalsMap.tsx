import React, { useState, useMemo } from 'react';
import { format, parseISO, isAfter, isBefore } from 'date-fns';
import { cn } from '@/lib/utils';
import { type SingleApprovalsPerQuarter } from '@/data-services/schemas/approvalsPerQuarterSchema';

import { ThematicMap } from './ThematicMap';
import { getColorScale, aggregateApprovalsData, type ApprovalsMapDataItem } from './utils/map-utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group';
import { COLOR_BORDER_DEFAULT, COLOR_BG_HOVER } from '@/ui/constants/ui-constants';
import { Label } from '../ui/label';
import ChartWrapper from '../charts/ChartWrapper';
import * as Datasource from '@/data-services/config/text-constants';
import { HousingApprovalsMapInfo } from '../notes/HousingApprovalsMapInfo';
import { HousingApprovalsMapNotes } from '../notes/HousingApprovalsMapNotes';

// --- Types ---

interface ApprovalsMapProps {
    data: ApprovalsMapDataItem[];
    pageContext: {
        geocode: string;
        alias: string;
    };
    title: string;
}

const DATA_TYPES = [
    { value: 'Total_Residential', label: 'Total' },
    { value: 'Houses', label: 'Houses' },
    { value: 'Other_residential', label: 'Other' }
];

// --- Sub-components ---

interface MapControlsProps {
    selectedType: string;
    onTypeChange: (val: string) => void;
    startPeriod: string;
    onStartChange: (val: string) => void;
    endPeriod: string;
    onEndChange: (val: string) => void;
    periodOptions: { value: string; label: string }[];
}

const MapControls: React.FC<MapControlsProps> = ({
    selectedType,
    onTypeChange,
    startPeriod,
    onStartChange,
    endPeriod,
    onEndChange,
    periodOptions
}) => {
    return (
        <div className="flex flex-wrap gap-4 mb-4 items-end">
            {/* Approval Type Toggle */}
            <div className="space-y-1">
                <Label>Approval Type</Label>
                <ToggleGroup type="single" value={selectedType} onValueChange={(val) => val && onTypeChange(val)} className="gap-0">
                    {DATA_TYPES.map((type, index) => (
                        <ToggleGroupItem
                            key={type.value}
                            value={type.value}
                            className={cn(
                                "px-3 py-1 h-7 text-xs border focus:z-10 bg-transparent data-[state=on]:text-white transition-colors",
                                "hover:bg-[var(--theme-hover)] data-[state=on]:bg-[var(--theme-active)]",
                                index === 0 && "rounded-r-none",
                                index > 0 && index < DATA_TYPES.length - 1 && "rounded-none border-l-0",
                                index === DATA_TYPES.length - 1 && "rounded-l-none border-l-0"
                            )}
                            style={{
                                borderColor: COLOR_BORDER_DEFAULT,
                                '--theme-active': COLOR_BORDER_DEFAULT,
                                '--theme-hover': COLOR_BG_HOVER,
                            } as React.CSSProperties}
                        >
                            {type.label}
                        </ToggleGroupItem>
                    ))}
                </ToggleGroup>
            </div>

            {/* Start Date Select */}
            <div className="space-y-1">
                <Label>From</Label>
                <Select value={startPeriod} onValueChange={onStartChange}>
                    <SelectTrigger className="w-[120px] h-7 text-xs focus:ring-0 focus:ring-offset-0 border border-housing-gray">
                        <SelectValue placeholder="Start Date" />
                    </SelectTrigger>
                    <SelectContent className="border border-housing-gray">
                        {periodOptions.map(p => (
                            <SelectItem
                                key={p.value}
                                value={p.value}
                                disabled={endPeriod ? isAfter(parseISO(p.value), parseISO(endPeriod)) : false}
                                className="text-xs"
                            >
                                {p.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* End Date Select */}
            <div className="space-y-1">
                <Label>To</Label>
                <Select value={endPeriod} onValueChange={onEndChange}>
                    <SelectTrigger className="w-[120px] h-7 text-xs focus:ring-0 focus:ring-offset-0 border border-housing-gray">
                        <SelectValue placeholder="End Date" />
                    </SelectTrigger>
                    <SelectContent className="border border-housing-gray">
                        {periodOptions.map(p => (
                            <SelectItem
                                key={p.value}
                                value={p.value}
                                disabled={startPeriod ? isBefore(parseISO(p.value), parseISO(startPeriod)) : false}
                                className="text-xs"
                            >
                                {p.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
};

// --- Main Component ---

/**
 * ApprovalsMap
 * 
 * Visualizes building approvals by SA1 area. 
 * Allows filtering by approval type (Total, Houses, Other) and time period.
 */
export const ApprovalsMap: React.FC<ApprovalsMapProps> = ({ data, pageContext, title }) => {
    const [selectedType, setSelectedType] = useState<string>('Total_Residential');
    const [startPeriod, setStartPeriod] = useState<string>('');
    const [endPeriod, setEndPeriod] = useState<string>('');

    // Extract all unique periods from the data
    const periods = useMemo(() => {
        if (!data || data.length === 0) return [];
        const firstItem = data[0];
        const approvals = (firstItem.data?.Approvals_Per_Quarter || []) as SingleApprovalsPerQuarter[];
        return approvals.map(a => a.Period).sort();
    }, [data]);

    // Initialize date selections
    React.useEffect(() => {
        if (periods.length > 0) {
            if (!startPeriod) setStartPeriod(periods[0]);
            if (!endPeriod) setEndPeriod(periods[periods.length - 1]);
        }
    }, [periods]);

    const formattedPeriods = useMemo(() => {
        return periods.map(p => ({
            value: p,
            label: format(parseISO(p), 'MMM yyyy')
        }));
    }, [periods]);

    // Aggregate data using utility
    const mapData = useMemo(() => {
        return aggregateApprovalsData(data, startPeriod, endPeriod, selectedType);
    }, [data, startPeriod, endPeriod, selectedType]);

    // Calculate dynamic color scale
    const colorScale = useMemo(() => {
        const values = mapData.map(d => d.Approvals);
        return getColorScale(values);
    }, [mapData]);

    const totalApprovals = useMemo(() => {
        return mapData.reduce((acc, curr) => acc + curr.Approvals, 0);
    }, [mapData]);

    if (!data || data.length === 0) {
        return (
            <div className="p-4 text-center text-gray-500">
                No data available for map.
            </div>
        );
    }

    const rawGeocode = pageContext.geocode.replace(/^LGA/, '');
    const geoJsonUrl = `/geo-data/sa1/${rawGeocode}_${pageContext.alias}_sa1.json`;

    return (
        <ChartWrapper
            title={title}
            subTitle="Approvals by SA1"
            dataSource={Datasource.MapBuildingApproval}
            dataNotes={<HousingApprovalsMapNotes />}
            chartInfo={<HousingApprovalsMapInfo />}
        >
            <MapControls
                selectedType={selectedType}
                onTypeChange={setSelectedType}
                startPeriod={startPeriod}
                onStartChange={setStartPeriod}
                endPeriod={endPeriod}
                onEndChange={setEndPeriod}
                periodOptions={formattedPeriods}
            />

            <div className="min-h-[500px] border rounded-md">
                <ThematicMap
                    data={mapData}
                    geoJsonUrl={geoJsonUrl}
                    joinField="SA1_MAIN21"
                    dataIdField="Area_Id"
                    valueField="Approvals"
                    colorScale={colorScale}
                    height={500}
                    title={`${DATA_TYPES.find(t => t.value === selectedType)?.label} Approvals`}
                    totalStats={`Total: ${totalApprovals.toLocaleString()}`}
                />
            </div>
        </ChartWrapper>
    );
};
