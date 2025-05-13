"use client";

import { useState } from "react";
import CategoryFilter from "./CategoryFilter";

interface ClientCategoryFilterProps {
  allCategories: string[];
  selectedCategory: string;
}

export default function ClientCategoryFilter({
  allCategories,
  selectedCategory,
}: ClientCategoryFilterProps) {
  // Add loading state for content transitions
  const [isLoading, setIsLoading] = useState(false);
  
  // Handle filter change notification
  const handleFilterChange = () => {
    setIsLoading(true);
    
    // Reset loading state after a short delay
    // This will be used by the parent component to fade out/in content
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  };
  
  return (
    <>
      <CategoryFilter
        allCategories={allCategories}
        selectedCategory={selectedCategory}
        onFilterChange={handleFilterChange}
      />
      
      {/* Expose loading state to parent component via data attribute */}
      <div 
        id="category-filter-state" 
        data-loading={isLoading.toString()} 
        className="hidden" 
      />
    </>
  );
}