import { useParams } from "react-router-dom"
import { lgaData } from "@/page-data/lga-data"
import ClientHeadingSection from "@/features/client/components/ClientHeadingSection"
import ClientContainer from "@/features/client/pages/ClientContainer"
import PageWrapper from "@/layouts/PageWrapper"
import { useBMGCCData } from "@/data-services/hooks/useBMGCCData"
import { formatLgaCode } from "@/data-services/data-utils/core-utils"
import { QueryBoundary } from "@/components/common/QueryBoundary"
import { useQueryClient } from "@tanstack/react-query"
import { PageLoading } from "@/components/common/PageLoading"
import { PageError } from "@/components/common/PageError"
import type { Lga } from "@/page-data/types/Lga"

function MainClientContentPanel({ lga }: { lga: Lga }) {
    const { data: bmGCCData } = useBMGCCData(formatLgaCode(lga))
    return <ClientContainer lga={lga} bmGCCData={bmGCCData} />
}

const ClientHome = () => {
    const { alias } = useParams()
    const lga = lgaData.find(l => l.alias === alias)
    const qc = useQueryClient()

    if (!lga) return <div>LGA not found: {alias}</div>

    const lgaCode = formatLgaCode(lga)

    return (
        <PageWrapper>
            <ClientHeadingSection lga={lga} />
            <QueryBoundary
                loading={<PageLoading />}
                errorFallback={(props) => <PageError {...props} />}
                onReset={() => qc.invalidateQueries({ queryKey: ['bm-gcc', lgaCode] })}
            >
                <MainClientContentPanel lga={lga} />
            </QueryBoundary>
        </PageWrapper>
    )
}

export default ClientHome;