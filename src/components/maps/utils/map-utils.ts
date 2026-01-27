import { scaleCluster } from './scaleCluster';
import numeral from 'numeral';

// Standard 9-class Blues color scheme
export const COLOR_RANGE = [
    '#dadaeb',
    '#bcbddc',
    '#9e9ac8',
    '#807dba',
    '#6a51a3',
    '#54278f',
    '#3f007d',
];

export const getColorScale = (data: number[]) => {
    // Filter out 0 (and negative) values for the scale so they don't skew clusters
    // 0 values are handled explicitly in the map component with a white color
    const positiveValues = data.filter(d => d > 0);
    return (scaleCluster() as any)
        .domain(positiveValues)
        .range(COLOR_RANGE);
};

export const formatNumber = (value: number | null | undefined, format: string = '0,0') => {
    if (value === null || value === undefined) return 'N/A';
    return numeral(value).format(format);
};

import { parseISO, isAfter, isBefore, isEqual } from 'date-fns';
import { type SingleApprovalsPerQuarter } from '@/data-services/schemas/approvalsPerQuarterSchema';

export interface ApprovalsMapDataItem {
    data?: {
        Approvals_Per_Quarter?: SingleApprovalsPerQuarter[];
    };
    sa1: string;
}

export interface AggregatedMapData {
    Area_Id: string;
    Approvals: number;
}

/**
 * Aggregates approval data based on a date range and selected type.
 */
export const aggregateApprovalsData = (
    data: ApprovalsMapDataItem[],
    startPeriod: string,
    endPeriod: string,
    selectedType: string
): AggregatedMapData[] => {
    if (!data || !startPeriod || !endPeriod) return [];

    const start = parseISO(startPeriod);
    const end = parseISO(endPeriod);

    return data.map(item => {
        const approvalsList = (item.data?.Approvals_Per_Quarter || []) as SingleApprovalsPerQuarter[];

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
};

