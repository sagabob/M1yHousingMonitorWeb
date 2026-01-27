import React from 'react';
import type { ReactNode } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card";

interface ChartWrapperProps {
    name?: string;
    title: string;
    subTitle?: string;
    dataSource?: string;
    dataNotes?: string;
    chartInfo?: string;
    body?: ReactNode;
    children?: ReactNode;
}

const ChartWrapper: React.FC<ChartWrapperProps> = ({
    title,
    subTitle,
    dataSource,
    body,
    children
}) => {
    return (
        <Card className="w-full bg-gray-50 shadow-none rounded-none border-none">
            <CardHeader className="pb-2">
                <CardTitle className="text-xl font-bold text-slate-800">{title}</CardTitle>
                {subTitle && <CardDescription className="text-[16px] text-[#5f6062] font-medium">{subTitle}</CardDescription>}
            </CardHeader>
            <CardContent>
                {children || body}
            </CardContent>
            {(dataSource) && (
                <CardFooter className="flex-col items-start gap-1 pt-2  text-[15px]">
                    {dataSource && <div><strong>Source:</strong> {dataSource}</div>}
                </CardFooter>
            )}
        </Card>
    );
};

export default ChartWrapper;
