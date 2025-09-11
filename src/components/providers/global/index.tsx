"use client";

import React from "react";
import ReactQueryProvider from "./_components/react-query.provider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <ReactQueryProvider>{children}</ReactQueryProvider>;
}
