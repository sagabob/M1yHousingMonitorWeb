import { create } from 'zustand';
import type { ChartDataType } from '@/components/charts/ChartToggleGroup';

interface ChartSettingsState {
    dataType: ChartDataType;
    setDataType: (dataType: ChartDataType) => void;
}

export const useChartSettings = create<ChartSettingsState>((set) => ({
    dataType: 'percent',
    setDataType: (dataType) => set({ dataType }),
}));
