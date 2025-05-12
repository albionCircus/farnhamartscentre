"use client";

import { useRef } from "react";
import CategoryFilter from "./CategoryFilter";

interface ClientCategoryFilterProps {
  allCategories: string[];
  selectedCategory: string;
}

export default function ClientCategoryFilter({
  allCategories,
  selectedCategory,
}: ClientCategoryFilterProps) {
  const scrollTargetRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <CategoryFilter
        allCategories={allCategories}
        selectedCategory={selectedCategory}
        scrollToRef={scrollTargetRef}
      />

      {/* Pass this ref to the parent to scroll to */}
      <div ref={scrollTargetRef} />
    </>
  );
}
