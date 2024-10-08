import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const UserSchema = z.object({
  fullName: z
    .string({ required_error: "First name is required" })
    .trim()
    .min(1, "First name is required"),
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email address"),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, "Password must be at least 8 characters long"),

});

export type UserRequestDto = z.infer<typeof UserSchema>;
export const UserValidator = zodResolver(UserSchema);
