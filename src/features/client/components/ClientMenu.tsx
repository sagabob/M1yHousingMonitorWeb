import { useState } from "react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Minus, Plus } from "lucide-react"
import { NavLink, useLocation, useParams } from "react-router-dom"
import menuStructure from "@/page-data/menu-structure.json"

/**
 * ClientMenu
 * 
 * Renders the side navigation menu for the Client housing monitor area.
 * It is data-driven, rendering items based on `menu-structure.json`.
 * 
 * Features:
 * - Supports nested collapsible sections.
 * - Auto-resolves routes relative to the current LGA alias (e.g. /:alias/some-page).
 * - Handles simple hash navigation if provided in the route config.
 */
const ClientMenu = () => {
    const location = useLocation()
    const { alias = "" } = useParams()
    // State to track which menu sections (by ID) are currently expanded
    const [openSections, setOpenSections] = useState<string[]>(["home"])

    // Toggles the expansion state of a menu section
    const toggleSection = (section: string) => {
        setOpenSections(prev =>
            prev.includes(section)
                ? prev.filter(s => s !== section)
                : [...prev, section]
        )
    }

    /**
     * Helper to construct the full relative path for a menu item.
     * Takes a route definition (like "housing-market#sales") and prepends
     * the current LGA alias to form a correct URL (e.g. "/bellingen/housing-market#sales").
     */
    const parseRoute = (route: string) => {
        const safe = route || ""
        const [pathPart, hashPart] = safe.split("#", 2)
        const cleanPath = (pathPart || "").replace(/^\/+/, "")

        // Construct path: /<alias>/<route>
        const pathname = `/${alias}/${cleanPath}`.replace(/\/+$/, "")
        const hash = hashPart ? `#${hashPart}` : ""

        return { pathname, hash }
    }

    const renderMenuItem = (item: any) => {
        // CASE 1: Simple Top-Level Link
        if (item.type === "link") {
            const homeTarget = { pathname: `/${alias}`, hash: "" }
            const target = item.id === "home" ? homeTarget : parseRoute(item.route)

            return (
                <div key={item.id} >
                    <NavLink
                        to={target}
                        className={() => `block px-2 py-2 rounded-md text-xl font-medium  hover:bg-[#d6b8ea] hover:text-housing transition-colors ${(location.pathname === target.pathname && location.hash === (target.hash || ""))
                            ? "bg-[#d6b8ea] text-housing"
                            : "text-white bg-housing"}`}
                    >
                        {item.label}
                    </NavLink>
                </div>
            )
        }

        // CASE 2: Collapsible Section (contains subItems)
        return (
            <Collapsible
                className="bg-gray-100"
                key={item.id}
                open={openSections.includes(item.id)}
                onOpenChange={() => toggleSection(item.id)}
            >
                <CollapsibleTrigger
                    className="w-full flex items-center justify-between px-2 py-2 my-2 text-sm font-medium text-white bg-housing hover:bg-[#d6b8ea] hover:text-housing rounded-md transition-colors">
                    <span className="text-lg">{item.label}</span>
                    <div className={`transition-transform duration-300 ease-in-out ${openSections.includes(item.id) ? "rotate-180" : ""}`}>
                        {openSections.includes(item.id) ? (
                            <Minus className="h-4 w-4" />
                        ) : (
                            <Plus className="h-4 w-4" />
                        )}
                    </div>
                </CollapsibleTrigger>
                <CollapsibleContent className="overflow-hidden  transition-all duration-500 ease-out data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
                    <div className="space-y-1 pt-2">
                        {item.subItems?.map((subItem: any) => {
                            const target = parseRoute(subItem.route)
                            const active = location.pathname === target.pathname && location.hash === (target.hash || "")
                            return (
                                <NavLink
                                    key={subItem.id}
                                    to={target}
                                    className={() => `block px-3 py-2 rounded-md text-[14px] font-medium transition-colors ${active
                                        ? "bg-[#d6b8ea] text-housing"
                                        : "text-gray-600 hover:bg-[#d6b8ea]"}`}
                                >
                                    {subItem.label}
                                </NavLink>
                            )
                        })}
                    </div>
                </CollapsibleContent>
            </Collapsible>
        )
    }

    return (
        <div className="w-full bg-white sticky top-1 h-full overflow-y-auto">
            <div className="p-1">
                {menuStructure.menuItems.map(renderMenuItem)}
            </div>
        </div>
    )
}

export default ClientMenu;  