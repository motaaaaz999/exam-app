"use client";

import { changePassword } from "@/lib/api/changePassword.api";
import { useMutation } from "@tanstack/react-query";

export const usePassword = () => {
  const mutation = useMutation({
    mutationFn: changePassword,
    onSuccess: (data) => {
      console.log("password is changed successfully: ", data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return { ...mutation };
};
