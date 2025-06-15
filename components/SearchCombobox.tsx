// src/components/SearchCombobox.tsx
"use client";
import React, { useEffect, useRef, useState, useId } from "react";
import { useForm, Controller } from "react-hook-form";
import { MagnifyingGlassIcon, XMarkIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useAddressLookupSWR, useAddressRetrieveSWR } from "@/hooks/useAddressLookupSWR";
import { SearchResult, AddressDetails } from "@/types";
import { useAddressStore } from '@/store/addressStore';

export function SearchCombobox() {
    const router = useRouter();
    // Using Zustand for persistent state management
    // const selectedAddressDetails = useAddressStore((state) => state.selectedAddressDetails);
    const {
        selectedAddressDetails,
        city,
        addressLine,
        houseNumber,
        postalCode,
        selectedResultId,
        lastSearchTerm,
        setAddressSelection,
        clearAddressSelection,
        setSearchTerm: setSearchTermStore,
        setDetailsFromFetch,
    } = useAddressStore();

    const hasInitialized = useRef(false);
    const { control, setValue, watch } = useForm<{ search: string }>({
        defaultValues: { search: "" },
    });

    const searchTerm = watch("search");
    // Sync Zustand → useForm on first load only
    useEffect(() => {
        if (!hasInitialized.current && lastSearchTerm) {
            setValue("search", lastSearchTerm);
            hasInitialized.current = true;
        }
    }, [lastSearchTerm, setValue]);

    // Only update Zustand if we're not in initial hydration
    useEffect(() => {
        if (hasInitialized.current) {
            setSearchTermStore(searchTerm);
        }
    }, [searchTerm, setSearchTermStore]);
    const [showDropdown, setShowDropdown] = useState(false); 

    const comboboxRef = useRef<HTMLDivElement>(null);
    const inputId = useId();
    const listboxId = useId();

    // SWR for search suggestions (driven by react-hook-form's searchTerm)
    const { searchResults, isFinding, findError } = useAddressLookupSWR(searchTerm);

    // SWR for retrieving full address details (driven by Zustand's selectedResultId)
    const { addressDetails, isRetrieving, retrieveError } = useAddressRetrieveSWR(selectedResultId);


    useEffect(() => {
        // Only set if not already stored
        if (addressDetails && (!selectedAddressDetails || selectedAddressDetails.id !== addressDetails.id)) {
            setDetailsFromFetch(addressDetails);
        } else if (selectedResultId && retrieveError) {
            console.error("Failed to retrieve selected address details:", retrieveError);
            setDetailsFromFetch(null);
        }
    }, [addressDetails, retrieveError, selectedResultId, setDetailsFromFetch, selectedAddressDetails]);

    // Effect to update Zustand's `lastSearchTerm` as user types in the input
    useEffect(() => {
        if (hasInitialized.current) {
            setSearchTermStore(searchTerm);
        }
    }, [searchTerm, setSearchTermStore]);



    // Logic for showing/hiding dropdown
    useEffect(() => {
        const shouldShow = (
            searchTerm.length > 2 && !selectedResultId && (isFinding || searchResults.length > 0)
        );
        if (shouldShow !== showDropdown) {
            setShowDropdown(shouldShow);
        }
    }, [searchTerm, isFinding, searchResults.length, selectedResultId, showDropdown]);


    // Click outside dropdown to close
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (comboboxRef.current && !comboboxRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleClearSearch = () => {
        setValue("search", ""); 
        setShowDropdown(false); 
        clearAddressSelection(); 
    };

    const handleInputFocus = () => {
        if (!selectedResultId && searchTerm.length > 2 && searchResults.length > 0) {
            setShowDropdown(true);
        }
    };

    const handleResultClick = (result: SearchResult) => {
        const fullAddressText = result.secondaryText;
        setValue("search", fullAddressText);
        setShowDropdown(false);
        setAddressSelection(result.id, fullAddressText);
    };

    const handleContinue = () => {
        if (postalCode && selectedAddressDetails?.city && selectedAddressDetails?.line1) {
            router.push('/waste-type');
        } else {
            alert("Please ensure a complete address is selected before continuing.");
        }
    };

    return (
        <>
            <div className="relative w-full px-4 sm:px-0 md:max-w-lg lg:max-w-lg " ref={comboboxRef}>
                <div
                    className="relative flex items-center bg-[#212121] rounded-lg shadow-lg"
                    role="combobox"
                    aria-haspopup="listbox"
                    aria-expanded={showDropdown}
                    aria-controls={listboxId}
                >
                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 ml-3 flex-shrink-0" />

                    <Controller
                        name="search"
                        control={control}
                        render={({ field }) => (
                            <input
                                {...field}
                                id={inputId}
                                type="text"
                                placeholder="Start Typing Your Delivery Postcode Or Address"
                                className="flex-grow bg-transparent text-white md:w-xl placeholder-gray-500 focus:outline-none py-3 px-2 pr-10 text-base sm:text-lg rounded-lg"
                                onFocus={handleInputFocus}
                                aria-autocomplete="list"
                                aria-controls={listboxId}
                                aria-labelledby={inputId}
                            />
                        )}
                    />
                    {searchTerm && (
                        <XMarkIcon
                            className="h-5 w-5 text-gray-400 mr-3 cursor-pointer hover:text-white flex-shrink-0"
                            onClick={handleClearSearch}
                            aria-label="Clear search"
                        />
                    )}
                </div>

                {showDropdown && (
                    <div
                        id={listboxId}
                        role="listbox"
                        className="absolute z-10 w-full bg-[#212121] rounded-lg shadow-xl mt-2 max-h-72 overflow-y-auto custom-scrollbar"
                    >
                        {isFinding ? (
                            <div className="p-3 text-gray-400 text-center text-sm sm:text-base">Loading...</div>
                        ) : findError ? (
                            <div className="p-3 text-red-400 text-center text-sm sm:text-base">Error: {findError.message}</div>
                        ) : searchResults.length > 0 ? (
                            searchResults.map((result) => (
                                <div
                                    key={result.id}
                                    role="option"
                                    aria-selected={selectedResultId === result.id}
                                    className="flex items-center px-3 py-2 sm:px-4 sm:py-2 hover:bg-[#333333] cursor-pointer border-b border-gray-700 last:border-b-0"
                                    onClick={() => handleResultClick(result)}
                                >
                                    <MapPinIcon className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400 mr-3 flex-shrink-0" />
                                    <div>
                                        <p className="text-white text-base sm:text-lg font-semibold">{result.mainText}</p>
                                        <p className="text-gray-400 text-sm sm:text-base">{result.secondaryText}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            searchTerm.length > 2 && (
                                <div className="p-3 text-gray-400 text-center text-sm sm:text-base">No results found.</div>
                            )
                        )}
                    </div>
                )}
            </div>

            {/* Display selected address details and continue button */}
            {selectedAddressDetails && (
                <div className=" w-full px-4 sm:px-0 md:max-w-xl lg:max-w-2xl">
                    {isRetrieving && <div className="text-gray-400 text-center text-sm mb-2">Fetching full address details...</div>}
                    {retrieveError && <div className="text-red-400 text-center text-sm mb-2">Error loading full address: {retrieveError.message}</div>}

                    <div className="mb-2">
                        <label htmlFor="city" className="block text-gray-300 text-sm font-bold mb-2">City</label>
                        <input
                            id="city"
                            type="text"
                            value={selectedAddressDetails.city || ""}
                            className="bg-[#212121] text-white py-3 px-4 rounded-lg w-full focus:outline-none"
                            readOnly
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="streetName" className="block text-gray-300 text-sm font-bold mb-2">Street Name</label>
                        <input
                            id="streetName"
                            type="text"
                            value={selectedAddressDetails.line1 || ""}
                            className="bg-[#212121] text-white py-3 px-4 rounded-lg w-full focus:outline-none"
                            readOnly
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="houseNumber" className="block text-gray-300 text-sm font-bold mb-2">House/Flat Number</label>
                        <input
                            id="houseNumber"
                            type="text"
                            value={selectedAddressDetails.buildingNumber || selectedAddressDetails.line2 || selectedAddressDetails.line3 || ""}
                            className="bg-[#212121] text-white py-3 px-4 rounded-lg w-full focus:outline-none"
                            readOnly
                        />
                    </div>

                    <button
                        onClick={handleContinue}
                        className={`bg-[#0037c1] text-white text-center w-full py-2.5 px-6 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-200
                        ${!postalCode || !selectedAddressDetails.city || !selectedAddressDetails.line1 || isRetrieving ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={!postalCode || !selectedAddressDetails.city || !selectedAddressDetails.line1 || isRetrieving}
                    >
                        Continue &rarr;
                    </button>
                </div>
            )}
        </>
    );
}