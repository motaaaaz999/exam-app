"use client";
import { ChevronDown, GraduationCap } from "lucide-react";
import Image from "next/image";
import { useSubjects } from "../../_hooks/use-subject";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ExamQuestionSkeleton } from "../../_components/skeleton";

// ==== DYNAMIC IMPORTS ====
// Lazy loading scroll
/**
 * Lazy loading for infinite scroll component
 * - Reduces initial bundle size by loading only when needed
 * - Disabled SSR since this component requires client-side functionality
 * - Improves page load performance for users who don't scroll
 */
const InfiniteScroll = dynamic(
  () => import("react-infinite-scroll-component"),
  { ssr: false }
);

export default function Subjects() {
  // ==== MUTATION =====
  const { payload, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useSubjects();

  // ==== VARIABLE =====
  const subjects = payload?.pages?.flatMap((p: any) => p.subjects) ?? [];

  // Loading
  if (isLoading) {
    return (
      <>
        <div className="h-screen flex justify-center items-start">
          <ExamQuestionSkeleton />
        </div>
      </>
    );
  }

  return (
    <>
      <section className="flex justify-center items-center flex-col">
        {/* Header */}
        <header className="bg-blue-600 flex flex-row  items-center  w-full h-[77px]   text-[#FFFFFF] p-4  text-2xl sm:text-3xl font-inter font-semibold ">
          {/* Icon */}
          <GraduationCap className=" h-8 w-8 sm:h-11  sm:w-11" />

          {/*Page Title */}
          <span className=" flex justify-center  px-3">Diplomas</span>
        </header>

        {/* InfiniteScroll component handles pagination automatically */}
        <InfiniteScroll
          dataLength={subjects.length}
          scrollableTarget="main-scroll"
          scrollThreshold={0.8}
          next={fetchNextPage}
          hasMore={!!hasNextPage}
          // Loading Indicator
          /*
           * Dynamic loader based on fetch state
           * - Shows "Loading more..." when actively fetching
           * - Shows "Scroll to view More" when ready for next page
           * - Includes chevron down icon for visual cue
           */
          loader={
            isFetchingNextPage ? (
              <>
                {" "}
                <h4 className="text-center flex flex-col text-sm justify-center items-center py-4 font-mono">
                  Loading more diplomas...
                  <ChevronDown />
                </h4>
              </>
            ) : (
              <>
                {" "}
                <h4 className="text-center flex flex-col text-sm justify-center items-center  py-4 font-mono">
                  Scroll to view More
                  <ChevronDown />
                </h4>
              </>
            )
          }
          // ==== END MESSAGE ====
          /* Message shown when all data has been loaded */
          endMessage={
            <p className="text-center py-4 text-sm text-gray-500">
              No more diplomas to show
            </p>
          }
        >
          {/* ==== SUBJECT CARD ====*/}
          <div className="grid w-full grid-cols-1 sm:grid-cols-2   md:grid-cols-3  gap-[10px] mt-3">
            {payload?.pages
              .flatMap((pages) => pages.subjects)
              .map((subject) => (
                <Link key={subject._id} href={`/exams/${subject._id}`}>
                  <div className="card w-full h-64 sm:h-80  md:h-[448px] relative">
                    {/* Subject Image */}
                    <Image
                      src={subject.icon}
                      quality={100}
                      alt={`${subject.name} diploma course thumbnail`}
                      width={200}
                      height={200}
                      loading="lazy"
                      className="w-full h-full border-none rounded-none object-cover"
                    />

                    {/* Subject Name */}
                    <div className="absolute mx-2 my-2  m-auto bottom-0 left-0 right-0 bg-[#155DFC80] bg-opacity-50 backdrop-blur-sm">
                      <p className="text-white font-mono py-4 px-4 font-semibold text-lg sm:text-xl">
                        {subject.name}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </InfiniteScroll>
      </section>
    </>
  );
}
