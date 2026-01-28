/**
 * Ckmeans 1D clustering algorithm.
 * 
 * Sourced/Adapted from simple-statistics (ISC/MIT).
 * 
 * @param data Input data (numbers)
 * @param nClusters Number of clusters
 * @returns Array of clusters
 */
export function ckmeans(data: number[], nClusters: number): number[][] {
    if (nClusters > data.length) {
        throw new Error('Cannot generate more classes than there are data values');
    }

    const sorted = data.slice().sort((a, b) => a - b);
    const uniqueCount = new Set(sorted).size;

    // if there are fewer unique values than clusters, we can't cluster properly 
    // (though ckmeans technically handles duplicates, for mapping we often just want distinct breaks)
    if (uniqueCount < nClusters) {
        nClusters = uniqueCount;
    }

    // Dynamic programming matrix
    const matrix = makeMatrix(nClusters + 1, sorted.length + 1);
    const backtrack = makeMatrix(nClusters + 1, sorted.length + 1);

    // Initialise first row
    for (let i = 1; i <= sorted.length; i++) {
        matrix[1][i] = ssq(sorted, 0, i);
        backtrack[1][i] = 0;
    }

    // Fill the rest
    for (let i = 2; i <= nClusters; i++) {
        for (let j = i; j <= sorted.length; j++) {
            let minSsq = Infinity;
            let bestK = 0;

            // Optimization: we don't need to check all k, but for simplicity we check a range
            // In the original algorithm there are bounds but this is the simplest O(N^2K) version
            for (let k = i - 1; k < j; k++) {
                const val = matrix[i - 1][k] + ssq(sorted, k, j);
                if (val < minSsq) {
                    minSsq = val;
                    bestK = k;
                }
            }
            matrix[i][j] = minSsq;
            backtrack[i][j] = bestK;
        }
    }

    // Backtrack to find clusters
    const clusters: number[][] = [];
    let currentClusterEnd = sorted.length;
    for (let i = nClusters; i > 0; i--) {
        const clusterStart = backtrack[i][currentClusterEnd];
        clusters.unshift(sorted.slice(clusterStart, currentClusterEnd));
        currentClusterEnd = clusterStart;
    }

    return clusters;
}

function makeMatrix(rows: number, cols: number): number[][] {
    const matrix = [];
    for (let i = 0; i < rows; i++) {
        matrix.push(new Array(cols).fill(0));
    }
    return matrix;
}

function ssq(data: number[], start: number, end: number): number {
    let sum = 0;
    let sumSq = 0;
    const n = end - start;
    if (n === 0) return 0;
    for (let i = start; i < end; i++) {
        const x = data[i];
        sum += x;
        sumSq += x * x;
    }
    const mean = sum / n;
    // variance * n = sum((x - mean)^2) = sum(x^2) - 2*mean*sum(x) + n*mean^2
    // = sumSq - 2*mean*(n*mean) + n*mean^2 = sumSq - n*mean^2
    return sumSq - n * mean * mean;
}
