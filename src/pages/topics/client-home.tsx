import { useParams } from "react-router-dom"
import { lgaData } from "../../page-data/lga-data"
import ClientHeadingSection from "@/features/client/components/ClientHeadingSection"
import ClientContainer from "@/features/client/pages/ClientContainer"
import PageWrapper from "@/layouts/PageWrapper"
import { useBMGCCData } from "@/data-services/hooks/useBMGCCData"
import { formatLgaCode } from "@/data-services/data-utils/core-utils"
import { QueryBoundary } from "@/components/common/QueryBoundary"
import { useQueryClient } from "@tanstack/react-query"

function MainClientContentPanel({ lga }: { lga: (typeof lgaData)[number] }) { //lga is a member of lagaData
    const { data: bmGCCData } = useBMGCCData(formatLgaCode(lga))
    return <ClientContainer lga={lga} bmGCCData={bmGCCData} />
}

const PageLoadingSection = () => (
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

const ErrorSection = ({ error, reset }: { error: Error; reset: () => void }) => (
    <div className="text-red-600 space-y-2">
        <div>Something went wrong: {error.message}</div>
        <button onClick={reset} className="underline">Try again</button>
    </div>
)

const ClientHome = () => {
    const { alias } = useParams()
    const lga = lgaData.find(l => l.alias === alias)
    const qc = useQueryClient()

    if (!lga) return <div>LGA not found: {alias}</div>

    const lgaCode = formatLgaCode(lga)

    return (
        <PageWrapper>
            <ClientHeadingSection {...lga} />
            <QueryBoundary
                loading={<PageLoadingSection />}
                errorFallback={(props) => <ErrorSection {...props} />}
                onReset={() => qc.invalidateQueries({ queryKey: ['bm-gcc', lgaCode] })}
            >
                <MainClientContentPanel lga={lga} />
            </QueryBoundary>
        </PageWrapper>
    )
}

export default ClientHome;