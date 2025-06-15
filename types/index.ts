// src/types/index.ts

export interface SearchResult {
    id: string;
    mainText: string;
    secondaryText: string;
  }
  
  export interface AddressDetails {
    id?: string;
    buildingNumber: any;
    line1: string;
    line2: string;
    line3: string;
    line4: string;
    city: string;
    county: string;
    postcode: string;
    country: string;
  }
  
  export interface WasteType {
    id: string;
    name: string;
    description: string;
    icon: React.ElementType; 
  }

  export interface Skip {
    id: number;
    size: number; 
    hire_period_days: number;
    transport_cost: number | null;
    per_tonne_cost: number | null;
    price_before_vat: number;
    vat: number;
    postcode: string;
    area: string;
    forbidden: boolean; 
    created_at: string;
    updated_at: string;
    allowed_on_road: boolean;
    allows_heavy_waste: boolean;
  }

  export interface HeavyWasteType {
    id: number;
    name: string;
    is_heavy: boolean;
    description: string;
  }
  