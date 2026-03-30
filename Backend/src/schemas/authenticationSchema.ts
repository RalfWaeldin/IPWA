import { z } from "zod/v4";

const emailSchema = z.email({ error: "Please provide a valid email address" });

const basePasswordSchema = z
  .string({ error: "Password must be a string" })
  .min(8, { error: "Password must be at least 8 characters long" })
  .max(50, { error: "The length of this Password is excessive." });

//export const loginSchema = z.strictObject({
//  email: emailSchema,
//  password: basePasswordSchema,
//});

export const loginUserSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string(),
  password: z.string().min(8).max(12),
});

export const loginSchema = loginUserSchema.omit({
  firstName: true,
  lastName: true,
});

export const registerSchema = z
  .strictObject({
    email: emailSchema,
    password: basePasswordSchema
      .regex(/[a-z]/, {
        error: "Password must include at least one lowercase letter.",
      })
      .regex(/[A-Z]/, {
        error: "Password must include at least one uppercase letter.",
      })
      .regex(/[0-9]/, { error: "Password must include at least one number." })
      .regex(/[!@#$%^&*()_+\-=\[\]{}|;:'",.<>/?`~]/, {
        error: "Password must include at least one special character",
      }),
    confirmPassword: z.string(),
    firstName: z.string().min(1).max(50),
    lastName: z.string().min(1).max(50),
    role: z.literal(["editor", "root"]),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Passwords don't match",
  });
