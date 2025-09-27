import { Card, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface LoadingCardProps {
  titleWidth?: string;
  showDescription?: boolean;
  descriptionLines?: number;
  className?: string;
}

const LoadingCard = ({ 
  titleWidth = "w-32", 
  showDescription = true, 
  descriptionLines = 2,
  className = "p-0 bg-gray-100 shadow-none rounded-none"
}: LoadingCardProps) => {
  return (
    <Card className={className}>
      <CardHeader className="px-3 py-2">
        <Skeleton className={`h-6 ${titleWidth} mb-2`} />
        {showDescription && (
          <div className="space-y-2">
            {Array.from({ length: descriptionLines }).map((_, index) => (
              <div key={index} className="flex justify-between">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-16" />
              </div>
            ))}
          </div>
        )}
      </CardHeader>
    </Card>
  );
};

export default LoadingCard;