import { MAX_WIDTH } from "../constants/ui-constants"


const MyHeader = () => {
    return (
        <header className="bg-gray-100  border-b border-gray-200">
            <div className={`max-w-${MAX_WIDTH} mx-auto px-2 sm:px-2 lg:px-4 py-2`}>
                <div className="flex justify-between items-center h-8">
                    <h1 className="flex items-center">
                        <span className="text-red-500 font-bold text-[20px]">.</span>
                        <span className="text-gray-700 text-[20px]"><span className="font-bold text-[20px]">id</span>community</span>
                        <span className="inline-block border-l-2 border-gray-300 pl-2 ml-2 text-[14px]">demographic resources</span>
                    </h1>
                </div>
            </div>
        </header>
    )
}

export default MyHeader 