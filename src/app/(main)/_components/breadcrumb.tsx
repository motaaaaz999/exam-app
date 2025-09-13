"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function AppBreadcrumb() {
  const pathname = usePathname();

  // Regex to check if there is id
  const isId = (segment: string) =>
    /^[0-9a-fA-F]{24}$/.test(segment) || // Mongo ObjectId
    /^[0-9a-fA-F-]{36}$/.test(segment); // UUID

  const generateBreadcrumbs = () => {
    const segments = pathname.split("/").filter(Boolean);

    // remove id from segment
    const cleanedSegments = isId(segments[segments.length - 1])
      ? segments.slice(0, -1)
      : segments;

    let path = "";
    return cleanedSegments.map((segment) => {
      path += `/${segment}`;
      const name = segment.charAt(0).toUpperCase() + segment.slice(1);
      return {
        name,
        href: path,
      };
    });
  };

  const breadcrumbs = generateBreadcrumbs();

  return (
    <div className="border-b bg-white px-6 py-3">
      <Breadcrumb>
        <BreadcrumbList>
          {/* Home */}
          <BreadcrumbItem className="  font-medium">
            <Link href="/diplomas">Home </Link>
          </BreadcrumbItem>

          {breadcrumbs.length > 0 && <BreadcrumbSeparator />}

          {breadcrumbs.map((b, i) => (
            <React.Fragment key={b.href}>
              <BreadcrumbItem>
                {/* Label Name */}
                <BreadcrumbPage className="text-blue-600  font-medium ">
                  {b.name}
                </BreadcrumbPage>
              </BreadcrumbItem>
              {i < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
