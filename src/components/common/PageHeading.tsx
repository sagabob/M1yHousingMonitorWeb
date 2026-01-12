import { MAX_WIDTH } from "@/ui/constants/ui-constants"

const MyHeading = () => {
    return (
        <div className={`max-w-${MAX_WIDTH} mx-auto px-2 sm:px-2 lg:px-4 py-10 bg-white`}>
            <h1 className="text-3xl text-gray-900">housing.id<span className="inline-block border-l-2 border-gray-300 pl-2 ml-2 text-housing">housing monitor</span></h1>
        </div>
    )
}

export default MyHeading