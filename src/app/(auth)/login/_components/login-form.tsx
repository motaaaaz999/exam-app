"use client";
import ErrorMessage from "@/app/(main)/_components/error-message";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginSchema, LoginValues } from "@/lib/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLogin } from "../_hooks/use-login";

export default function LoginForm() {
  // ==== MUTATION ====
  const { isPending, error, login } = useLogin();

  // ==== FORM INITIALIZATION ====
  const form = useForm<LoginValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });
  //Form states
  const { isSubmitted, isValid, errors } = form.formState;

  // ==== FUNCTIONS ====
  //Form submission handler
  const onSubmit: SubmitHandler<LoginValues> = (value) => {
    login(value);
  };

  return (
    // Main Container
    <div className="h-full   flex items-center justify-center p-8">
      <div className="w-full  max-w-md">
        {/* Form Title */}
        <h2 className="text-3xl font-bold  flex justify-start mb-10">Login</h2>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className=" font-mono font-medium"
          >
            {/* Email Field */}
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem className="mb-4">
                  {/*  Email label */}
                  <FormLabel className="text-base text-gray-800 font-medium">
                    Email
                  </FormLabel>
                  <FormControl>
                    {/*  Email input */}
                    <Input
                      size={"custom"}
                      variant={"default"}
                      placeholder="user@example.com"
                      className={`w-full ${
                        error || errors.email ? "border-red-600" : ""
                      }`}
                      {...field}
                    />
                  </FormControl>
                  {/* Feedback message */}
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />

            {/* Password Field */}
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem className="space-y-2 ">
                  <div className="flex items-center justify-between">
                    {/* Password label */}
                    <FormLabel className="text-base text-gray-800 font-medium">
                      Password
                    </FormLabel>
                  </div>
                  <FormControl>
                    {/* Password input */}
                    <Input
                      type="password"
                      size={"custom"}
                      variant={"default"}
                      placeholder="********"
                      className={` w-full  ${
                        error || errors.password ? "   border-red-600" : ""
                      }`}
                      {...field}
                    />
                  </FormControl>
                  {/* Feedback message */}
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />

            {/* Forgot Password link */}
            <div className=" mt-2 mb-10  flex justify-end">
              <Link
                href="/forgot-password"
                className="font-medium font-mono text-blue-600"
              >
                Forgot your password?
              </Link>
            </div>

            {/* Error Message */}
            <div className="mb-9">
              {error?.message && <ErrorMessage message={error.message} />}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isPending || (!isValid && isSubmitted)}
              variant={"blue"}
              size={"custom"}
              className="w-full mb-9 "
            >
              {isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                </>
              ) : (
                "Login"
              )}
            </Button>

            {/* Register Link */}
            <p className="text-center text-base font-medium text-gray-500">
              Don't have an account?{" "}
              <Link href="/register" className="text-blue-600  font-medium">
                Create yours
              </Link>
            </p>
          </form>
        </Form>
      </div>
    </div>
  );
}
