import { z } from "zod";

export const registerSchema = z.object({
  firstName: z.string().min(1).max(60),
  lastName: z.string().min(1).max(60),
  company: z.string().min(2).max(120),
  email: z.string().email(),
  password: z.string().min(12).max(128),
});

export const resetRequestSchema = z.object({
  email: z.string().email(),
});

export const resetConfirmSchema = z.object({
  token: z.string().min(20),
  password: z.string().min(12).max(128),
});
