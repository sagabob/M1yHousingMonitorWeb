// QueryBoundary.tsx
import { Suspense, type ReactNode } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

export function QueryBoundary({
    children,
    loading,
    errorFallback,
    onReset,
}: {
    children: ReactNode
    loading: ReactNode
    errorFallback: (args: { error: Error; reset: () => void }) => ReactNode
    onReset?: () => void
}) {
    return (
        <ErrorBoundary
            onReset={onReset}
            fallbackRender={({ error, resetErrorBoundary }) =>
                errorFallback({ error, reset: resetErrorBoundary })
            }
        >
            <Suspense fallback={loading}>{children}</Suspense>
        </ErrorBoundary>
    )
}