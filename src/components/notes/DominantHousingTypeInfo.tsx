import React from 'react';

interface DominantHousingTypeInfoProps {
    LGAName: string;
    benchmarkName: string;
}

const DominantHousingTypeInfo: React.FC<DominantHousingTypeInfoProps> = ({ LGAName, benchmarkName }) => {
    return (
        <div className="space-y-4">
            <p>
                This chart shows the broad housing types over the past three Censuses in {LGAName} compared
                to {benchmarkName}.
            </p>
            <p>
                Typically, the dominant dwelling type in most parts of Australia has been the separate
                house. But in recent years medium density (townhouses and 1-2 storey flats and units) has
                increased markedly in many areas, and high density (3+ storey flats, units and apartments)
                has increased dramatically in our CBDs and suburbs, particularly around transport corridors
                and activity centres. This increases the level of dwelling diversity and choice for people
                of different living arrangements in local areas. Time series housing type data should be
                looked at in conjunction with bedroom size on this page.
            </p>
        </div>
    );
};

export default DominantHousingTypeInfo;
