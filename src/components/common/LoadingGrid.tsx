import LoadingCard from './LoadingCard';

interface LoadingGridProps {
  cardCount?: number;
  gridCols?: string;
  cardType?: 'default' | 'compact' | 'detailed';
  className?: string;
  staggerDelay?: number;
}

const LoadingGrid = ({
  cardCount = 2,
  gridCols = "grid-cols-1 md:grid-cols-12",
  cardType = 'default',
  className = "gap-2 my-1",
  staggerDelay = 150
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
  const numberOfRows = Math.ceil(cardCount / 2);

  return (
    <div className={`space-y-2`}>
      {Array.from({ length: numberOfRows }).map((_, rowIndex) => {
        const firstIndex = rowIndex * 2;
        const secondIndex = firstIndex + 1;
        const showSecond = secondIndex < cardCount;
        return (
          <div key={`row-${rowIndex}`} className={`grid ${gridCols} ${className}`}>
            <div className={`col-span-1 md:col-span-6`}>
              <LoadingCard {...cardProps} delay={firstIndex * staggerDelay} />
            </div>
            {showSecond && (
              <div className={`col-span-1 md:col-span-6`}>
                <LoadingCard {...cardProps} delay={secondIndex * staggerDelay} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default LoadingGrid;