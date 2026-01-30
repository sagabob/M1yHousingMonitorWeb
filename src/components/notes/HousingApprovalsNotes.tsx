
export const HousingApprovalsNotes = () => (
    <div className="space-y-4">
        <p>Residential building approvals are used as a leading indicator of the general level of residential development, economic activity, employment and investment. Residential building activity depends on many factors that vary with the state of the economy including interest rates, availability of mortgage funds, government spending, and business investment. The number of building approvals can fluctuate substantially from year to year simply as a result of the short-term nature of many construction projects, and the cyclical nature of the industry.</p>

        <p>The data shows the number of dwelling units approved by the issue of building permits, regardless of the number of actual permits (eg. a single permit for a block of 50 apartments would count as 50).</p>

        <div>
            <p className="font-bold">Exclusions</p>
            <ul className="list-disc pl-5 mt-1 space-y-1">
                <li>Dwellings created by alterations/additions to existing dwellings are not included.</li>
                <li>Dwellings created by building work which is largely non-residential in nature (eg. a caretaker’s dwelling built as part of a new hospital) are also not included as dwelling units, though they are included in value of approval data (not presented in profile.id).</li>
                <li>For more information on the building approvals dataset, please refer to ABS catalogue number 8731.0 – Building Approvals, Australia.</li>
            </ul>
        </div>
    </div>
);
