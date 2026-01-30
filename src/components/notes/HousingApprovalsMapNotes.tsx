import React from 'react';

export const HousingApprovalsMapNotes = () => (
    <div className="space-y-4">
        <p>
            The data shows the number of dwelling units approved by the issue of building permits, regardless of the number of actual permits (eg. a single permit for a block of 50 apartments would count as 50). The time period shows is based on when the building permit was granted for the project.
        </p>

        <div>
            <p className="font-bold">Exclusions</p>
            <ul className="list-disc pl-5 mt-1 space-y-1">
                <li>Dwellings created by alterations/additions to existing dwellings are not included.</li>
                <li>Dwellings created by building work which is largely non-residential in nature (eg. a caretaker’s dwelling built as part of a new hospital) are also not included as dwelling units, though they are included in value of approval data.</li>
                <li>For more information on the building approvals dataset, please refer to <a href="https://www.abs.gov.au/statistics/industry/building-and-construction/building-approvals-australia/latest-release" target="_blank" className="text-blue-600 hover:underline">ABS – Building Approvals, Australia</a></li>
            </ul>
        </div>

        <div>
            <p className="font-bold">Definitions</p>
            <ul className="list-disc pl-5 mt-1 space-y-1">
                <li><span className="font-semibold">Houses</span> - Detached buildings primarily used for long term residential purposes consisting of one dwelling unit. Includes detached residences associated with a non-residential building, and kit and transportable homes.</li>
                <li><span className="font-semibold">Other</span> - Buildings other than houses which are primarily used for long-term residential purposes. Other residential buildings includes: semi-detached, row or terrace houses or townhouses; and flats, units or apartments.</li>
            </ul>
        </div>

        <p>
            On the map, building approvals are mapped to the SA1 (based on 2021 Census SA1s) where the dwelling was approved. Time periods shown are the quarters ended at the end of the particular month (eg. “Mar 2023” includes approvals from January 1 2023 to March 31 2023). Note that not all building approvals can be accurately coded to the SA1 level, so adding up SA1 totals will often be slightly lower than the LGA total. Revisions in subsequent quarterly updates sometimes revise building approval numbers for previous quarters so these may change.
        </p>
    </div>
);
