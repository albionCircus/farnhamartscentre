"use client";

import React from "react";
import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  queryParams?: Record<string, string>;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, queryParams }) => {
  if (totalPages <= 1) return null;

  const buildPageLink = (page: number) => {
    const params = new URLSearchParams({ ...(queryParams || {}), page: page.toString() });
    return `?${params.toString()}`;
  };

  return (
    <nav className="flex justify-center space-x-4 pt-7 sm:pt-10 pb-3" aria-label="Pagination Navigation">
      {currentPage > 1 && (
        <Link
          aria-label="Go to previous page"
          className="cursor-pointer text-primary underline text-slate-600 underline-offset-4"
          href={buildPageLink(currentPage - 1)}
        >
          Previous
        </Link>
      )}
      {Array.from({ length: totalPages }, (_, i) => (
        <Link
          key={i}
          href={buildPageLink(i + 1)}
          aria-label={`Go to page ${i + 1}`}
          className={`${
            i + 1 === currentPage ? "text-red" : "text-primary underline text-slate-600 underline-offset-4"
          } cursor-pointer`}
        >
          {i + 1}
        </Link>
      ))}
      {currentPage < totalPages && (
        <Link
          aria-label="Go to next page"
          className="cursor-pointer text-primary underline text-slate-600 underline-offset-4"
          href={buildPageLink(currentPage + 1)}
        >
          Next
        </Link>
      )}
    </nav>
  );
};

export default Pagination;