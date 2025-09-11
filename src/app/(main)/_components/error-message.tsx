import { CircleX } from "lucide-react";
import React from "react";

type Props = {
  message: string;
};
export default function ErrorMessage({ message }: Props) {
  return (
    <>
      <div className=" w-full p-2   border border-red-600 bg-red-50 font-mono text-center text-red-600 relative">
        {/* Icons */}
        <CircleX
          width={18}
          height={18}
          className="bg-white rounded-full  absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />

        {/* Message which received form Backend */}
        <span>{message || `Something went wrong`} </span>
      </div>
    </>
  );
}
