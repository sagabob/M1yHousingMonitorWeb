import { scaleQuantile } from 'd3-scale';
import numeral from 'numeral';

// Standard 9-class Blues color scheme
export const COLOR_RANGE = [
    '#fcfbfd',
    '#efedf5',
    '#dadaeb',
    '#bcbddc',
    '#9e9ac8',
    '#807dba',
    '#6a51a3',
    '#54278f',
    '#3f007d',
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
