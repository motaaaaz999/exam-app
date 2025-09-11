import React from "react";
import Exams from "../_components/exams";

export const metadata = {
  title: "Exams",
};

interface PageProps {
  params: {
    id: string;
  };
}

export default function Page({ params }: PageProps) {
  return <Exams subjectId={params.id} />;
}
