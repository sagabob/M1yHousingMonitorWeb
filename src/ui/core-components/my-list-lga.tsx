import { lgaData, baseUrl } from "../../page-data/lga-data"
import { Link } from "react-router-dom"
import { MAX_WIDTH } from "../constants/ui-constants"
const MyListLga = () => {
    return (
        <section className="py-10 bg-white">
            <div className={`max-w-${MAX_WIDTH} mx-auto px-2 sm:px-2 lg:px-4 py-8`}>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-0">
                    {lgaData.map((lga) => (
                        <Link 
                            key={lga.id} 
                            to={`/${lga.alias}`}
                            className="flex flex-col items-center justify-center border-2 border-gray-200 rounded-lg p-4 hover:shadow-lg"
                        >
                            <div className="w-full">
                                <div className="w-[200px] h-[140px] mx-auto overflow-hidden rounded-md">
                                    <img 
                                        src={baseUrl + lga.image} 
                                        alt={lga.name} 
                                        className="w-full h-full object-cover object-center" 
                                    />
                                </div>
                                <p className="text-center text-sm text-gray-500 mt-2 font-medium">{lga.name}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default MyListLga