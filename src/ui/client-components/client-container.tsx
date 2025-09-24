import { Outlet } from "react-router-dom";
import { MAX_WIDTH } from "../constants/ui-constants";
import ClientMenu from "./client-menu";
import type { Lga } from "@/page-data/types/Lga";

const ClientContainer = (lga:Lga) => {
    return (
        <section className="py-2">
            <div className={`max-w-${MAX_WIDTH} mx-auto px-2 sm:px-2 lg:px-4 py-4`}>
                <div className="grid grid-cols-12 gap-1">
                    <div className="col-span-3">
                        <ClientMenu {...lga} />
                    </div>
                    <div className="col-span-9 border-2 border-red-500">
                        <Outlet />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ClientContainer;  