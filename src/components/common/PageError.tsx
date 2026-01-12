interface PageErrorProps {
    error: Error;
    reset: () => void;
}

export const PageError = ({ error, reset }: PageErrorProps) => (
    <div className="text-red-600 space-y-2">
        <div>Something went wrong: {error.message}</div>
        <button onClick={reset} className="underline hover:text-red-800 transition-colors">
            Try again
        </button>
    </div>
)
