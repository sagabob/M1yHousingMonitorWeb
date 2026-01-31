import { Outlet } from "react-router-dom";
import { MAX_WIDTH } from "@/ui/constants/ui-constants";
import ClientMenu from "@/features/client/components/ClientMenu";
import type { Lga } from "@/page-data/types/Lga";
import type { BmGCC } from "@/data-services/api/getBMGCC";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export interface ClientContainerProps {
    lga: Lga;
    bmGCCData: BmGCC;
}

const ClientContainer = ({ lga, bmGCCData }: ClientContainerProps) => {
    return (
        <section className="py-2">
            <div className={`max-w-${MAX_WIDTH} mx-auto px-2 sm:px-2 lg:px-4 py-4`}>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-1 relative">
                    {/* Mobile Menu Trigger */}
                    <div className="lg:hidden mb-4">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="outline" size="icon" className="shrink-0">
                                    <Menu className="h-5 w-5" />
                                    <span className="sr-only">Toggle menu</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="w-[300px] sm:w-[350px] p-0 pt-10">
                                <ClientMenu />
                            </SheetContent>
                        </Sheet>
                    </div>

                    {/* Desktop Sidebar */}
                    <div className="hidden lg:block lg:col-span-3">
                        <ClientMenu />
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-9">
                        <Outlet context={{ lga, bmGCCData }} />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ClientContainer;  