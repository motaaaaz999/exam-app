"use client";
import { getSubjects } from "@/lib/api/subject.api";
import { useInfiniteQuery } from "@tanstack/react-query";

/**
 * Custom hook for fetching subjects with infinite scrolling/pagination support
 */
export const useSubjects = () => {
  const {
    data: payload,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    error,
    fetchNextPage,
  } = useInfiniteQuery({
    // Unique Key
    queryKey: ["subjects"],

    // Function that fetches data for each page
    queryFn: ({ pageParam = 1 }) => getSubjects(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (
        lastPage.metadata &&
        lastPage.metadata.currentPage === lastPage.metadata.numberOfPages
      ) {
        // Return undefined if no more pages available
        return undefined;
      }

      // Return the next page number, or undefined if metadata is missing
      return lastPage.metadata ? lastPage.metadata.currentPage + 1 : undefined;
    },
  });

  return {
    payload, // Data
    isLoading, // Loading state
    error, // Error state
    isFetchingNextPage, // True when loading additional pages
    hasNextPage, // True if more pages are available
    fetchNextPage, // Function to load the next page
  };
};
