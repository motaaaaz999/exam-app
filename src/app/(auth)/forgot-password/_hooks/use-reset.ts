"use client";
import { resetPassword } from "@/lib/api/reset.api";
import { useMutation } from "@tanstack/react-query";

export const useReset = () => {
  const mutation = useMutation({
    mutationFn: resetPassword,
    onSuccess: (data) => {
      console.log("password chnaged successfully: ", data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return mutation;
};
