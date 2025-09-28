import LoadingGrid from "./loading-grid";

interface SuspenseFallbackProps {
  cardCount?: number;
  message?: string;
}

const SuspenseFallback = ({ 
  cardCount = 2, 
  message = "Loading housing data..." 
}: SuspenseFallbackProps) => {
  return (
    <div className="space-y-4">
      <div className="text-center text-gray-600 mb-4">
        <p className="text-lg font-medium">{message}</p>
      </div>
      <LoadingGrid cardCount={cardCount} staggerDelay={500} />
    </div>
  );
};

export default SuspenseFallback;