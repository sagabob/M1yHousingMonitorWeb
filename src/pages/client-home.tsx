import { useParams } from "react-router-dom"
import { lgaData } from "../page-data/lga-data"
import { useTotalMedianPrice } from "../data-services/hooks/useMedianPrice"

const ClientHome = () => {
    const { alias } = useParams()
    
    console.log('ClientHome component rendered!')
    console.log('URL Alias:', alias)
    
    // Find the LGA data based on the alias parameter
    const lga = lgaData.find(l => l.alias === alias)
    
    console.log('Found LGA:', lga)
    
    // Query median price data using the LGA ID
    const { data: medianPriceData, isLoading, error } = useTotalMedianPrice(lga?.id || "")
    
    // Enhanced Firebase debugging
    console.log('=== FIREBASE DATA DEBUG ===')
    console.log('LGA ID being queried:', lga?.id)
    console.log('Collection path: PricesIncomesMedians')
    console.log('Document ID:', lga?.id)
    console.log('Loading state:', isLoading)
    console.log('Error state:', error)
    console.log('Raw Firebase response:', medianPriceData)
    
    if (medianPriceData) {
        console.log('✅ Data structure:')
        console.log('  - Has Rentals:', !!medianPriceData.Rentals)
        console.log('  - Has Sales:', !!medianPriceData.Sales)
        console.log('  - Rental periods:', medianPriceData.Rentals?.Periods?.length || 0)
        console.log('  - Sales periods:', medianPriceData.Sales?.Periods?.length || 0)
    }
    
    if (error) {
        console.error('❌ Firebase Error Details:')
        console.error('  - Error message:', error.message)
        console.error('  - Error stack:', error.stack)
    }
    
    if (!lga) {
        return <div>LGA not found: {alias}</div>
    }
    
    return (
        <div>
            <h1>LGA Found!</h1>
            <h2>{lga.name}</h2>
            <p>ID: {lga.id}</p>
            <p>Alias: {lga.alias}</p>
            <p>Image: {lga.image}</p>
            
            <h3>Housing Data:</h3>
            {isLoading && <p>Loading housing data...</p>}
            {error && <p>Error: {error.message}</p>}
            {medianPriceData && (
                <div>
                    <p>Rentals: {medianPriceData.Rentals?.Periods?.length || 0} periods</p>
                    <p>Sales: {medianPriceData.Sales?.Periods?.length || 0} periods</p>
                </div>
            )}
        </div>
    )
}

export default ClientHome;