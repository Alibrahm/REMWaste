# Waste Management Skip Hire Website - Interview Submission

## 📌 Project Overview
This submission presents a complete redesign of a Skip Hire product details page, built as a technical interview challenge. The primary objective was to create a **modern**, **responsive**, and **highly usable UI/UX** while maintaining full functionality.

---

## 🎨 Design & UI/UX Philosophy

The redesign prioritized a clean, intuitive, and visually engaging user experience. Key design decisions include:

- **Modern Aesthetic**: Dark theme with vibrant blue accents and subtle background textures.
- **Clear Information Hierarchy**: Emphasis on pricing and skip features.
- **Mobile-First Responsiveness**: Optimized for all screen sizes using Tailwind CSS.
- **Enhanced Interactivity**: Image gallery, quantity selector, accordions for structured content.
- **Promotional Highlighting**: Eye-catching banners for special offers and premium services.

---

## ⚙️ Technical Implementation

### Why Next.js?
I chose **Next.js 14+ (App Router)** for several compelling reasons:

- **Performance Optimization**: Built-in SSR/SSG, image optimization, and code-splitting.
- **Developer Experience**: Flexible file-based routing and component architecture.
- **Built-in API Routes**: Perfect for seamless backend integrations.
- **Scalability**: Designed to scale with production-grade applications.

---

## 🛠 Key Technologies

| Technology         | Purpose                                                                 |
|--------------------|-------------------------------------------------------------------------|
| **Next.js**        | Full-stack React framework with routing, rendering, and API capabilities |
| **React**          | Declarative UI component development                                     |
| **TypeScript**     | Static typing for improved code safety and tooling                       |
| **Tailwind CSS**   | Utility-first framework for consistent styling and responsiveness        |
| **React Hook Form**| Form state management and validation                                     |
| **SWR**            | Efficient server-side data fetching with caching & revalidation          |
| **Zustand**        | Lightweight global state management                                      |
| **Heroicons**      | Professional SVG icons                                                   |

---

## 🧾 Types Setup (`src/types/index.ts`)

TypeScript was integrated from the start to improve maintainability and reduce runtime issues.

- **Clear Data Models**: Interfaces like `Skip`, `SearchResult`, `AddressDetails`.
- **Typed API Responses**: Ensures data structure consistency from APIs.
- **Improved DX**: Autocomplete, refactoring support, and early error detection.
- **Maintainability**: Types make it easier to debug, extend, and collaborate.
- Example: Adjusting `id?: string;` in `AddressDetails` to match external API formats.

---

## 🏗 Architectural Highlights

- **Component-Based**: Modular, reusable UI pieces for consistency and scalability.
- **Clear State Management**:
  - `useState`: Local UI interactions.
  - `React Hook Form`: Controlled form input state.
  - `SWR`: Efficient API data management.
  - `Zustand`: Shared client-side state (e.g., selected address).
- **Custom Hooks**:
  - `useAddressLookupSWR`: Live search with debounce.
  - `useDebounce`: Utility hook for optimized queries.
- **Next.js Image Optimization**: Configured via `next.config.js` using `remotePatterns` for external images (e.g., Supabase).

---

## 🔗 API Integration

The app demonstrates real-world API usage through:

- **Postcode Anywhere API**: Address lookup & suggestions using `useAddressLookupSWR` and `useAddressRetrieveSWR`.
- **Extensible Architecture**: Easily adaptable to include live skip data from: https://app.wewantwaste.co.uk/api/skips/by-location

---
![image](https://github.com/user-attachments/assets/f27186ef-bc51-4762-93dc-10f873b83a3f)
on mobile
![image](https://github.com/user-attachments/assets/e3c75e5b-eea7-4402-982e-7f392bfd0dda)

![image](https://github.com/user-attachments/assets/2e4645c1-fcf9-4f6f-8db5-b8033c436efd)
![image](https://github.com/user-attachments/assets/cc357804-f431-4bff-82a7-2a890ed7c8a2)

![image](https://github.com/user-attachments/assets/f7c9aaa4-499f-45c0-ac02-9d0595f6f0f0)
![image](https://github.com/user-attachments/assets/21d1241f-d1ce-45c0-b11d-d4d9640ad685)

![image](https://github.com/user-attachments/assets/4588c275-f04d-4fb6-8d99-e6075d6a1d50)

![image](https://github.com/user-attachments/assets/a36ae053-476b-4d9a-bb14-7b91fc5e4b08)

![image](https://github.com/user-attachments/assets/de429957-f5c9-43ce-99a8-597b99bd519d)
![image](https://github.com/user-attachments/assets/32e1d112-51ac-41e1-961a-7ff4cb4ff8f8)
corresponding mobile 
![image](https://github.com/user-attachments/assets/f1596d0f-d573-4df8-b36f-a01d680d8063)

## 🚀 Setup & Run

```bash
# Clone the repository
git clone https://github.com/Alibrahm/REMWaste && cd REMWaste

# Install dependencies
npm install

# Start the development server
npm run dev
