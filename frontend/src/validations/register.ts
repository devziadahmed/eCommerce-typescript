import { z } from "zod";

export const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+-=]).*$/;

export const passwordValidation = () => {
  return z
    .string()
    .min(8, { message: "Password should be at least 8 characters" })
    .regex(passwordRegex, {
      message: "Password should containt at least 1 uppercase letter and 1 special character",
    });
};

export const registerSchema = z
  .object({
    firstName: z.string().min(2, { message: "First Name should be at least 2 characters" }),
    lastName: z.string().min(2, { message: "Last Name should be at least 2 characters" }),
    email: z.string().email(),
    password: passwordValidation(),
    confirmPassword: z.string(),
  })
  .refine((formData) => formData.password === formData.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterSchema = z.infer<typeof registerSchema>;
