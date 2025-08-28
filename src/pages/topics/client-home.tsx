import { useParams } from "react-router-dom"
import { lgaData } from "../../page-data/lga-data"
import { useTotalMedianPrice } from "../../data-services/hooks/useMedianPrice"
import ClientHeadingSection from "@/ui/client-components/client-heading-section"
import ClientContainer from "@/ui/client-components/client-container"
import MyWrapper from "@/ui/core-components/my-wrapper"

const ClientHome = () => {
    const { alias } = useParams()

    console.log('ClientHome component rendered!')
    console.log('URL Alias:', alias)

    // Find the LGA data based on the alias parameter
    const lga = lgaData.find(l => l.alias === alias)

    console.log('Found LGA:', lga)

    // Query median price data using the LGA ID
    //const { data: medianPriceData, isLoading, error } = useTotalMedianPrice(lga?.id || "")

    // Handle case when LGA is not found
    if (!lga) {
        return <div>LGA not found: {alias}</div>
    }

    return (
        <MyWrapper>
            <ClientHeadingSection {...lga} />
            <ClientContainer children={undefined}  />
        </MyWrapper>
    )
}

export default ClientHome;