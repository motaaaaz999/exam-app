"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import "react-international-phone/style.css";
import "react-phone-number-input/style.css";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { useDelete } from "@/app/(main)/_hooks/use-delete";
import { useProfile } from "@/app/(main)/_hooks/use-profile";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { profileSchema, profileValues } from "@/lib/schemas/profile.schema";
import { Check, Loader2, TriangleAlert } from "lucide-react";
import { signOut } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";

export default function ProfileForm() {
  // ==== MUTATION ====
  const { isPending, mutate } = useProfile();
  const { isPending: isLoading, mutate: deleteAccount } = useDelete();

  //  ==== HOOKS ====
  const { toast } = useToast();

  // ==== FORM INITIALIZATION ====
  const form = useForm<profileValues>({
    defaultValues: {
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    },
    resolver: zodResolver(profileSchema),
  });

  // ==== FUNCTIONS ====
  /**
   * Removes empty or undefined fields from an object
   * This prevents sending unnecessary empty fields to the API
   *
   * @param {T} obj - Object with potentially empty string or undefined values
   * @returns {Partial<T>} Object with only non-empty values
   */
  function removeEmptyFields<T extends Record<string, unknown>>(
    obj: T
  ): Partial<T> {
    return Object.fromEntries(
      Object.entries(obj).filter(
        ([, value]) => value !== "" && value !== undefined
      )
    ) as Partial<T>;
  }

  // ==== EVENT HANDLERS ====
  /**
   * Handles account deletion process
   * Shows confirmation dialog, performs deletion, and redirects to login
   * Displays success/error toast notifications
   */
  const handleDeleteAccount = () => {
    deleteAccount(undefined, {
      // Success callback - show success message and redirect
      onSuccess: () => {
        toast({
          description: (
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-500" />
              <span> Your account has been deleted.</span>
            </div>
          ),
        });
        // Redirect to login after successful account deletion
        signOut({ callbackUrl: "/login" });
      },
      // Error callback - show error message
      onError: (error) => {
        toast({
          variant: "destructive",
          title: "Delete Failed",
          description: error.message || "Something went wrong.",
        });
      },
    });
  };

  /**
   * Form submission handler for profile updates
   * Filters out empty fields and updates user profile
   */
  const onSubmit: SubmitHandler<profileValues> = (values) => {
    // Remove empty fields
    const data = removeEmptyFields(values);

    // Trigger profile update mutation
    mutate(data, {
      // show success toast
      onSuccess: () => {
        toast({
          description: (
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-500" />
              <span>Your profile changes have been saved successfully.</span>
            </div>
          ),
        });
      },

      // show error toast
      onError: () => {
        toast({
          variant: "destructive",
          title: "Update Failed",
          description: "Something went wrong while saving your profile.",
        });
      },
    });
  };
  return (
    <>
      <section className="w-full  h-full flex justify-center  p-5 text-gray-800 font-mono ">
        <Form {...form}>
          <form
            className="w-full max-w-3xl"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            {/* First Name and Last Name - Side by side */}
            {/* FirstName Field */}
            <div className="grid grid-cols-1 md:grid-cols-2  w-full gap-3">
              <FormField
                name="firstName"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    {/* FirstName Label */}
                    <FormLabel className="font-medium text-base">
                      First name
                    </FormLabel>
                    <FormControl>
                      {/* FirstName Input */}
                      <Input
                        placeholder="Ahmed"
                        className="w-full h-10 "
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
                    {/* LastName Label */}
                    <FormLabel className="font-medium text-base">
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
                <FormItem className="mt-4">
                  {/* Username Label */}
                  <FormLabel className="font-medium text-base">
                    Username
                  </FormLabel>
                  <FormControl>
                    {/* Username Input */}
                    <Input
                      placeholder="user123"
                      className="w-full h-10"
                      {...field}
                    />
                  </FormControl>
                  {/* feedback message */}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email Field*/}
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem className="mt-4">
                  {/* Email Label */}
                  <FormLabel className="text-base font-medium">Email</FormLabel>
                  <FormControl>
                    {/* Email Input */}
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
                <FormItem className="mt-4">
                  {/* Phone Label */}
                  <FormLabel className="font-medium text-base">Phone</FormLabel>
                  <FormControl>
                    <div className="flex">
                      <div className="flex items-center px-3 py-2 border border-r-0 rounded-l-md bg-gray-50 text-xs text-gray-600 h-10">
                        EG(+20)
                      </div>
                      {/* Phone Input */}
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

            {/* Delete Account - Save Changes */}
            <div className="grid mt-8 font-mono font-medium  grid-cols-1 sm:grid-cols-2 w-full gap-4">
              {/* Account Deletion Dialog */}
              <AlertDialog>
                {/* Delete Account Trigger Button */}
                <AlertDialogTrigger asChild>
                  <Button
                    type="button"
                    className="w-full  bg-red-50 text-red-600 hover:bg-red-50"
                  >
                    Delete My Account
                  </Button>
                </AlertDialogTrigger>

                {/* Confirmation Dialog Content */}
                <AlertDialogContent className="p-0  flex font-mono font-medium flex-col justify-center items-center w-full max-w-md sm:max-w-lg">
                  {/* Dialog Header */}
                  <AlertDialogHeader className=" px-4  h-[308px] flex justify-center items-center ">
                    <div className="flex justify-center items-center">
                      {/* Outer Circle */}
                      <div className="w-[110px] h-[110px] bg-red-50 rounded-full flex justify-center items-center">
                        {/* Inner Circle */}
                        <div className="w-20 h-20 bg-red-100 rounded-full flex justify-center items-center">
                          {/* Warning Icon */}
                          <TriangleAlert className="w-12 h-12 text-red-600" />
                        </div>
                      </div>
                    </div>
                    {/* Warning Title */}
                    <AlertDialogTitle className="text-red-600 pt-5 text-lg">
                      Are you sure you want to delete your account?
                    </AlertDialogTitle>
                    {/* Warning Description */}
                    <AlertDialogDescription className="text-gray-500 text-sm">
                      This action is permanent and cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>

                  {/* Footer */}
                  <AlertDialogFooter className="w-full   border-t border-gray-200  flex-1 p-6 bg-gray-50">
                    <div className=" gap-3   w-full  flex justify-center items-center">
                      {/* Cancel Button */}
                      <AlertDialogCancel className="bg-gray-200  w-full  hover:bg-gray-200 ">
                        <Button className="bg-gray-200 text-gray-800 hover:bg-gray-200 w-full">
                          Cancel
                        </Button>
                      </AlertDialogCancel>

                      {/* Confirm Delete Button */}
                      <AlertDialogAction
                        className="bg-red-600 w-full hover:bg-red-700 "
                        onClick={() => {
                          handleDeleteAccount();
                        }}
                      >
                        <Button
                          disabled={isLoading}
                          className="bg-red-600 hover:bg-red-600 w-full"
                        >
                          {isLoading ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              deleting...
                            </>
                          ) : (
                            " Yes, delete"
                          )}
                        </Button>
                      </AlertDialogAction>
                    </div>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              {/* Save Changes Button */}
              <Button
                type="submit"
                disabled={isPending}
                variant={"blue"}
                className="w-full "
              >
                {isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </section>
    </>
  );
}
