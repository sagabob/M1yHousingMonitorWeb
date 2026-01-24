import { scaleQuantile } from 'd3-scale';
import numeral from 'numeral';

// Standard 9-class Blues color scheme
export const COLOR_RANGE = [
    '#f7fbff',
    '#deebf7',
    '#c6dbef',
    '#9ecae1',
    '#6baed6',
    '#4292c6',
    '#2171b5',
    '#08519c',
    '#08306b',
];

export const getColorScale = (data: number[]) => {
    return scaleQuantile<string>()
        .domain(data) // domain takes an array of numbers
        .range(COLOR_RANGE);
};

export const formatNumber = (value: number | null | undefined, format: string = '0,0') => {
    if (value === null || value === undefined) return 'N/A';
    return numeral(value).format(format);
};
