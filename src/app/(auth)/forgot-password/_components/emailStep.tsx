"use client";
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
import { emailSchema, EmailValue } from "@/lib/schemas/forgotPassword.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, MoveRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEmail } from "../_hooks/use-email";

//PROPS
type Props = {
  setEmail: (email: string) => void;
  setStep: (step: "verify" | "createPassword") => void;
};

export default function EmailStep({ setStep, setEmail }: Props) {
  // ==== MUTATION ====
  const { mutate, isPending, data, error } = useEmail();

  // ==== FORM INITIALIZATION ====
  const form = useForm<EmailValue>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(emailSchema),
  });

  // ==== FUNCTIONS ====
  //Form submission handler
  const onSubmit: SubmitHandler<EmailValue> = (value) => {
    mutate(value, {
      onSuccess: () => {
        //Store email to use it in create password
        setEmail(value.email);
        //Move to verify component after submit email
        setStep("verify");
      },
      onError: () => {
        console.log(data?.message);
      },
    });
  };
  return (
    <>
      {/* MAIN CONTAINER */}
      <div className="  h-full   flex justify-center items-center">
        <div className=" w-full max-w-md">
          <Form {...form}>
            <form
              className=" font-mono font-medium"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              {/* Header */}
              <header>
                {/* Title */}
                <h1 className="font-inter font-bold text-3xl mb-2">
                  Forgot Password
                </h1>

                {/* Description */}
                <p className="text-gray-500 text-base mb-10">
                  Don't worry, we will help you recover your account.
                </p>
              </header>

              {/* Email Field */}
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="mb-10">
                    {/* Email Label */}
                    <FormLabel className="text-base text-gray-800">
                      Email
                    </FormLabel>
                    <FormControl>
                      {/* Email Input */}
                      <Input
                        size={"custom"}
                        variant={"default"}
                        placeholder="user@example.com"
                        className="w-full"
                        {...field}
                      />
                    </FormControl>
                    {/* Feedback message */}
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Continue Button */}
              <Button
                disabled={isPending}
                className="w-full bg-blue-600 hover:bg-blue-600"
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                  </>
                ) : (
                  <>
                    {" "}
                    Continue <MoveRight />
                  </>
                )}
              </Button>

              {/* Error Message */}
              {error?.message && (
                <p className="text-red-500 text-center mt-3">
                  {" "}
                  {error.message}
                </p>
              )}

              {/* Register Navigation */}
              <div className="text-gray-500 text-center mt-9">
                Don't have an account?{" "}
                <Link href="/register">
                  <span className="text-blue-600">Create yours</span>
                </Link>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
}
