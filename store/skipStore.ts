// src/store/skipStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Skip } from '@/types'; 

interface SkipState {
  selectedSkip: Skip | null;
  setSelectedSkip: (skip: Skip | null) => void;
  clearSelectedSkip: () => void;
}

export const useSkipStore = create<SkipState>()(
  persist(
    (set) => ({
      selectedSkip: null,
      setSelectedSkip: (skip) => set({ selectedSkip: skip }),
      clearSelectedSkip: () => set({ selectedSkip: null }),
    }),
    {
      name: 'selected-skip-storage', // unique name for localStorage
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => {
        if (!state.selectedSkip) return { selectedSkip: null };
        // Persist only essential, non-redundant fields
        return {
          selectedSkip: {
            id: state.selectedSkip.id,
            size: state.selectedSkip.size,
            hire_period_days: state.selectedSkip.hire_period_days,
            price_before_vat: state.selectedSkip.price_before_vat,
            vat: state.selectedSkip.vat,
            postcode: state.selectedSkip.postcode,
            area: state.selectedSkip.area,
            allowed_on_road: state.selectedSkip.allowed_on_road,
            allows_heavy_waste: state.selectedSkip.allows_heavy_waste,
            transport_cost: state.selectedSkip.transport_cost, 
            per_tonne_cost: state.selectedSkip.per_tonne_cost,
            forbidden: state.selectedSkip.forbidden,
            created_at: state.selectedSkip.created_at,
            updated_at: state.selectedSkip.updated_at,
          } as Skip, // Cast back to Skip to satisfy type
        };
      },
    }
  )
);