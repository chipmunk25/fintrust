import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const LoanType = z.enum([
  "PERSONAL",
  "AUTO",
  "MORTGAGE",
  "STUDENT",
  "COOPERATE",
  "BUSINESS",
]);

export const LoanSchema = z.object({
  // loanAmountRequested: z
  //   .number({ required_error: "Loan amount requested is required" })
  //   .positive("Loan amount must be a positive number"),

  // loanTerm: z
  //   .number({ required_error: "Loan term is required" })
  //   .int("Loan term must be an integer")
  //   .positive("Loan term must be a positive number"),
  loanAmountRequested: z
    .string()
    .optional()
    .refine(
      (value) => {
        const loan = value ? parseFloat(value) : 0;
        if (loan < 1) return false;
        return true;
      },
      {
        message: "Loan amount must be a positive number",
      }
    ),
  type: z.object(
    {
      value: LoanType,
      label: z.string(),
    },
    {
      message: "Loan Type is required",
    }
  ),

  purpose: z
    .string({ required_error: "Purpose is required" })
    .trim()
    .min(1, "Purpose is required"),
  loanTerm: z
    .string()
    .optional()
    .refine(
      (value) => {
        const term = value ? parseFloat(value) : 0;
        if (term < 1) return false;
        return true;
      },
      {
        message: "Loan term must be a positive number",
      }
    ),
  collateral: z
    .string({ required_error: "Collateral is required" })
    .trim()
    .min(1, "Collateral is required"),
});

export const LoanValidator = zodResolver(LoanSchema);
export type LoanRequestDto = z.infer<typeof LoanSchema>;
