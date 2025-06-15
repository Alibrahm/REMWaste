// src/hooks/useAddressLookupSWR.ts
"use client";

import useSWR from 'swr';
import { useDebounce } from './useDebounce'; 
import { SearchResult, AddressDetails } from "@/types";

const API_KEY = "JP84-GY97-YZ96-GG45";

// SWR fetcher function for the Find API
const findFetcher = async (url: string): Promise<SearchResult[]> => {
    console.log("Fetching URL:", url);
    const response = await fetch(url);
    const data = await response.json();
    console.log("Raw API Response Data:", data);
  
    if (data?.Items && Array.isArray(data.Items)) {
      const mappedResults = data.Items.map((item: any) => ({
        id: item.Id,
        mainText: item.Text,
        secondaryText: item.Description,
      }));
      console.log("Mapped Search Results:", mappedResults);
      return mappedResults;
    } else if (data?.Items && data.Items.length > 0 && data.Items[0].Error) {
      console.error("API Error returned:", data.Items[0].Description);
      throw new Error(data.Items[0].Description);
    }
    console.log("API response did not match expected structure or was empty.");
    return [];
  };

// SWR fetcher function for the Retrieve API
const retrieveFetcher = async (url: string): Promise<AddressDetails | null> => {
  const response = await fetch(url);
  const data = await response.json();
  if (data?.Items && Array.isArray(data.Items) && data.Items.length > 0) {
    const item = data.Items[0];
    return {
      line1: item.Line1 || '',
      line2: item.Line2 || '',
      line3: item.Line3 || '',
      line4: item.Line4 || '',
      buildingNumber: item.BuildingNumber || '',
      city: item.City || '',
      county: item.County || '',
      postcode: item.PostalCode || '',
      country: item.CountryName || '',
    };
  } else if (data?.Items && data.Items.length > 0 && data.Items[0].Error) {
    throw new Error(data.Items[0].Description);
  }
  return null;
};

// Custom hook to encapsulate SWR logic for address search suggestions
export const useAddressLookupSWR = (searchTerm: string) => {
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const findKey = debouncedSearchTerm.length > 2
    ? `https://services.postcodeanywhere.co.uk/Capture/Interactive/Find/v1.00/json3ex.ws?Key=${API_KEY}&Origin=GBR&Countries=GB&Limit=7&Language=en&Text=${encodeURIComponent(debouncedSearchTerm)}`
    : null;

  const { data: searchResults, error: findError, isLoading: isFinding } = useSWR(
    findKey,
    findFetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
console.log("The fetch searchresults",searchResults)
console.log("The searchterm",searchTerm)
  return {
    searchResults: searchResults || [],
    isFinding,
    findError,
  };
};

// Custom hook to retrieve a specific address details 
export const useAddressRetrieveSWR = (addressId: string | null) => {
  const retrieveKey = addressId
    ? `https://services.postcodeanywhere.co.uk/Capture/Interactive/Retrieve/v1.00/json3ex.ws?Key=${API_KEY}&Id=${encodeURIComponent(addressId)}`
    : null;

  const { data: addressDetails, error: retrieveError, isLoading: isRetrieving } = useSWR(
    retrieveKey,
    retrieveFetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return {
    addressDetails,
    isRetrieving,
    retrieveError,
  };
};