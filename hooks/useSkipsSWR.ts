// src/hooks/useSkipsSWR.ts
"use client";

import useSWR from 'swr';
import { Skip } from '@/types';

// Fetcher function for skips API
const skipsFetcher = async (url: string): Promise<Skip[]> => {
  const response = await fetch(url);
  if (!response.ok) {
    // If the API returns a non-2xx status, throw an error
    const errorData = await response.json().catch(() => ({ message: "Unknown error" }));
    throw new Error(errorData.message || `Failed to fetch skips: ${response.status} ${response.statusText}`);
  }
  const data = await response.json();
  // Ensure the data is an array of Skip objects
  if (Array.isArray(data)) {
    return data;
  }
  return []; // Return empty array if unexpected response
};

export const useSkipsSWR = (postcode: string | null, area: string | null) => {
  // Construct the URL. Encode postcode and area for safe URL parameters.
  // Only fetch if postcode is available.
  const queryPostcode = postcode ? encodeURIComponent(postcode) : '';
  const queryArea = area ? `&area=${encodeURIComponent(area)}` : ''; // Area is optional

  const apiUrl = postcode
    ? `https://app.wewantwaste.co.uk/api/skips/by-location?postcode=${queryPostcode}${queryArea}`
    : null; // `null` prevents SWR from fetching

  const { data: skips, error, isLoading: isLoadingSkips } = useSWR(
    apiUrl,
    skipsFetcher,
    {
      revalidateOnFocus: false, // Skips data usually doesn't change frequently on focus
      revalidateOnReconnect: false, // Same for reconnect
      // Add a short dedupingInterval to prevent duplicate requests if the key changes rapidly
      // (though with `null` when no postcode, this is less critical)
      dedupingInterval: 5000, // 5 seconds
    }
  );

  return {
    skips: skips || [], // Ensure it's always an array
    error,
    isLoadingSkips,
  };
};