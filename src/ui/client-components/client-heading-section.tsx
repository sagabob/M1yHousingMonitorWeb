import type { Lga } from "@/page-data/types/Lga";
import MyHeader from "../core-components/my-header";
import MyWrapper from "../core-components/my-wrapper";
import ClientHeading from "./client-heading";

const ClientHeadingSection = (lga: Lga) => {
    return (
        <MyWrapper>
                <MyHeader />
                <ClientHeading {...lga} />             
        </MyWrapper>
    )
}

export default ClientHeadingSection;    