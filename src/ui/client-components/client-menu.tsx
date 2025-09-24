import { useState } from "react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Minus, Plus } from "lucide-react"
import { NavLink, useLocation, useParams } from "react-router-dom"
import menuStructure from "@/page-data/menu-structure.json"
const ClientMenu = () => {
    const location = useLocation()
    const { alias = "" } = useParams()
    const [openSections, setOpenSections] = useState<string[]>(["overview"])

    const toggleSection = (section: string) => {
        setOpenSections(prev =>
            prev.includes(section)
                ? prev.filter(s => s !== section)
                : [...prev, section]
        )
    }

    const parseRoute = (route: string) => {
        const safe = route || ""
        const [pathPart, hashPart] = safe.split("#", 2)
        const cleanPath = (pathPart || "").replace(/^\/+/, "")
        const pathname = `/${alias}/${cleanPath}`.replace(/\/+$/, "")
        const hash = hashPart ? `#${hashPart}` : ""
        return { pathname, hash }
    }

    const renderMenuItem = (item: any) => {
        if (item.type === "link") {
            const homeTarget = { pathname: `/${alias}`, hash: "" }
            const target = item.id === "home" ? homeTarget : parseRoute(item.route)
            return (
                <div key={item.id} className="mb-1">
                    <NavLink
                        to={target}
                        className={() => `block px-2 py-2 rounded-md text-xl font-medium transition-colors ${
                                (location.pathname === target.pathname && location.hash === (target.hash || ""))
                                ? "bg-[#d6b8ea] text-[#7513b8]"
                                : "text-white bg-[#7513b8]"}`}
                    >
                        {item.label}
                    </NavLink>
                </div>
            )
        }

        if (item.type === "section") {
            return (
                <Collapsible
                    key={item.id}
                    open={openSections.includes(item.id)}
                    onOpenChange={() => toggleSection(item.id)}
                >
                    <CollapsibleTrigger
                        className="w-full flex items-center justify-between px-2 py-2 my-2 text-sm font-medium text-white bg-[#7513b8] hover:bg-[#d6b8ea] hover:text-[#7513b8] rounded-md transition-colors">
                        <span className="text-lg">{item.label}</span>
                        <div className={`transition-transform duration-300 ease-in-out ${openSections.includes(item.id) ? "rotate-180" : ""}`}>
                            {openSections.includes(item.id) ? (
                                <Minus className="h-4 w-4" />
                            ) : (
                                <Plus className="h-4 w-4" />
                            )}
                        </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="overflow-hidden transition-all duration-500 ease-out data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
                        <div className="space-y-1 pt-2">
                            {item.subItems?.map((subItem: any) => {
                                const target = parseRoute(subItem.route)
                                const active = location.pathname === target.pathname && location.hash === (target.hash || "")
                                return (
                                    <NavLink
                                        key={subItem.id}
                                        to={target}
                                        className={() => `block px-3 py-2 rounded-md text-[14px] font-medium transition-colors ${active
                                            ? "bg-blue-100 text-blue-700"
                                            : "text-gray-600 hover:bg-gray-100"}`}
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

        return null
    }

    return (
        <div className="w-full bg-white sticky top-1 h-full overflow-y-auto">
            <div className="p-2">
                {menuStructure.menuItems.map(renderMenuItem)}
            </div>
        </div>
    )
}

export default ClientMenu;  