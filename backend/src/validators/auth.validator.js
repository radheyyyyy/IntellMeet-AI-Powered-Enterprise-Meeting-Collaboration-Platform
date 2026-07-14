import { z } from "zod";

export const signupSchema = z.object({
  firstName: z.string().min(2),

  lastName: z.string().min(2),

  email: z.string().email(),

  password: z.string().min(8)
});

export const loginSchema = z.object({
  email: z.string().email(),

  password: z.string().min(1)
});

export const forgotPasswordSchema = z.object({
  email: z.string().email()
});

export const resetPasswordSchema = z.object({
  password: z.string().min(8),
  confirmPassword: z.string().min(8)
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1),
  newPassword: z.string().min(8),
  confirmPassword: z.string().min(8)
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
});
