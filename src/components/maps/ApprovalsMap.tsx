import React, { useState, useMemo } from 'react';
// import { useApprovalsPerQuarter } from '../../data-services/hooks/useApprovalsPerQuarter';
import { ThematicMap } from './ThematicMap';
import { getColorScale } from './utils/map-utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group';
import { Label } from '../ui/label';
import { parseISO, format, isAfter, isBefore, isEqual } from 'date-fns';
import { type SingleApprovalsPerQuarter } from '../../data-services/schemas/approvalsPerQuarterSchema';
import { cn } from '@/lib/utils';

interface ApprovalsMapProps {
    data: any[]; // The raw data structure
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

export const ApprovalsMap: React.FC<ApprovalsMapProps> = ({ data, pageContext, title }) => {
    const [selectedType, setSelectedType] = useState<string>('Total_Residential');
    const [startPeriod, setStartPeriod] = useState<string>('');
    const [endPeriod, setEndPeriod] = useState<string>('');

    // Extract all unique periods from the first data item (assuming all have same periods)
    const periods = useMemo(() => {
        if (!data || data.length === 0) return [];
        const firstItem = data[0];
        const approvals = (firstItem.data?.Approvals_Per_Quarter as unknown as SingleApprovalsPerQuarter[]) || [];

        return approvals.map(a => a.Period).sort();
    }, [data]);

    // Initialize dates
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

    // Calculate aggregated data
    const mapData = useMemo(() => {
        if (!data || !startPeriod || !endPeriod) return [];

        const start = parseISO(startPeriod);
        const end = parseISO(endPeriod);

        return data.map(item => {
            const approvalsList = (item.data?.Approvals_Per_Quarter as unknown as SingleApprovalsPerQuarter[]) || [];

            const total = approvalsList.reduce((acc, curr) => {
                const currentPeriod = parseISO(curr.Period);
                // Inclusive range check
                if (
                    (isAfter(currentPeriod, start) || isEqual(currentPeriod, start)) &&
                    (isBefore(currentPeriod, end) || isEqual(currentPeriod, end))
                ) {
                    const val = (curr as any)[selectedType];
                    return acc + (typeof val === 'number' ? val : 0);
                }
                return acc;
            }, 0);

            return {
                Area_Id: item.sa1,
                Approvals: total
            };
        });
    }, [data, startPeriod, endPeriod, selectedType]);

    const colorScale = useMemo(() => {
        const values = mapData.map(d => d.Approvals);
        return getColorScale(values);
    }, [mapData]);

    const totalApprovals = useMemo(() => {
        return mapData.reduce((acc, curr) => acc + curr.Approvals, 0);
    }, [mapData]);

    if (!data || data.length === 0) {
        return (
            <div className="p-4 text-center">
                No data available for map. <br />
                Debug: {data === undefined ? 'undefined' : data === null ? 'null' : `Length: ${data.length}`} <br />
                Type: {typeof data}
            </div>
        );
    }

    const rawGeocode = pageContext.geocode.replace(/^LGA/, '');
    const geoJsonUrl = `/geo-data/sa1/${rawGeocode}_${pageContext.alias}_sa1.json`;

    return (
        <Card className="w-full bg-gray-50 shadow-none rounded-none border-none">
            <CardHeader className="pb-2">
                <CardTitle className="text-xl font-bold text-slate-800">{title}</CardTitle>
                <CardDescription>
                    Residential building approvals by SA1 quarterly.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-wrap gap-4 mb-4 items-end">
                    <div className="space-y-1">
                        <Label>Approval Type</Label>
                        <ToggleGroup type="single" value={selectedType} onValueChange={(val) => val && setSelectedType(val)} className="gap-0">
                            {DATA_TYPES.map((type, index) => (
                                <ToggleGroupItem
                                    key={type.value}
                                    value={type.value}
                                    className={cn(
                                        "px-3 py-1 h-7 text-xs border border-input focus:z-10 bg-transparent hover:bg-accent hover:text-accent-foreground data-[state=on]:bg-[#8c94a3] data-[state=on]:text-white data-[state=on]:border-[#8c94a3]",
                                        // First item
                                        index === 0 && "rounded-r-none",
                                        // Middle items
                                        index > 0 && index < DATA_TYPES.length - 1 && "rounded-none border-l-0",
                                        // Last item
                                        index === DATA_TYPES.length - 1 && "rounded-l-none border-l-0"
                                    )}
                                >
                                    {type.label}
                                </ToggleGroupItem>
                            ))}
                        </ToggleGroup>
                    </div>

                    <div className="space-y-1">
                        <Label>From</Label>
                        <Select value={startPeriod} onValueChange={setStartPeriod}>
                            <SelectTrigger className="w-[120px] h-7 text-xs focus:ring-0 focus:ring-offset-0">
                                <SelectValue placeholder="Start Date" />
                            </SelectTrigger>
                            <SelectContent>
                                {formattedPeriods.map(p => (
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

                    <div className="space-y-1">
                        <Label>To</Label>
                        <Select value={endPeriod} onValueChange={setEndPeriod}>
                            <SelectTrigger className="w-[120px] h-7 text-xs focus:ring-0 focus:ring-offset-0">
                                <SelectValue placeholder="End Date" />
                            </SelectTrigger>
                            <SelectContent>
                                {formattedPeriods.map(p => (
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

                <div className="min-h-[500px] border rounded-md">
                    {/* Dynamically import ThematicMap to avoid SSR issues with Leaflet if using Next.js, 
                       but this is Vite so static import is usually fine unless there are window issues. 
                       However, Leaflet often needs window. Check environment. */}
                    <ThematicMap
                        data={mapData}
                        geoJsonUrl={geoJsonUrl}
                        joinField="SA1_MAIN21" // Updated based on verification in plan
                        dataIdField="Area_Id"
                        valueField="Approvals"
                        colorScale={colorScale}
                        height={500}
                        title={`${DATA_TYPES.find(t => t.value === selectedType)?.label} Approvals`}
                        totalStats={`Total: ${totalApprovals.toLocaleString()}`}
                    />
                </div>
            </CardContent>
        </Card>
    );
};
