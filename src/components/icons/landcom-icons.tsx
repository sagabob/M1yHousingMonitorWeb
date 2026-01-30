import type { SVGProps } from "react";

export type IdHousingIconProps = SVGProps<SVGSVGElement> & { title?: string };

export function LandcomApartmentsIcon({ title, className, ...rest }: IdHousingIconProps) {
    return (
        <svg
            id="bea95b7c-bbd4-4225-8757-d029d9cc312b"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            className={className}
            fill="currentColor"
            aria-hidden={title ? undefined : true}
            role={title ? "img" : "presentation"}
            {...rest}
        >
            {title ? <title>{title}</title> : null}
            <path
                d="M24,3A21,21,0,1,1,3,24,21,21,0,0,1,24,3m0-3A24,24,0,1,0,48,24,24,24,0,0,0,24,0Z"
            />
            <path
                d="M32,13.46V10H16v3.46H12V36.05H36V13.46ZM17.75,31H15.06V28.18h2.69Zm0-5.86H15.06V22.32h2.69Zm0-5.87H15.06v-2.8h2.69ZM22.47,31H19.78V28.18h2.69Zm0-5.86H19.78V22.32h2.69Zm0-5.87H19.78v-2.8h2.69ZM28.22,31H25.53V28.18h2.69Zm0-5.86H25.53V22.32h2.69Zm0-5.87H25.53v-2.8h2.69ZM32.94,31H30.25V28.18h2.69Zm0-5.86H30.25V22.32h2.69Zm0-5.87H30.25v-2.8h2.69Z"
            />
        </svg>
    );
}

export function LandcomTownhousesIcon({ title, className, ...rest }: IdHousingIconProps) {
    return (
        <svg
            id="65ad8cc6-d44a-4010-8683-bfb91a823604"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            className={className}
            fill="currentColor"
            aria-hidden={title ? undefined : true}
            role={title ? "img" : "presentation"}
            {...rest}
        >
            {title ? <title>{title}</title> : null}
            <path
                d="M24,3A21,21,0,1,1,3,24,21,21,0,0,1,24,3m0-3A24,24,0,1,0,48,24,24,24,0,0,0,24,0Z"
            />
            <path
                d="M29.22,10.08l-5.1,4.17L18.75,10.1,12,15.46V36.05H36V15.46ZM20,31H16V27h4Zm0-8H16V19h4Zm11,8H27V27h4Zm0-8H27V19h4Z"
            />
        </svg>
    );
}

export function LandcomInfoIcon({ title, className, ...rest }: IdHousingIconProps) {
    return (
        <svg
            id="a8773694-4d83-4401-98cf-d4b1bea43484"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            className={className}
            fill="currentColor"
            aria-hidden={title ? undefined : true}
            role={title ? "img" : "presentation"}
            {...rest}
        >
            {title ? <title>{title}</title> : null}
            <path
                d="M24,3A21,21,0,1,1,3,24,21,21,0,0,1,24,3m0-3A24,24,0,1,0,48,24,24,24,0,0,0,24,0Z"
            />
            <rect x="21" y="10" width="6" height="5" />
            <rect x="21" y="19" width="6" height="19" />
        </svg>
    );
}

export function LandcomHouseIcon({ title, className, ...rest }: IdHousingIconProps) {
    return (
        <svg
            id="b477b7e6-6ca5-4220-9496-acaa1051d8e7"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            className={className}
            fill="currentColor"
            aria-hidden={title ? undefined : true}
            role={title ? "img" : "presentation"}
            {...rest}
        >
            {title ? <title>{title}</title> : null}
            <path
                d="M24,3A21,21,0,1,1,3,24,21,21,0,0,1,24,3m0-3A24,24,0,1,0,48,24,24,24,0,0,0,24,0Z"
            />
            <polygon
                points="24.3 11.53 12.38 19.32 12.38 34.6 21.56 34.6 21.56 25.79 27.22 25.79 27.22 34.6 36.38 34.6 36.38 19.32 24.3 11.53"
            />
        </svg>
    );
}