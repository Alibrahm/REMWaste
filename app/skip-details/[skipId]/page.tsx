// src/app/skip-details/[skipId]/page.tsx
"use client";
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { ChevronRightIcon, CheckCircleIcon, InformationCircleIcon } from '@heroicons/react/20/solid';
import { Accordion } from '@/components/Accordion';
// Mock Data Type 
interface Skip {
    id: number;
    size: number;
    hire_period_days: number;
    price_before_vat: number;
    vat: number;
    allowed_on_road: boolean;
    allows_heavy_waste: boolean;
    general_waste_description: string;
    max_weight_tonnes: number;
    length_m: number;
    width_m: number;
    height_m: number;
    image_main: string;
    image_thumbnails: string[];
}

// Mock Function to fetch Skip Details 
const getMockSkipDetails = (id: string): Skip | null => {
    const skips: Skip[] = [
        {
            id: 17933,
            size: 8,
            hire_period_days: 14,
            price_before_vat: 289.80,
            vat: 20,
            allowed_on_road: true,
            allows_heavy_waste: true,
            general_waste_description: "Perfect for larger household clearances, construction waste, or garden projects. Can hold approximately 80-90 black bags of waste.",
            max_weight_tonnes: 8,
            length_m: 3.66,
            width_m: 1.68,
            height_m: 1.22,
            image_main: '/images/wasteskipbg.png',
            image_thumbnails: [
                '/images/wasteskipbg.png',
                '/images/wasteskipbg.png',
            ]
        },
        {
            id: 6565,
            size: 6,
            hire_period_days: 14,
            price_before_vat: 274.80,
            vat: 20,
            allowed_on_road: true,
            allows_heavy_waste: false,
            general_waste_description: "Ideal for medium-sized household clear-outs or garden work. Holds approximately 60-70 black bags of waste.",
            max_weight_tonnes: 6,
            length_m: 2.60,
            width_m: 1.50,
            height_m: 1.20,
            image_main: '/images/wasteskipbg.png',
            image_thumbnails: [
                '/images/wasteskipbg.png',
                '/images/wasteskipbg.png',
            ]
        }
    ];
    return skips.find(s => s.id.toString() === id) || null;
};

export default function SkipDetailsPage() {
    const params = useParams();
    const { skipId } = params;
    const skip = getMockSkipDetails(skipId as string);

    const [mainImage, setMainImage] = useState(skip?.image_main || '');
    const [hireDuration, setHireDuration] = useState(skip?.hire_period_days.toString() || '14');
    const [addDoor, setAddDoor] = useState(false);
    const [preferredDeliveryDate, setPreferredDeliveryDate] = useState('');
    const [quantity, setQuantity] = useState(1);

    if (!skip) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <p>Skip details not found.</p>
            </div>
        );
    }

    // Calculate prices
    const basePrice = skip.price_before_vat;
    const vatAmount = basePrice * (skip.vat / 100);
    const totalPrice = (basePrice + vatAmount + (addDoor ? 25 : 0)).toFixed(2);
    const wasPrice = (basePrice * 1.15 * (1 + skip.vat / 100)).toFixed(2);

    return (
        <div className="min-h-screen bg-black text-white relative overflow-hidden">
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: 'url(/images/wasteskipbg.png)',
                    backgroundRepeat: 'repeat',
                    backgroundSize: 'auto',
                    backgroundAttachment: 'fixed',
                }}
            >
                <div className="absolute inset-0 bg-black/50 backdrop-brightness-75"></div>
            </div>

            {/* Existing subtle light pattern - Reduced opacity even further to blend with image */}
            <div className="absolute inset-0 z-10 opacity-5">
                <div className="absolute inset-0 bg-[length:60px_60px] [background-image:linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)]"></div>
                <div className="absolute inset-0 bg-[length:100px_100px] [background-image:linear-gradient(45deg,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(-45deg,rgba(255,255,255,0.01)_1px,transparent_1px)]"></div>
            </div>

            {/* Removed the animated glowing blobs for consistency with select-skip page and cleaner look with image background */}

            <div className="relative z-20 container mx-auto px-4 py-8">
                {/* Breadcrumbs */}
                <nav className="text-gray-300 text-sm mb-6">
                    <ol className="list-none p-0 inline-flex">
                        <li className="flex items-center">
                            <Link href="/" className="hover:text-white">Home</Link>
                            <ChevronRightIcon className="h-4 w-4 mx-1" />
                        </li>
                        <li className="flex items-center">
                            <Link href="/select-skip" className="hover:text-white">Waste & Skip Hire</Link>
                            <ChevronRightIcon className="h-4 w-4 mx-1" />
                        </li>
                        <li className="flex items-center text-white">
                            {skip.size} Yard Skip
                        </li>
                    </ol>
                </nav>

                {/* Main Product Content Area - Added translucent dark background for readability */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-gray-900/80 p-6 rounded-xl shadow-2xl backdrop-blur-sm border border-gray-800">
                    {/* Left Column: Image Gallery */}
                    <div className="flex flex-col items-center">
                        <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-gray-800 border border-gray-700 shadow-xl mb-4 flex items-center justify-center">
                            <Image
                                src={mainImage || skip.image_main}
                                alt={`${skip.size} Yard Skip`}
                                layout="fill"
                                objectFit="contain"
                                className="transition-opacity duration-300"
                                onError={(e) => { e.currentTarget.src = `https://placehold.co/600x400/2A3B4C/E0E0E0?text=Skip+${skip.size}Yd`; e.currentTarget.style.objectFit = 'contain'; }}
                            />
                            {/* "SALE! 14 DAYS FOR 7 DAYS" banner */}
                            <div className="absolute top-4 left-4 bg-red-600 text-white text-sm font-bold px-4 py-2 rounded-md shadow-lg">
                                SALE! {skip.hire_period_days} DAYS FOR {skip.hire_period_days / 2} DAYS
                            </div>
                        </div>

                        {/* Thumbnails */}
                        <div className="flex space-x-3 mt-2">
                            {skip.image_thumbnails.map((img, index) => (
                                <Image
                                    key={index}
                                    src={img}
                                    alt={`Thumbnail ${index + 1}`}
                                    width={80}
                                    height={60}
                                    objectFit="cover"
                                    className={`rounded-md cursor-pointer border-2 transition-all duration-200
                    ${mainImage === img ? 'border-[#0037C1]' : 'border-gray-700 hover:border-gray-500'}
                  `}
                                    onClick={() => setMainImage(img)}
                                    onError={(e) => { e.currentTarget.src = `https://placehold.co/80x60/2A3B4C/E0E0E0?text=Thumb`; }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Product Details & Options */}
                    <div className="flex flex-col">
                        <h1 className="text-4xl font-extrabold text-white mb-2">{skip.size} Yard Skip – General Waste</h1>
                        <p className="text-lg text-gray-400 mb-4">{skip.general_waste_description}</p>

                        {/* Price */}
                        <div className="flex items-baseline mb-4">
                            <span className="text-5xl font-bold text-[#0037C1] mr-3">&pound;{totalPrice}</span>
                            <span className="text-xl text-gray-500 line-through">Was &pound;{wasPrice}</span>
                        </div>
                        <p className="text-gray-400 text-sm mb-4">Pricing and availability is subject to your location. Please enter your postcode for an accurate price.</p>

                        {/* Postcode Input */}
                        <div className="flex items-center mb-6">
                            <input
                                type="text"
                                placeholder="E.g. PE28 8XU"
                                className="flex-grow p-3 rounded-l-md bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-[#0037C1]"
                            />
                            <button className="bg-[#0037C1] text-white px-6 py-3 rounded-r-md font-semibold hover:bg-blue-700 transition-colors">
                                Check
                            </button>
                        </div>

                        {/* Key Features */}
                        <ul className="text-gray-300 text-base mb-6 space-y-2">
                            <li className="flex items-center"><CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" /> Finance Options Available</li>
                            <li className="flex items-center"><CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" /> Quick Delivery & Great Rates</li>
                            <li className="flex items-center"><CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" /> {skip.hire_period_days} Days for {skip.hire_period_days / 2} Days (Example)</li>
                            {skip.allowed_on_road && <li className="flex items-center"><CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" /> Road Placement Allowed</li>}
                            {skip.allows_heavy_waste && <li className="flex items-center"><CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" /> Accepts Heavy Waste</li>}
                        </ul>

                        <h2 className="text-2xl font-bold text-white mb-4">Optional Extras</h2>

                        {/* Hire Duration Dropdown */}
                        <div className="mb-4">
                            <label htmlFor="hireDuration" className="block text-gray-300 text-sm font-medium mb-2">Skip Hire Duration*</label>
                            <select
                                id="hireDuration"
                                value={hireDuration}
                                onChange={(e) => setHireDuration(e.target.value)}
                                className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-[#0037C1]"
                            >
                                <option value="7">7 Days</option>
                                <option value="14">14 Days</option>
                                <option value="21">21 Days</option>
                            </select>
                        </div>

                        {/* Add a Door Checkbox */}
                        <div className="flex items-center mb-6">
                            <input
                                type="checkbox"
                                id="addDoor"
                                checked={addDoor}
                                onChange={(e) => setAddDoor(e.target.checked)}
                                className="h-5 w-5 text-[#0037C1] rounded border-gray-700 focus:ring-[#0037C1] bg-gray-800"
                            />
                            <label htmlFor="addDoor" className="ml-3 text-white text-base">
                                Add a Door to your Skip <span className="text-gray-400">(+&pound;25.00)</span>
                            </label>
                        </div>

                        {/* Preferred Delivery Date */}
                        <div className="mb-4">
                            <label htmlFor="deliveryDate" className="block text-gray-300 text-sm font-medium mb-2">Preferred Delivery Date*</label>
                            <input
                                type="date"
                                id="deliveryDate"
                                value={preferredDeliveryDate}
                                onChange={(e) => setPreferredDeliveryDate(e.target.value)}
                                className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-[#0037C1]"
                            />
                        </div>

                        {/* Estimated Collection Date */}
                        <div className="mb-6">
                            <label htmlFor="collectionDate" className="block text-gray-300 text-sm font-medium mb-2">Estimated Skip Collection Date</label>
                            <input
                                type="text"
                                id="collectionDate"
                                value="01/07/2025"
                                readOnly
                                className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 text-gray-400 cursor-not-allowed focus:outline-none"
                            />
                            <p className="text-gray-500 text-xs mt-1">
                                (Subject to change with prior notification, up to 5 working days beyond the stipulated collection date)
                            </p>
                        </div>

                        {/* Skip Plus Bonus */}
                        <div className="bg-gradient-to-r from-[#0037C1] to-blue-600 rounded-lg p-5 flex flex-col md:flex-row items-center justify-between mb-8 shadow-xl">
                            <div className="mb-4 md:mb-0 md:mr-4">
                                <h3 className="text-3xl font-bold text-white leading-tight">REM WASTE ALL INCLUSIVE <br /> <span className="text-4xl">Skip+</span></h3>
                                <p className="text-white text-opacity-80 mt-2">IT PAYS TO GO PLUS!</p>
                                <p className="text-white text-opacity-90 mt-1">Get the most out of your Skip Hire with amazing extras now just <span className="font-bold text-lg">&pound;9.99</span></p>
                            </div>
                            <div className="relative w-40 h-32 md:w-48 md:h-40 flex-shrink-0">
                                <Image
                                    src="/images/selectbanner.png"
                                    alt="SKip"
                                    layout="fill"
                                    objectFit="contain"
                                />
                            </div>
                        </div>


                        {/* Quantity Selector & Add to Basket */}
                        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
                            <div className="flex items-center bg-gray-800 rounded-md border border-gray-700">
                                <button
                                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                                    className="p-3 text-white hover:bg-gray-700 rounded-l-md transition-colors"
                                >
                                    -
                                </button>
                                <input
                                    type="number"
                                    value={quantity}
                                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                    className="w-16 text-center bg-transparent text-white font-semibold text-lg focus:outline-none"
                                    min="1"
                                />
                                <button
                                    onClick={() => setQuantity(prev => prev + 1)}
                                    className="p-3 text-white hover:bg-gray-700 rounded-r-md transition-colors"
                                >
                                    +
                                </button>
                            </div>
                            <button className="flex-grow bg-[#0037C1] text-white py-3 rounded-md font-semibold text-lg hover:bg-blue-700 transition-colors shadow-lg">
                                Add to basket
                            </button>
                        </div>

                        {/* Accordion Sections */}
                        <div className="border-t border-gray-700 mt-8">
                            <Accordion title="Product Information">
                                <p>
                                    Our {skip.size} Yard Skip is perfect for {skip.general_waste_description.toLowerCase()}.
                                    It has a maximum weight capacity of {skip.max_weight_tonnes} tonnes.
                                    Dimensions: Length {skip.length_m}m, Width {skip.width_m}m, Height {skip.height_m}m.
                                </p>
                                {skip.allowed_on_road && <p className="mt-2 flex items-center text-blue-300"><InformationCircleIcon className="h-5 w-5 mr-1" /> This skip is suitable for road placement. A permit may be required.</p>}
                                {skip.allows_heavy_waste && <p className="mt-2 flex items-center text-green-400"><InformationCircleIcon className="h-5 w-5 mr-1" /> Accepts heavy waste including soil, concrete, and rubble.</p>}
                            </Accordion>

                            <Accordion title="Delivery Information">
                                <p>
                                    We aim for quick and reliable delivery directly to your specified location.
                                    Delivery times can vary based on your postcode and current demand.
                                    Our standard delivery window is 7 AM - 5 PM on your preferred date.
                                </p>
                                <p className="mt-2">
                                    Please ensure there is clear access for our vehicles.
                                </p>
                            </Accordion>

                            <Accordion title="What can I put in my skip?">
                                <p>Generally, you can put:</p>
                                <ul className="list-disc list-inside mt-2 space-y-1">
                                    <li>Household waste (e.g., furniture, clothes, toys)</li>
                                    <li>Garden waste (e.g., branches, leaves, soil)</li>
                                    <li>Building waste (e.g., bricks, rubble, concrete)</li>
                                </ul>
                                <p className="mt-2 font-semibold">Prohibited items include (but are not limited to):</p>
                                <ul className="list-disc list-inside mt-2 space-y-1 text-red-300">
                                    <li>Asbestos</li>
                                    <li>Batteries</li>
                                    <li>Chemicals/Oils</li>
                                    <li>Tyres</li>
                                    <li>Fridges/Freezers</li>
                                </ul>
                                <p className="mt-2">Please refer to our full waste guide for detailed information.</p>
                            </Accordion>

                            <Accordion title="Skip Size Guide">
                                <p>
                                    Not sure which skip size you need? Here's a quick guide:
                                </p>
                                <ul className="list-disc list-inside mt-2 space-y-1">
                                    <li>**2-3 Yard:** Small clear-outs, garden waste. (Approx. 25-35 black bags)</li>
                                    <li>**4-6 Yard:** Medium clear-outs, kitchen/bathroom refits. (Approx. 40-60 black bags)</li>
                                    <li>**8-12 Yard:** Large clear-outs, construction projects. (Approx. 80-120 black bags)</li>
                                    <li>**14-40 Yard:** Commercial waste, very large projects. (Only available for specific waste types)</li>
                                </ul>
                            </Accordion>

                            <Accordion title="Downloads">
                                <p>Find useful documents and guides here:</p>
                                <ul className="list-disc list-inside mt-2 space-y-1">
                                    <li><a href="#" className="text-[#0037C1] hover:underline">Waste Acceptance Policy (PDF)</a></li>
                                    <li><a href="#" className="text-[#0037C1] hover:underline">Skip Hire Terms & Conditions (PDF)</a></li>
                                </ul>
                            </Accordion>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}