import z from "zod";

export const emailSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
});

export const otpSchema = z.object({
  resetCode: z
    .string()
    .min(6, "OTP must be 6 digits")
    .max(6, "OTP must be 6 digits")
    .regex(/^\d+$/, "OTP must contain only numbers"),
});

export const createPasswordSchema = z
  .object({
    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email address"),
    newPassword: z
      .string()
      .min(1, "Password is required")
      .regex(/^(?=.*[0-9]).*$/, "Password must contain one digit from 1 to 9")
      .regex(/^(?=.*[a-z]).*$/, "Password must contain one lowercase letter")
      .regex(/^(?=.*[A-Z]).*$/, "Password must contain one uppercase letter")
      .regex(/^(?=.*\W).*$/, "Password must contain one special character")
      .regex(/^(?!.* ).*$/, "Password must not contain any spaces")
      .regex(/^.{8,25}$/, "Password must be 8-25 characters long"),

    rePassword: z.string().min(1, "Please confirm your password"),
  }) //rePassword validation
  .refine((data) => data.newPassword === data.rePassword, {
    message: "Passwords don't match",
    path: ["rePassword"],
  });

export type EmailValue = z.infer<typeof emailSchema>;
export type OTPvalue = z.infer<typeof otpSchema>;
export type createPasswordValues = z.infer<typeof createPasswordSchema>;
