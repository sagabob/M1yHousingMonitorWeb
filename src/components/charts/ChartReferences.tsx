import React from 'react';
import { Button } from '@/components/ui/button';
import { LandcomInfoIcon } from '@/components/icons/landcom-icons';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

interface ChartReferencesProps {
    dataSource?: string;
    dataNotes?: React.ReactNode;
}

export const ChartReferences: React.FC<ChartReferencesProps> = ({ dataSource, dataNotes }) => {

    if (!dataSource && !dataNotes) return null;

    return (
        <div className="w-full pt-4 flex flex-wrap items-center justify-between gap-4 text-sm text-[#5f6062]">
            {dataSource && (
                <div className="flex gap-2">
                    <span className="font-bold whitespace-nowrap">Source:</span>
                    <span>{dataSource}</span>
                </div>
            )}

            {dataNotes && (
                <div>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="p-0 h-auto font-normal text-[#5f6062] hover:bg-transparent hover:text-black justify-start gap-1"
                            >
                                <LandcomInfoIcon className="h-5 w-5" />
                                <span className="underline underline-offset-2">Data notes</span>
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-5xl z-[1500]">
                            <DialogHeader>
                                <DialogTitle>Data notes</DialogTitle>
                            </DialogHeader>
                            <div className="py-4 text-sm leading-relaxed max-h-[80vh] overflow-y-auto">
                                {/* Render directly if ReactNode, or dangerouslySetInnerHTML if string but we expect ReactNode mostly now */}
                                {typeof dataNotes === 'string' ? (
                                    <div dangerouslySetInnerHTML={{ __html: dataNotes }} />
                                ) : (
                                    dataNotes
                                )}
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            )}
        </div>
    );
};
