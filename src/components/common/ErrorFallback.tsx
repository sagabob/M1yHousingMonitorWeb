
export function ErrorFallback({ error }: { error: Error }) {
  const isDevelopment = process.env.NODE_ENV === 'development';

  return (
    <div role="alert" className="text-red-600">
      <p>❌ Oops, something went wrong:</p>
      {isDevelopment ? (
        <pre>{error.message}</pre>
      ) : (
        <p>Please try again later or contact support if the problem persists.</p>
      )}
    </div>
  );
}