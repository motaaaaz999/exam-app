"use client";
import { editProfile } from "@/lib/api/edit-profile.api";
import { useMutation } from "@tanstack/react-query";

export const useProfile = () => {
  const mutation = useMutation({
    mutationFn: editProfile,
    onSuccess: (data) => {
      console.log("profile data updated: ", data);
    },
    onError: (error) => {
      console.log("failed to fetch profile data", error);
    },
  });

  return { ...mutation, profileData: mutation.data };
};
