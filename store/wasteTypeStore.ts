// src/store/wasteTypeStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface WasteTypeState {
    toggleWasteType: any;
    selectedWasteTypes: string[];
    addWasteType: (id: string) => void;
    removeWasteType: (id: string) => void;
    clearWasteTypes: () => void;
}

export const useWasteTypeStore = create<WasteTypeState>()(
    persist(
        (set, get) => ({
            selectedWasteTypes: [], 
            addWasteType: (id) => set((state) => ({ selectedWasteTypes: [...state.selectedWasteTypes, id] })),
            removeWasteType: (id) => set((state) => ({ selectedWasteTypes: state.selectedWasteTypes.filter((typeId) => typeId !== id) })),
            clearWasteTypes: () => set({ selectedWasteTypes: [] }),
            toggleWasteType: (id: string) => {
                set((state) => {
                    if (state.selectedWasteTypes.includes(id)) {
                        return { selectedWasteTypes: state.selectedWasteTypes.filter((typeId) => typeId !== id) };
                    } else {
                        return { selectedWasteTypes: [...state.selectedWasteTypes, id] };
                    }
                });
            },
        }),
        {
            name: 'waste-type-storage',
            storage: createJSONStorage(() => localStorage), 
        }
    )
);