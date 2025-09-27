import { Card, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface LoadingCardProps {
  titleWidth?: string;
  showDescription?: boolean;
  descriptionLines?: number;
  className?: string;
  delay?: number;
  animationType?: 'fade' | 'slide' | 'bounce' | 'pulse';
}

const LoadingCard = ({ 
  titleWidth = "w-32", 
  showDescription = true, 
  descriptionLines = 2,
  className = "p-0 bg-gray-100 shadow-none rounded-none",
  delay = 0,
  animationType = 'fade'
}: LoadingCardProps) => {
  
  const getAnimationClass = () => {
    switch (animationType) {
      case 'slide':
        return 'animate-in slide-in-from-left-4 duration-700';
      case 'bounce':
        return 'animate-in bounce-in duration-1000';
      case 'pulse':
        return 'animate-pulse';
      default:
        return 'animate-in fade-in-0 slide-in-from-bottom-4 duration-500';
    }
  };

  return (
    <Card 
      className={`${className} ${getAnimationClass()}`}
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

export default LoadingCard;