import LoadingCard from "./loading-card";

interface LoadingGridProps {
  cardCount?: number;
  gridCols?: string;
  cardType?: 'default' | 'compact' | 'detailed';
  className?: string;
}

const LoadingGrid = ({ 
  cardCount = 2, 
  gridCols = "grid-cols-1 md:grid-cols-12",
  cardType = 'default',
  className = "gap-2 my-1"
}: LoadingGridProps) => {
  
  const getCardProps = () => {
    switch (cardType) {
      case 'compact':
        return {
          titleWidth: "w-24",
          descriptionLines: 1,
          className: "p-0 bg-gray-50 shadow-sm rounded-md"
        };
      case 'detailed':
        return {
          titleWidth: "w-40",
          descriptionLines: 3,
          className: "p-0 bg-gray-100 shadow-none rounded-none"
        };
      default:
        return {
          titleWidth: "w-32",
          descriptionLines: 2,
          className: "p-0 bg-gray-100 shadow-none rounded-none"
        };
    }
  };

  const cardProps = getCardProps();
  const colSpan = Math.floor(12 / cardCount);

  return (
    <div className={`grid ${gridCols} ${className}`}>
      {Array.from({ length: cardCount }).map((_, index) => (
        <div key={index} className={`col-span-1 md:col-span-${colSpan}`}>
          <LoadingCard {...cardProps} />
        </div>
      ))}
    </div>
  );
};

export default LoadingGrid;