import { useRouteError, isRouteErrorResponse } from "react-router-dom";
import NotFound from "@/pages/NotFound";
import { ErrorFallback } from "@/components/common/ErrorFallback";

const RouteError = () => {
    const error = useRouteError();
    console.error(error);

    if (isRouteErrorResponse(error) && error.status === 404) {
        return <NotFound />;
    }

    // Attempt to extract an Error object or create one from the unknown error
    const genericError = error instanceof Error
        ? error
        : new Error(typeof error === 'string' ? error : 'Unknown error occurred');

    return (
        <div className="min-h-[50vh] flex items-center justify-center p-4">
            <ErrorFallback error={genericError} />
        </div>
    );
};

export default RouteError;
