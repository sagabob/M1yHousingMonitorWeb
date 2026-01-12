export const PageLoading = () => (
    <div className="flex flex-col items-center justify-center py-16 space-y-6">
        <div className="flex items-center space-x-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-3 border-[#7513b8]"></div>
            <span className="text-2xl font-semibold text-gray-800">Loading housing data...</span>
        </div>
        <p className="text-lg text-gray-600 text-center max-w-lg">
            Fetching the latest housing market information and demographic data for your area.
        </p>
    </div>
)
