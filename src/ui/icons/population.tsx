// src/ui/icons/population.tsximport type { IdHousingIconProps } from "./household_type";

import type { IdHousingIconProps } from "./household_type";

export function PopulationIcon({ title, className, ...rest }: IdHousingIconProps) {
    return (
        <svg
            id="Layer_1"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="80 80 350 320"
            className={className}
            fill="currentColor"
            aria-hidden={title ? undefined : true}
            role={title ? "img" : "presentation"}
            {...rest}
        >
            {title ? <title>{title}</title> : null}
            <path d="M286.4 181a20.9 20.9 0 10-2.7-.1l-44 112.9h30.4v66.4h10.5v-66.4h13.7v66.4h10.5v-66.4h26.6zm-11-20.6a10.1 10.1 0 1110.1 10.1 10.1 10.1 0 01-10.1-10.1zm9.7 45.8l30.8 77.1H255zM189.9 270.2h10.5v90h-10.5zM214.1 270.2h10.5v90h-10.5zM205.3 181a20.6 20.6 0 10-20.6-20.6 20.6 20.6 0 0020.6 20.6zm0-30.7a10.1 10.1 0 11-10.1 10.1 10.1 10.1 0 0110.1-10.1zM174.8 262.2h10.5v-67.3h43.2v67.3H239v-77.8h-64.2v77.8zM465.6 256.8l-33.5-83.9a16.6 16.6 0 10-5.8-.1l-32.8 84h23.2v47.9h10.5v-47.9h7.5v47.9h10.5v-47.9zm-42.2-100.3a6.1 6.1 0 016.1-6.2 6.2 6.2 0 016.2 6.2 6.1 6.1 0 01-6.2 6.1 6.1 6.1 0 01-6.1-6.1zm5.9 37.6l20.8 52.2h-41.2zM341.2 254.3h10.5v78.57h-10.5zM362.3 254.3h10.5v78.57h-10.5zM355.3 177.1a18.7 18.7 0 10-18.7-18.6 18.7 18.7 0 0018.7 18.6zm0-26.8a8.2 8.2 0 018.2 8.2 8.2 8.2 0 01-16.4 0 8.2 8.2 0 018.2-8.2zM328 247.3h10.5v-58h36.3v58h10.5v-68.5H328v68.5zM129.9 177a18.6 18.6 0 10-4.2-.1l-38.5 98.7h26.9v57.2h10.5v-57.2h10.6v57.2h10.5v-57.2h23.6zm-9.9-18.5a8.2 8.2 0 0116.4 0 8.2 8.2 0 01-16.4 0zm7.9 41.7l25.9 64.9h-51.2zM45.6 237.9h10.5v66.78H45.6zM63.5 237.9H74v66.78H63.5zM75 156.5a16.6 16.6 0 10-33.2 0 16.5 16.5 0 0014.7 16.4H34.4V232h10.5v-48.6h29.3V232h10.5v-59.1H60.3A16.5 16.5 0 0075 156.5zm-22.8 0a6.2 6.2 0 016.2-6.2 6.1 6.1 0 016.1 6.2 6.1 6.1 0 01-6.1 6.1 6.1 6.1 0 01-6.2-6.1z" />
        </svg>
    );
}

export default PopulationIcon;
