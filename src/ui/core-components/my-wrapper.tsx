import type { ReactNode } from "react";

const MyWrapper = ({ children }: { children: ReactNode }) => {
    return (
        <div className="min-h-screen bg-gray-100">
            {children}
        </div>
    )
}

export default MyWrapper;   