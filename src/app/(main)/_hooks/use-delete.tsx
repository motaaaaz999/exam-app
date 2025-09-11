"use client";
import { deleteAccount } from "@/lib/api/deleteAccount.api";
import { useMutation } from "@tanstack/react-query";

export const useDelete = () => {
  const mutation = useMutation({
    mutationFn: deleteAccount,
    onSuccess: (data) => {
      console.log("account deleted successfully: ", data);
    },
    onError: (error) => {
      console.log("error deleted account", error);
    },
  });

  return mutation;
};
