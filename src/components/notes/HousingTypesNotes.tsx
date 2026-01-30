
export const HousingTypesNotes = () => (
    <div className="space-y-4">
        <p>Dwelling type is an important indication of an area’s housing diversity. The residential built form often reflects market opportunities or planning policy, such as building denser forms of housing around public transport nodes or employment centres.</p>

        <div>
            <p className="font-bold">Separate house</p>
            <p>Includes all free-standing dwellings separated from neighbouring dwellings.</p>
        </div>

        <div>
            <p className="font-bold">Medium density</p>
            <p>Includes all semi-detached, row, terrace, townhouses and villa units, plus flats and apartments in blocks of 1 or 2 storeys, and flats attached to houses.</p>
        </div>

        <div>
            <p className="font-bold">High density</p>
            <p>Includes flats and apartments in 3 storey and larger blocks.</p>
        </div>

        <div>
            <p className="font-bold">Not included (but a part of total dwelling stock for calculation of percentages)</p>
            <ul className="list-disc pl-5 mt-1 space-y-1">
                <li>Caravans, cabins, houseboats, includes all such mobile accommodation, both inside and outside caravan parks (including caravans in private backyards.</li>
                <li>Other includes houses and flats attached to shops or offices, and improvised homes, tents and sleepers out on Census night.</li>
                <li>Non-private dwellings, dwellings which provide a communal form of accommodation such as Hotels, Motels, Nursing Homes, Hospitals, Army Barracks, Staff Quarters, Boarding Houses, Homeless shelters, Youth hostels and Ski Lodges.</li>
            </ul>
        </div>
    </div>
);
