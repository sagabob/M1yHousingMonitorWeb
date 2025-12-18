import type { Lga } from "@/page-data/types/Lga";
import MyHeader from "@/layouts/Header";
import ClientHeading from "./ClientHeading";
import ClientBanner from "./ClientBanner";
import ClientProducts from "./ClientProducts";

const ClientHeadingSection = (lga: Lga) => {
    return (
        <>
            <MyHeader />
            <ClientHeading {...lga} />
            <ClientProducts />
            <ClientBanner {...lga} />
        </>
    )
}

export default ClientHeadingSection;    