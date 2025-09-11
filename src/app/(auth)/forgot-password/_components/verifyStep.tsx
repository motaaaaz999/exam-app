"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useToast } from "@/hooks/use-toast";
import { otpSchema, OTPvalue } from "@/lib/schemas/forgotPassword.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Loader2, MoveLeft } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEmail } from "../_hooks/use-email";
import { useVerify } from "../_hooks/use-verify";

// PROPS
type Props = {
  setStep: (step: "createPassword" | "email") => void;
  email: string;
};

export default function VerifyStep({ setStep, email }: Props) {
  // ==== STATE ====
  const [timeLeft, setTimeLeft] = useState(60);

  // ==== MUTATION ====
  const { error, isPending, isSuccess, mutate, isError } = useVerify();
  const { mutate: mutateEmail } = useEmail();
  const { toast } = useToast();

  //  ==== FORM INITIALIZATION ====
  const form = useForm<OTPvalue>({
    defaultValues: {
      resetCode: "",
    },
    resolver: zodResolver(otpSchema),
  });

  // ==== VARIABLE =====
  const ResendPayload = {
    email: email,
  };

  // ==== FUNCTIONS ====
  // Form submission handler
  /**
   * Form submission handler for OTP verification
   *
   * Submits the entered OTP code for verification and handles success/error states.
   * On successful verification, automatically advances to password creation step.
   *
   * @param value - Validated OTP form data containing resetCode
   */
  const onSubmit: SubmitHandler<OTPvalue> = (value) => {
    mutate(value, {
      //Show success toast
      onSuccess: () => {
        // Automatically progress to next step
        setStep("createPassword");
      },
    });
  };

  /**
   * Handler for resending OTP code
   *
   * Triggers email resend and shows success feedback.
   *
   */
  const handleResendOTP = () => {
    mutateEmail(ResendPayload, {
      onSuccess: () => {
        toast({
          description: (
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-500" />
              <span> OTP sent to your email.</span>
            </div>
          ),
        });
      },
    });
  };

  // ==== EFFECT ====
  //Countdown timer effect for OTP resend functionality
  useEffect(() => {
    // Stop timer when it reaches 0
    if (timeLeft <= 0) {
      return;
    }

    // Create interval to decrement timer every second
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    // Cleanup interval on unmount or dependency change
    return () => clearInterval(timer);
  }, [timeLeft]);

  return (
    <>
      {/* Main Container */}
      <div className="  h-full   flex justify-center items-center">
        <div className="  w-full max-w-md">
          <Form {...form}>
            <form
              className="  font-mono font-medium"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              {/* Header */}
              <header className=" mb-10">
                {/* Back Navigation */}
                <Button
                  onClick={() => setStep("email")}
                  className="w-[40px] h-[40px] border-[1.5px] border-gray-200 bg-white hover:bg-white mb-10"
                >
                  <MoveLeft className="text-black" />
                </Button>

                {/* Title */}
                <h1 className="font-inter  font-bold text-gray-800 text-3xl mb-2">
                  Verify OTP
                </h1>

                {/* Description */}
                <p className="text-gray-500">
                  Please enter the 6-digits code we have sent to:
                </p>

                {/* Edit on email */}
                <p className="text-gray-800">
                  {email}
                  <span
                    onClick={() => setStep("email")}
                    className="text-blue-600 mx-3 underline cursor-pointer"
                  >
                    Edit
                  </span>
                </p>
              </header>

              {/* Reset Code Field */}
              <FormField
                name="resetCode"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="mb-6 flex-col   flex justify-center items-center">
                    <FormControl>
                      {/* Input */}
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup className="gap-2 ">
                          <InputOTPSlot index={0} className="border-[1.5px]" />
                          <InputOTPSlot className="border-[1.5px]" index={1} />
                          <InputOTPSlot className="border-[1.5px]" index={2} />
                          <InputOTPSlot className="border-[1.5px]" index={3} />
                          <InputOTPSlot className="border-[1.5px]" index={4} />
                          <InputOTPSlot className="border-[1.5px]" index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    {/* Feedback message */}
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Countdown timer */}
              <div className=" text-center text-gray-500 mb-10">
                {timeLeft > 0 ? (
                  <>
                    <p>You can request another code in: {timeLeft}s</p>
                  </>
                ) : (
                  <p>
                    Didn't receive the code?{" "}
                    <span
                      onClick={() => handleResendOTP()}
                      className="text-blue-600 ml-2 cursor-pointer"
                    >
                      Resend
                    </span>
                  </p>
                )}
              </div>

              {/* Verify Button */}
              <Button
                disabled={isPending}
                type="submit"
                variant={"blue"}
                className="w-full  "
              >
                {isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                  </>
                ) : (
                  " Verify Code"
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

              {/* Register Navigation */}
              <p className="text-gray-500 text-center mt-9">
                Don't have an account?{" "}
                <Link href={"/register"}>
                  <span className="text-blue-600">Create yours</span>
                </Link>
              </p>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
}
