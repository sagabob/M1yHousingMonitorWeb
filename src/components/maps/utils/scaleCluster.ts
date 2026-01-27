import { ckmeans } from './ckmeans';
import { scaleThreshold } from 'd3-scale';

/**
 * scaleCluster
 * 
 * Replicates d3-scale-cluster functionality.
 * Maps a continuous domain to a discrete range using CKMeans clustering.
 */
export function scaleCluster() {
    let _domain: number[] = [];
    let _range: string[] = [];

    // The underlying d3 scale that we update after clustering
    const scale = scaleThreshold<number, string>();

    function rescale() {
        if (_domain.length < 2 || _range.length < 2) return;

        // Remove null/undefined/NaN
        const validData = _domain.filter(d => typeof d === 'number' && !isNaN(d));
        if (validData.length === 0) return;

        // Number of clusters = number of colors
        const clusterCount = _range.length;

        try {
            const clusters = ckmeans(validData, clusterCount);

            // The breaks are the first value of each cluster (except the first one)
            // d3-scale-threshold uses domain as [break1, break2, ...] 
            // values < break1 -> range[0]
            // break1 <= values < break2 -> range[1] etc.

            // For ckmeans, clusters are [ [min, ...], [break1, ...], [break2, ...] ]
            // so the breaks are clusters[1][0], clusters[2][0]...

            if (clusters.length > 1) {
                const breaks = clusters.slice(1).map(c => c[0]);
                scale.domain(breaks).range(_range);
            } else {
                // Fallback if clustering fails or 1 cluster
                scale.domain([]).range(_range);
            }
        } catch (e) {
            console.warn("Clustering failed", e);
            scale.domain([]).range(_range);
        }
    }

    function fn(x: number) {
        return scale(x);
    }

    // Mimic D3 API
    fn.domain = function (d?: number[]) {
        if (!arguments.length) return _domain;
        _domain = d || [];
        rescale();
        return fn;
    };

    fn.range = function (r?: string[]) {
        if (!arguments.length) return _range;
        _range = r || [];
        rescale();
        return fn;
    };

    // Standard d3 methods to expose the underlying scale info
    fn.clusters = () => scale.domain();
    fn.invertExtent = (y: string) => scale.invertExtent(y);

    return fn;
}
