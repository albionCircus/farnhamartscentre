"use client";

import React, { RefObject } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface CategoryFilterProps {
  allCategories: string[];
  selectedCategory: string;
  scrollToRef?: RefObject<HTMLElement | null>;
}

export default function CategoryFilter({
  allCategories,
  selectedCategory,
  scrollToRef,
}: CategoryFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams.toString());
    const value = e.target.value;

    if (value) {
      params.set("category", value);
    } else {
      params.delete("category");
    }

    params.delete("page");

    router.push(`?${params.toString()}`);

    // Smooth scroll to the content section after URL change
    setTimeout(() => {
      if (scrollToRef?.current) {
        scrollToRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 50); // delay helps after route push
  };

  return (
    <div className="relative w-48 mb-6">
      <select
        id="category"
        name="category"
        value={selectedCategory}
        onChange={handleChange}
        className="appearance-none w-full p-2 pr-10 border border-gray-300 rounded text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">All Categories</option>
        {allCategories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center pl-2 border-l border-gray-300">
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
      </div>
    </div>
  );
}
