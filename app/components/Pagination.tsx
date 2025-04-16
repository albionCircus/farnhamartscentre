"use client"; // Ensures the component is client-side

import React from "react";
import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void; // Optional callback for page change
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages }) => {
  // Do not render the pagination component if there is only one page
  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav className="flex justify-center space-x-4 pt-7 sm:pt-10 pb-3" aria-label="Pagination Navigation">
      {currentPage > 1 && (
        <Link
          aria-label="Go to previous page"
          className="cursor-pointer text-primary underline text-slate-600 underline-offset-4"
          href={`?page=${currentPage - 1}`}
          passHref
        >
          Previous
        </Link>
      )}
      {Array.from({ length: totalPages }, (_, i) => (
        <Link
          key={i}
          href={`?page=${i + 1}`}
          aria-label={`Go to page ${i + 1}`}
          className={`${
            i + 1 === currentPage ? "text-red" : "text-primary underline text-slate-600 underline-offset-4"
          } cursor-pointer`}
          passHref
        >
          {i + 1}
        </Link>
      ))}
      {currentPage < totalPages && (
        <Link
          aria-label="Go to next page"
          className="cursor-pointer text-primary underline text-slate-600 underline-offset-4"
          href={`?page=${currentPage + 1}`}
          passHref
        >
          Next
        </Link>
      )}
    </nav>
  );
};

export default Pagination;