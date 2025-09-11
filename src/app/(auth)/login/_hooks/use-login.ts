import { LoginValues } from "@/lib/schemas/auth.schema";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";

//mutation login function
export const useLogin = () => {
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (values: LoginValues) => {
      const response = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (response?.error) {
        throw new Error(response.error);
      }

      if (response?.ok) {
        // Redirect to page after successful login
        location.href =
          new URLSearchParams(location.search).get("callbackUrl") ||
          "/diplomas";
        return response;
      }
    },
  });
  return { isPending, error, login: mutate };
};
