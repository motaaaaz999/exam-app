import { registerUser } from "@/lib/api/auth.api";
import { useMutation } from "@tanstack/react-query";

export const useRegister = () => {
  const { isError, isSuccess, data, error, isPending, mutate } = useMutation({
    mutationFn: registerUser,

    onSuccess: (data) => {
      console.log("Registration successful:", data);
    },
    onError: (error) => {
      console.error("Registration failed:", error);
    },
  });

  return { isError, isSuccess, data, error, isPending, register: mutate };
};
