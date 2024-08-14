import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .trim()
    .email({ message: "Email must be a valid email" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export type TLogin = z.infer<typeof LoginSchema>;
export const LoginValidator = zodResolver(LoginSchema);
