import z, { email } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Your email is required")
    .email("Invalid email address"),
  password: z
    .string()
    .min(1, "Your password is required")
    .regex(/^(?=.*[0-9]).*$/, "Password must contain one digit from 1 to 9")
    .regex(/^(?=.*[a-z]).*$/, "Password must contain one lowercase letter")
    .regex(/^(?=.*[A-Z]).*$/, "Password must contain one uppercase letter")
    .regex(/^(?=.*\W).*$/, "Password must contain one special character")
    .regex(/^(?!.* ).*$/, "Password must not contain any spaces")
    .regex(/^.{8,25}$/, "Password must be 8-25 characters long"),
});

export const registerSchema = z
  .object({
    //userName validation
    username: z
      .string("Username is required")
      .min(3, "Username must be at least 3 characters")
      .max(20, "Username must be less than 20 characters")
      .regex(
        /^[a-zA-Z0-9_]+$/,
        "Username can only contain letters, numbers and underscore"
      ),

    //firstName validation
    firstName: z
      .string("First name is required")
      .min(2, "Name must be at least 2 characters")
      .max(30, "Name must be less than 30 characters")
      .regex(/^[a-zA-Z\u0600-\u06FF\s'-]+$/),
    //regex support name in Arabic and English

    //lastName validation
    lastName: z
      .string("Last name is required")
      .min(2, "Name must be at least 2 characters")
      .max(30, "Name must be less than 30 characters")
      .regex(/^[a-zA-Z\u0600-\u06FF\s'-]+$/),

    //email validation
    email: email({
      error: (error) =>
        error.code === "invalid_type"
          ? "Email is required"
          : "Invalid email address",
    }),
    password: z
      .string("Password is required")
      .regex(/^(?=.*[0-9]).*$/, "Password must contain one digit from 1 to 9")
      .regex(/^(?=.*[a-z]).*$/, "Password must contain one lowercase letter")
      .regex(/^(?=.*[A-Z]).*$/, "Password must contain one uppercase letter")
      .regex(/^(?=.*\W).*$/, "Password must contain one special character")
      .regex(/^(?!.* ).*$/, "Password must not contain any spaces")
      .regex(/^.{8,25}$/, "Password must be 8-25 characters long"),

    rePassword: z.string().min(1, "Please confirm your password"),
    //phone validation
    phone: z
      .string()
      .regex(
        /^(01)[0125]\d{8}$/,
        "Please enter a valid Egyptian mobile number (e.g., 01012345678)"
      ),
  })

  //rePassword validation
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords don't match",
    path: ["rePassword"],
  });

export type LoginValues = z.infer<typeof loginSchema>;
export type RegisterValues = z.infer<typeof registerSchema>;
