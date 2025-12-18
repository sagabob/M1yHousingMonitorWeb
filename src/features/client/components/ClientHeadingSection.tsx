import type { Lga } from "@/page-data/types/Lga";
import BaseHeader from "@/layouts/BaseHeader";
import ClientHeading from "@/features/client/components/ClientHeading";
import ClientBanner from "@/features/client/components/ClientBanner";
import ClientProducts from "@/features/client/components/ClientProducts";

const ClientHeadingSection = ({ lga }: { lga: Lga }) => {
    return (
        <>
            <BaseHeader />
            <ClientHeading lga={lga} />
            <ClientProducts />
            <ClientBanner lga={lga} />
        </>
    )
}

export default ClientHeadingSection;    