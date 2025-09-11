"use client";

import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";

import "react-phone-number-input/style.css";

import "react-international-phone/style.css";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import {
  changePasswordSchema,
  changePasswordValues,
} from "@/lib/schemas/changePassword.schema";
import { Check, Loader2 } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";

import ErrorMessage from "@/app/(main)/_components/error-message";
import { usePassword } from "@/app/(main)/_hooks/use-password";
import { Button } from "@/components/ui/button";

export default function ChangePasswordForm() {
  // ==== MUTATION ====
  const { isPending, mutate, error } = usePassword();

  // ==== HOOKS ====
  const { toast } = useToast();

  // ==== FORM INITIALIZATION ====
  const form = useForm<changePasswordValues>({
    defaultValues: {
      oldPassword: "",
      password: "",
      rePassword: "",
    },
    resolver: zodResolver(changePasswordSchema),
  });

  // ==== FUNCTIONS ====
  /**
   * Form submission handler
   * Processes the validated form data and initiates password change
   * Shows success toast on completion
   */
  const onSubmit: SubmitHandler<changePasswordValues> = (values) => {
    // Change Password mutation
    mutate(values, {
      // Success callback - show toast notification
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
      <section className=" h-full w-full   p-5 text-gray-800 font-mono ">
        <Form {...form}>
          <form className="w-full  " onSubmit={form.handleSubmit(onSubmit)}>
            {/* Current password  */}
            <FormField
              name="oldPassword"
              control={form.control}
              render={({ field }) => (
                <FormItem className="mt-4">
                  {/* Current password label */}
                  <FormLabel className="font-medium  text-base">
                    Current Password
                  </FormLabel>
                  <div className=" w-full">
                    {/* Current password input */}
                    <FormControl>
                      <Input
                        autoComplete="current-password"
                        type="password"
                        placeholder="********"
                        className="w-full h-10"
                        {...field}
                      />
                    </FormControl>
                  </div>
                  {/* Feedback message */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="bg-gray-200 mt-5 h-[1px] w-full"></div>

            {/* New Password */}
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem className="mt-4">
                  {/* New password label */}
                  <FormLabel className="font-medium   text-base">
                    New Password
                  </FormLabel>
                  <div className=" w-full">
                    <FormControl>
                      {/* New password Input */}
                      <Input
                        autoComplete="new-password"
                        type="password"
                        placeholder="********"
                        className="w-full h-10"
                        {...field}
                      />
                    </FormControl>
                  </div>
                  {/* Feedback message */}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Re Password */}
            <FormField
              name="rePassword"
              control={form.control}
              render={({ field }) => (
                <FormItem className="mt-4">
                  {/* Re Password label */}
                  <FormLabel className="font-medium   text-base">
                    Confirm New Password
                  </FormLabel>
                  <div className=" w-full">
                    <FormControl>
                      {/* Re Password input */}
                      <Input
                        autoComplete="new-password"
                        type="password"
                        placeholder="********"
                        className="w-full h-10"
                        {...field}
                      />
                    </FormControl>
                  </div>
                  {/* Feedback message */}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Error Message */}
            <div className=" mt-8">
              {error?.message && (
                <ErrorMessage
                  message={error.message || "Something went wrong"}
                />
              )}
            </div>

            {/* Update Button */}
            <Button
              disabled={isPending}
              type="submit"
              className="mt-8 w-full font-medium"
            >
              {isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  updating...
                </>
              ) : (
                "Update Password"
              )}
            </Button>
          </form>
        </Form>
      </section>
    </>
  );
}
