import z from "zod";

export const profileSchema = z.object({
  username: z
    .string()
    .trim()
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers and underscore"
    )
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be less than 20 characters")
    .or(z.literal("")) // يسمح تبعت input فاضي
    .optional(),

  firstName: z
    .string()
    .trim()
    .regex(/^[a-zA-Z\u0600-\u06FF\s'-]+$/)
    .min(2, "Name must be at least 2 characters")
    .max(30, "Name must be less than 30 characters")
    .or(z.literal("")) // نفس الحكاية
    .optional(),

  lastName: z
    .string()
    .trim()
    .regex(/^[a-zA-Z\u0600-\u06FF\s'.-]+$/)
    .min(2, "Name must be at least 2 characters")
    .max(30, "Name must be less than 30 characters")
    .or(z.literal(""))
    .optional(),

  email: z
    .email("Invalid email address")
    .trim()
    .or(z.literal("")) // فاضي ماشي
    .optional(),

  phone: z
    .string()
    .trim()
    .regex(
      /^(01)[0125]\d{8}$/,
      "Please enter a valid Egyptian mobile number (e.g., 01012345678)"
    )
    .or(z.literal(""))
    .optional(),
});

export type profileValues = z.infer<typeof profileSchema>;
