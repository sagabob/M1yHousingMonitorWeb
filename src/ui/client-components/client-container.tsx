import { Outlet } from "react-router-dom";
import { MAX_WIDTH } from "../constants/ui-constants";
import ClientMenu from "./client-menu";
import type { Lga } from "@/page-data/types/Lga";
import type { BmGCC } from "@/data-services/api/getBMGCC";

export interface ClientContainerProps {
  lga: Lga;
  bmGCCData: BmGCC;
}

const ClientContainer = ({ lga, bmGCCData }: ClientContainerProps) => {
    return (
        <section className="py-2">
            <div className={`max-w-${MAX_WIDTH} mx-auto px-2 sm:px-2 lg:px-4 py-4`}>
                <div className="grid grid-cols-12 gap-1">
                    <div className="col-span-3">
                        <ClientMenu  />
                    </div>
                    <div className="col-span-9">
                        <Outlet context={{ lga, bmGCCData }} />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ClientContainer;  