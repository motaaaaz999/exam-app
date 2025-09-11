"use client";
import { forgotPassword } from "@/lib/api/forgotPassword.api";
import { useMutation } from "@tanstack/react-query";

export const useEmail = () => {
  const mutation = useMutation({
    mutationFn: forgotPassword,
    onSuccess: (data) => {
      console.log("check ur email:", data);
    },

    onError: (error) => {
      console.log("error", error);
    },
  });

  return mutation;
};
