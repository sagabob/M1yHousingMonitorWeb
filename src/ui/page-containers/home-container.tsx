import { useTotalMedianPrice } from "@/data-services";
import type { Lga } from "@/page-data/types/Lga";


const HomeContainer = (lga:Lga) => {

    //need to call the data service to get data from fire store
    const { data: medianPriceData, isLoading, error } = useTotalMedianPrice(lga?.id || "")

    console.log(medianPriceData)

    if (isLoading) {
        return <div>Loading...</div>
    }
    if (error) {
        return <div>Error: {error.message}</div>
    }

    return (
        <div>
            <h1>Home Container</h1>
        </div>
    );
}

export default HomeContainer;