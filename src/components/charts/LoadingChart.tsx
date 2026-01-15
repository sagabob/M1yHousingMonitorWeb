import React from 'react';
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface LoadingChartProps {
    className?: string;
}

const LoadingChart: React.FC<LoadingChartProps> = ({ className = '' }) => {
    return (
        <Card className={`w-full bg-gray-100 shadow-none rounded-none border-none ${className}`}>
            <CardHeader className="pb-2">
                <Skeleton className="h-6 w-64 mb-2" />
                <Skeleton className="h-4 w-96" />
            </CardHeader>
            <CardContent>
                <div className="animate-pulse">
                    {/* Controls skeleton */}
                    <div className="flex gap-2 mb-4">
                        <Skeleton className="h-7 w-20" />
                        <Skeleton className="h-7 w-20" />
                    </div>
                    
                    {/* Legend skeleton */}
                    <div className="flex gap-4 mb-4">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-4 w-32" />
                    </div>
                    
                    {/* Chart grid skeleton */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="space-y-2">
                                <Skeleton className="h-[200px] w-full" />
                                <div className="text-center">
                                    <Skeleton className="h-10 w-10 mx-auto mb-2" />
                                    <Skeleton className="h-4 w-24 mx-auto" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex-col items-start gap-1 pt-2 text-xs">
                <Skeleton className="h-3 w-64" />
            </CardFooter>
        </Card>
    );
};

export default LoadingChart;
