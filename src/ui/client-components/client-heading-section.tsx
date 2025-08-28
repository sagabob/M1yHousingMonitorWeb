import type { Lga } from "@/page-data/types/Lga";
import MyHeader from "../core-components/my-header";
import MyWrapper from "../core-components/my-wrapper";
import ClientHeading from "./client-heading";
import ClientBanner from "./client-banner";
import ClientProducts from "./client-products";

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