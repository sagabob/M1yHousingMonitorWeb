import React from 'react';
import type { ReactNode } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import { LandcomInfoIcon } from '@/components/icons/landcom-icons';
import { ChartReferences } from './ChartReferences';

interface ChartWrapperProps {
    name?: string;
    title: string;
    subTitle?: string;
    dataSource?: string;
    dataNotes?: ReactNode; // Changed to ReactNode to allow Markdown/HTML string or elements
    chartInfo?: ReactNode; // Changed to ReactNode for flexibility (component or string)
    body?: ReactNode;
    children?: ReactNode;
}

const ChartWrapper: React.FC<ChartWrapperProps> = ({
    title,
    subTitle,
    dataSource,
    dataNotes,
    chartInfo,
    body,
    children
}) => {
    return (
        <Card className="w-full bg-gray-50 shadow-none rounded-none border-none">
            <CardHeader className="pb-2">
                <div className="flex justify-between items-start gap-2">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <CardTitle className="text-xl font-bold text-slate-800">{title}</CardTitle>
                            {chartInfo && (
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-6 px-2 text-[#5f6062] hover:text-[#333333] hover:bg-slate-100 gap-1.5"
                                        >
                                            <LandcomInfoIcon className="h-5 w-5" />
                                            <span className="text-sm font-medium underline underline-offset-2">Chart info</span>
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="max-w-3xl">
                                        <DialogHeader>
                                            <DialogTitle>Chart information</DialogTitle>
                                        </DialogHeader>
                                        <div className="py-4 text-sm leading-relaxed">
                                            {chartInfo}
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            )}
                        </div>
                        {subTitle && <CardDescription className="text-[16px] text-[#5f6062] font-medium">{subTitle}</CardDescription>}
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                {children || body}
            </CardContent>
            <CardFooter className="flex-col items-start pt-0">
                <ChartReferences dataSource={dataSource} dataNotes={dataNotes} />
            </CardFooter>
        </Card>
    );
};

export default ChartWrapper;
