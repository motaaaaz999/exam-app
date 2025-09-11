"use client";
import { verify } from "@/lib/api/verify.api";
import { useMutation } from "@tanstack/react-query";

export const useVerify = () => {
  const mutation = useMutation({
    mutationFn: verify,
    onSuccess: (payload) => {
      console.log(payload);
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  return mutation;
};
