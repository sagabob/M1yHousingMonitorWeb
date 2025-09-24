import type { ReactNode } from "react";

const MyWrapper = ({ children }: { children: ReactNode }) => {
    return (
        <div className="min-h-screen bg-white">
            {children}
        </div>
    )
}

export default MyWrapper;   