import React from "react";
import Questions from "../_components/questions";

export const metadata = {
  title: "Questions",
};

interface PageProps {
  params: {
    id: string;
  };
}

export default function page({ params }: PageProps) {
  return <Questions examId={params.id} />;
}
