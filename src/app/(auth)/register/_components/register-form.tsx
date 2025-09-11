"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SubmitHandler, useForm } from "react-hook-form";
import { registerSchema, RegisterValues } from "@/lib/schemas/auth.schema";
import { useRegister } from "../_hooks/use-register";
import { Check, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function RegisterForm() {
  // ==== MUTATION ====
  const { register, isError, isPending, error } = useRegister();

  // ==== HOOKS ====
  const { toast } = useToast();

  //  ==== FORM INITIALIZATION ====
  const form = useForm<RegisterValues>({
    defaultValues: {
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    resolver: zodResolver(registerSchema),
  });
  //Form state
  const { isSubmitted, isValid } = form.formState;

  // ==== FUNCTIONS ====
  // Form submission handler
  /**
   * Handles form submission when validation passes
   *
   * @param {RegisterValues} value - Validated form data containing all user input
   *
   * Process:
   * 1. Calls register mutation with form data
   * 2. On success: Shows success toast with checkmark icon
   * 3. On error: Error handling is managed by the useRegister hook
   */
  const onSubmit: SubmitHandler<RegisterValues> = (value) => {
    register(value, {
      onSuccess: () => {
        //Display successful toast
        toast({
          description: (
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-500" />
              <span> Your account has been created.</span>
            </div>
          ),
        });
      },
    });
  };
  return (
    <>
      {/* Main Container */}
      <div className=" h-full  overflow-hidden  flex justify-center items-center">
        <div className=" p-6 rounded-lg ">
          {/* Form Title */}
          <h1 className="text-3xl  font-bold font-inter text-gray-800 mb-9 ">
            Create Account
          </h1>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 font-mono "
            >
              {/* First Name and Last Name - Side by side */}
              {/* First Name Field */}
              <div className="grid grid-cols-2 gap-3">
                <FormField
                  name="firstName"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      {/* FirstName label */}
                      <FormLabel className="text-base text-gray-800 font-medium">
                        First name
                      </FormLabel>
                      <FormControl>
                        {/* FirstName input */}
                        <Input
                          placeholder="Ahmed"
                          className="w-full h-10"
                          {...field}
                        />
                      </FormControl>
                      {/* Feedback message */}
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* LastName Field */}
                <FormField
                  name="lastName"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      {/* LastName label */}
                      <FormLabel className="text-base text-gray-800 font-medium">
                        Last name
                      </FormLabel>
                      <FormControl>
                        {/* LastName Input */}
                        <Input
                          placeholder="Abdullah"
                          className="w-full h-10"
                          {...field}
                        />
                      </FormControl>
                      {/* Feedback message */}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Username Field */}
              <FormField
                name="username"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    {/* Username label */}
                    <FormLabel className="text-base text-gray-800 font-medium">
                      Username
                    </FormLabel>
                    <FormControl>
                      {/* Username input */}
                      <Input
                        placeholder="user123"
                        className="w-full h-10"
                        {...field}
                      />
                    </FormControl>
                    {/* Feedback message */}
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email Field */}
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    {/* Email label */}
                    <FormLabel className="text-base text-gray-800 font-medium">
                      Email
                    </FormLabel>
                    <FormControl>
                      {/* Email input */}
                      <Input
                        type="email"
                        placeholder="user@example.com"
                        className="w-full h-10"
                        {...field}
                      />
                    </FormControl>
                    {/* Feedback message */}
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Phone Field */}
              <FormField
                name="phone"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    {/* Phone Label */}
                    <FormLabel className="text-base text-gray-800 font-medium">
                      Phone
                    </FormLabel>
                    <FormControl>
                      <div className="flex">
                        <div className="flex items-center px-3 py-2 border border-r-0 rounded-l-md bg-gray-50 text-xs text-gray-600 h-10">
                          EG(+20)
                        </div>
                        {/* Phone input */}
                        <Input
                          placeholder="1012345678"
                          className="w-full rounded-l-none h-10"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    {/* Feedback message */}
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password Field */}
              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    {/* Password label */}
                    <FormLabel className="text-base text-gray-800 font-medium">
                      Password
                    </FormLabel>
                    <FormControl>
                      {/* Password input */}
                      <Input
                        type="password"
                        placeholder="********"
                        className="w-full h-10"
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
                  <FormItem>
                    {/* Confirm Password label */}
                    <FormLabel className="text-base text-gray-800 font-medium">
                      Confirm Password
                    </FormLabel>
                    <FormControl>
                      {/* Confirm Password input */}
                      <Input
                        type="password"
                        placeholder="********"
                        className="w-full h-10"
                        {...field}
                      />
                    </FormControl>
                    {/* Feedback message */}
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full  bg-blue-600 hover:bg-blue-700 text-white mt-9 text-base font-medium "
                disabled={isPending || (!isValid && isSubmitted)}
              >
                {isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>

              {/* Error Message  */}
              {isError && (
                <p className="text-red-500 text-center m-auto">
                  {error?.message}
                </p>
              )}

              {/* Login Link */}
              <div className="text-center text-gray-500 font-medium text-sm mt-4">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Login
                </Link>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
}
