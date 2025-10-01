import { useOutletContext } from "react-router-dom"
import type { Lga } from "@/page-data/types/Lga"
import type { BmGCC } from "@/data-services/api/getBMGCC"

//context is context={{ lga, bmGCCData }}
type LgaContext = {
  lga: Lga
  bmGCCData: BmGCC
}

export function usePageContext  () {
  return useOutletContext<LgaContext>()
}