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
import {
  createPasswordSchema,
  createPasswordValues,
} from "@/lib/schemas/forgotPassword.schema";
import { UserResetData } from "@/lib/types/resetPassword";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Loader2, MoveLeft } from "lucide-react";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useReset } from "../_hooks/use-reset";
import { useToast } from "@/hooks/use-toast";

// PROPS
type Props = {
  email: string;
  setStep: (step: "verify" | "email") => void;
};

export default function CreatePasswordStep({ setStep, email }: Props) {
  // ==== MUTATION ====
  const { isPending, error, isError, mutate: reset } = useReset();

  // ==== HOOKS ====
  const { toast } = useToast();

  // ==== FORM INITIALIZATION ====
  const form = useForm<createPasswordValues>({
    defaultValues: {
      email: email,
      newPassword: "",
      rePassword: "",
    },
    resolver: zodResolver(createPasswordSchema),
  });

  // ==== FUNCTIONS ====
  //Form handle submission
  /**
   * Form submission handler
   *
   * Transforms form data into API payload format and handles success/error states
   *
   * @param values - Validated form data from react-hook-form
   */
  const onSubmit: SubmitHandler<createPasswordValues> = (values) => {
    // Transform form data to match API expectations
    const payload: UserResetData = {
      email: values.email,
      newPassword: values.newPassword,
    };

    // Execute password reset
    reset(payload, {
      // Show success toast
      onSuccess: () => {
        toast({
          description: (
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-500" />
              <span> Your password has been updated.</span>
            </div>
          ),
        });
      },
    });
  };

  return (
    <>
      {/* MAIN CONTAINER */}
      <div className="h-full   flex justify-center items-center">
        <div className="w-full max-w-md">
          <Form {...form}>
            <form
              className="font-mono font-medium"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              {/* Back navigation button */}
              <Button
                onClick={() => setStep("verify")}
                className="w-[40px] h-[40px] border-[1.5px] border-gray-200 bg-white hover:bg-white mb-10"
              >
                <MoveLeft className="text-black" />
              </Button>

              {/* Header */}
              <header>
                {/* Title */}
                <h1 className="text-gray-800 font-inter font-bold text-3xl">
                  Create a New Password
                </h1>

                {/* Description */}
                <p className="text-gray-500 font-mono mb-10 mt-2">
                  Create a new strong password for your account.
                </p>
              </header>

              {/* Password Field */}
              <FormField
                name="newPassword"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="mb-4">
                    {/* Password label */}
                    <FormLabel className="text-base  text-gray-800">
                      New Password
                    </FormLabel>
                    <FormControl>
                      {/* Password input */}
                      <Input
                        type="password"
                        size={"custom"}
                        variant={"default"}
                        placeholder="********"
                        className="w-full"
                        {...field}
                      />
                    </FormControl>

                    {/* Feedback message */}
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Confirm Password Field */}
              <FormField
                name="rePassword"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="mb-10">
                    {/* Confirm Password label */}
                    <FormLabel className="text-base text-gray-800">
                      Confirm Password
                    </FormLabel>
                    <FormControl>
                      {/* Confirm Password Input */}
                      <Input
                        type="password"
                        size={"custom"}
                        variant={"default"}
                        placeholder="********"
                        className="w-full"
                        {...field}
                      />
                    </FormControl>

                    {/* Feedback message */}
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Update Password button */}
              <Button disabled={isPending} variant={"blue"} className="w-full">
                {isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                  </>
                ) : (
                  " Update Password"
                )}
              </Button>

              {/* Error Message */}
              {isError && (
                <>
                  <p className="text-red-500 text-center mt-2">
                    {" "}
                    {error.message}
                  </p>
                </>
              )}
            </form>
          </Form>
        </div>
      </div>
    </>
  );
}
