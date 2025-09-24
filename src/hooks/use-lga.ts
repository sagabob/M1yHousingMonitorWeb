import { useOutletContext } from "react-router-dom"
import type { Lga } from "@/page-data/types/Lga"

export function useLga() {
  return useOutletContext<Lga>()
}