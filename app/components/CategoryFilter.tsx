"use client";

import React, { useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface CategoryFilterProps {
  allCategories: string[];
  selectedCategory: string;
  onFilterChange?: () => void; // Callback to notify parent of filter changes
}

export default function CategoryFilter({
  allCategories,
  selectedCategory,
  onFilterChange,
}: CategoryFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [localCategory, setLocalCategory] = useState(selectedCategory);
  
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setLocalCategory(value);
    
    // Store current scroll position
    const currentScrollPos = window.scrollY;
    
    // Create the new URL parameters
    const params = new URLSearchParams(searchParams.toString());
    
    if (value) {
      params.set("category", value);
    } else {
      params.delete("category");
    }
    params.delete("page");
    
    // Notify parent component about the filter change
    if (onFilterChange) {
      onFilterChange();
    }
    
    // Use startTransition to mark this as a non-urgent update
    startTransition(() => {
      // Use router.replace instead of push to avoid adding to history stack
      // This can reduce some of the navigation overhead
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
      
      // Preserve scroll position
      const preserveScroll = () => {
        window.scrollTo(0, currentScrollPos);
      };
      
      // Schedule multiple attempts to preserve scroll
      preserveScroll();
      requestAnimationFrame(preserveScroll);
      setTimeout(preserveScroll, 10);
      setTimeout(preserveScroll, 50);
    });
  };

  return (
    <div className="relative w-48 mb-6">
      <select
        id="category"
        name="category"
        value={localCategory}
        onChange={handleChange}
        disabled={isPending}
        className={`appearance-none w-full p-2 pr-10 border border-gray-300 rounded text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-opacity duration-200 ${
          isPending ? "opacity-70 cursor-wait" : ""
        }`}
      >
        <option value="">All Categories</option>
        {allCategories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center pl-2 border-l border-gray-300">
        {isPending ? (
          <svg className="animate-spin h-4 w-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        ) : (
          <svg
            className="w-4 h-4 text-gray-500 transition-transform duration-200 ease-in-out"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </div>
    </div>
  );
}