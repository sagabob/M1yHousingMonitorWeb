import { useParams } from "react-router-dom"
import { lgaData } from "../../page-data/lga-data"
import ClientHeadingSection from "@/ui/client-components/client-heading-section"
import ClientContainer from "@/ui/client-components/client-container"
import MyWrapper from "@/ui/core-components/my-wrapper"
import { useBMGCCData } from "@/data-services/hooks/useBMGCCData"
import { formatLgaCode } from "@/data-services/data-utils/core-utils"
import { QueryBoundary } from "@/ui/components/query-boundary"
import { useQueryClient } from "@tanstack/react-query"

function MainClientContentPanel({ lga }: { lga: (typeof lgaData)[number] }) { //lga is a member of lagaData
    const { data: bmGCCData } = useBMGCCData(formatLgaCode(lga))
    return <ClientContainer lga={lga} bmGCCData={bmGCCData} />
}

const PageLoadingSection = () => <div>Loading…</div>

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
        <MyWrapper>
            <ClientHeadingSection {...lga} />
            <QueryBoundary
                loading={<PageLoadingSection />}
                errorFallback={(props) => <ErrorSection {...props} />}
                onReset={() => qc.invalidateQueries({ queryKey: ['bm-gcc', lgaCode] })}
            >
                <MainClientContentPanel lga={lga} />
            </QueryBoundary>
        </MyWrapper>
    )
}

export default ClientHome;