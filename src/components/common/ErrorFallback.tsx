
export function ErrorFallback({ error }: { error: Error }) {
  return (
    <div role="alert" className="text-red-600">
      <p>❌ Oops, something went wrong:</p>
      <pre>{error.message}</pre>
    </div>
  );
}
