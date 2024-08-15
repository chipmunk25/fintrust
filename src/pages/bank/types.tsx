import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const accountType = z.enum([
  "SAVINGS",
  "CURRENT",
  "COOPERATE",
  "SUSU",
  "FIXEDDEPOSIT",
  "TBILL",
  "BONDS",
]);

export const BankSchema = z.object({
  accountNumber: z
    .string({ required_error: "Account number is required" })
    .trim()
    .min(1, "Account number is required"),
  accountName: z
    .string({ required_error: "Account name is required" })
    .trim()
    .min(1, "Account name is required"),

  bankName: z
    .string({ required_error: "Bank name is required" })
    .trim()
    .min(1, "Bank name is required"),
  branchName: z
    .string({ required_error: "Branch name is required" })
    .trim()
    .min(1, "Branch name is required"),
  type: z.object(
    {
      value: accountType,
      label: z.string(),
    },
    {
      message: "Bank Type is required",
    }
  ),
  balance: z
    .string({ required_error: "Balance is required" })
    .min(0, "Balance can not be negative"),
  personId: z.string().optional(),
});

export const BankValidator = zodResolver(BankSchema);
export type BankRequestDto = z.infer<typeof BankSchema>;
