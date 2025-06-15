// src/store/addressStore.ts
import { create } from 'zustand';
import { persist,createJSONStorage } from 'zustand/middleware';
import { AddressDetails } from '@/types';

interface AddressState {
  selectedAddressDetails: AddressDetails | null;
  selectedResultId: string | null;
  lastSearchTerm: string;
  postalCode: string | null;
  addressLine: string;
  city: string;
  houseNumber: string;
  version: number;
  setAddressSelection: (id: string, fullText: string) => void;
  clearAddressSelection: () => void;
  setSearchTerm: (term: string) => void;
  setDetailsFromFetch: (details: AddressDetails | null) => void;
}

export const useAddressStore = create<AddressState>()(
  persist(
    (set) => ({
      selectedAddressDetails: null,
      selectedResultId: null,
      lastSearchTerm: '',
      postalCode: null,
      addressLine: '',
      city: '',
      houseNumber: '',
      version: 0,

      setAddressSelection: (id, fullText) =>
        set(() => ({
          selectedResultId: id,
          lastSearchTerm: fullText,
        })),

      clearAddressSelection: () =>
        set(() => ({
          selectedAddressDetails: null,
          selectedResultId: null,
          postalCode: null,
          addressLine: '',
          city: '',
          houseNumber: '',
        })),

      setSearchTerm: (term) =>
        set(() => ({ lastSearchTerm: term })),

      setDetailsFromFetch: (details) => {
        if (!details) {
          return set(() => ({
            selectedAddressDetails: null,
            postalCode: null,
            addressLine: '',
            city: '',
            houseNumber: '',
          }));
        }

        set(() => ({
          selectedAddressDetails: details,
          postalCode: details.postcode || null,
          addressLine: details.line1 || '',
          city: details.city || '',
          houseNumber: details.buildingNumber || '',
        }));
      },
    }),
    {
      name: 'address-storage', // key in localStorage
      storage: createJSONStorage(() => localStorage),
      version: 1,
    }
  )
);
