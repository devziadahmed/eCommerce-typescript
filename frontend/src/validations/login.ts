import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, { message: "Password is Required" }),
});

export type LoginSchema = z.infer<typeof loginSchema>;
