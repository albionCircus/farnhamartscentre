"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

interface CategoryFilterProps {
  allCategories: string[];
  selectedCategory: string;
}

export default function CategoryFilter({
  allCategories,
  selectedCategory,
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

    // Always reset page when filter changes
    params.delete("page");

    router.push(`?${params.toString()}`);
  };

  return (
    <form className="flex gap-4 items-center mb-6">
      {/* <label htmlFor="category" className="text-sm font-medium">
        Filter by category:
      </label> */}
      <select
        id="category"
        name="category"
        value={selectedCategory}
        onChange={handleChange}
        className="p-2 border border-gray-300 rounded"
      >
        <option value="">All Categories</option>
        {allCategories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </form>
  );
}