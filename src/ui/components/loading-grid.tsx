import { Card, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface LoadingCardProps {
  titleWidth?: string;
  showDescription?: boolean;
  descriptionLines?: number;
  className?: string;
  delay?: number;
}

const LoadingCard = ({ 
  titleWidth = "w-32", 
  showDescription = true, 
  descriptionLines = 2,
  className = "p-0 bg-gray-100 shadow-none rounded-none",
  delay = 0
}: LoadingCardProps) => {
  return (
    <Card 
      className={`${className} animate-in fade-in-0 slide-in-from-bottom-4 duration-500`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <CardHeader className="px-3 py-2">
        <Skeleton 
          className={`h-6 ${titleWidth} mb-2 animate-pulse`} 
        />
        {showDescription && (
          <div className="space-y-2">
            {Array.from({ length: descriptionLines }).map((_, index) => (
              <div key={index} className="flex justify-between">
                <Skeleton 
                  className="h-4 w-24 animate-pulse" 
                  style={{ animationDelay: `${delay + (index * 100)}ms` }}
                />
                <Skeleton 
                  className="h-4 w-16 animate-pulse" 
                  style={{ animationDelay: `${delay + (index * 100) + 50}ms` }}
                />
              </div>
            ))}
          </div>
        )}
      </CardHeader>
    </Card>
  );
};

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
  const colSpan = Math.floor(12 / cardCount);

  return (
    <div className={`grid ${gridCols} ${className}`}>
      {Array.from({ length: cardCount }).map((_, index) => (
        <div 
          key={index} 
          className={`col-span-1 md:col-span-${colSpan}`}
        >
          <LoadingCard 
            {...cardProps} 
            delay={index * staggerDelay}
          />
        </div>
      ))}
    </div>
  );
};

export default LoadingGrid;