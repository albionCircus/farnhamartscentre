"use client";

import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { PrismicDocument } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { Calendar } from 'lucide-react'

interface PostGridProps {
  posts: PrismicDocument[];
}

export default function PostGrid({ posts }: PostGridProps) {
  const searchParams = useSearchParams();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [visiblePosts, setVisiblePosts] = useState(posts);
  const prevParamsRef = useRef("");
  
  // Listen for search params changes to trigger smooth transitions
  useEffect(() => {
    const currentParams = searchParams.toString();
    
    // Only perform transition if params changed (not on initial render)
    if (prevParamsRef.current && prevParamsRef.current !== currentParams) {
      // Start transition - fade out current content
      setIsTransitioning(true);
      
      // After content fades out, update posts and fade back in
      setTimeout(() => {
        setVisiblePosts(posts);
        setIsTransitioning(false);
      }, 200);
    } else {
      // Initial load or direct navigation
      setVisiblePosts(posts);
    }
    
    // Track previous params for comparison
    prevParamsRef.current = currentParams;
  }, [searchParams, posts]);
  
  // Also check if loading state is set by filter component
  useEffect(() => {
    const filterStateElem = document.getElementById("category-filter-state");
    if (filterStateElem && filterStateElem.dataset.loading === "true") {
      setIsTransitioning(true);
      
      setTimeout(() => {
        setVisiblePosts(posts);
        setIsTransitioning(false);
      }, 200);
    }
  }, [posts]);
  
  return (
    <div 
      className={`grid auto-rows-min sm:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-8 transition-opacity duration-200 ease-in-out ${
        isTransitioning ? "opacity-0" : "opacity-100"
      }`}
    >
      {visiblePosts.map((post: PrismicDocument, index: number) => (
        <PrismicNextLink document={post} key={post.id || index}>
          <article className="bg-white h-full transition-all duration-200 hover:shadow-md">
            <div className="overflow-hidden">
              <PrismicNextImage 
                field={post.data.image} 
                className="w-full h-auto transition-transform duration-300 hover:scale-105"
              />
            </div>
            <div className="p-3.5 border-b-1 border-l-1 border-r-1 sm:min-h-[240px]">
              <p className="text-gray-500 border-2 border-gray-200 w-fit px-1.5 p-0.5 rounded-md mb-3 tracking-wide">
                <cite>{post.data.category}</cite>
              </p>
              <h4 className="text-sky-950">{post.data.heading}</h4>
              <p className="pt-2">{post.data.description}</p>
              {/* <p className="my-3">
                {new Date(
                  post.data.original_date || Date.now()
                ).toLocaleDateString("en-GB")}
              </p> */}
              <div className="flex mt-8">
                <Calendar size={24} className="mr-1.5 stroke-gray-500" />
                <p>{post.data.date_range}</p>
              </div>
            </div>
          </article>
        </PrismicNextLink>
      ))}
      
      {/* Show loading spinner during transitions */}
      {isTransitioning && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <svg 
            className="animate-spin h-12 w-12 text-sky-950" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24"
          >
            <circle 
              className="opacity-25" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4"
            ></circle>
            <path 
              className="opacity-75" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      )}
    </div>
  );
}