import { useTotalMedianPrice } from "@/data-services";
import { useLga } from "@/hooks/use-lga";



const HomeContainer = () => {

    const lga = useLga()
    //need to call the data service to get data from fire store
    const { data: medianPriceData, isLoading, error } = useTotalMedianPrice(lga?.id || "")
    

    if (isLoading) {
        return <div>Loading...</div>
    }
    if (error) {
        return <div>Error: {error.message}</div>
    }

    console.log(medianPriceData)

    return (
        <div>
            <h1>Home Container</h1>
        </div>
    );
}

export default HomeContainer;