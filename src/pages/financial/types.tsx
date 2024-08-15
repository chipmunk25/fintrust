import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const FinancialSchema = z.object({
  detailsOfPreviousLoans: z
    .string({ required_error: "Details of previous loans is required" })
    .trim()
    .min(1, "Details of previous loans is required"),
  repaymentHistory: z
    .string({ required_error: "Repayment history is required" })
    .trim()
    .min(1, "Repayment history is required"),
  latePayments: z
    .string({ required_error: "Late payments is required" })
    .trim()
    .min(1, "Late payments is required"),
  nationality: z
    .string({ required_error: "Nationality is required" })
    .trim()
    .min(1, "Nationality is required"),
  bankruptcies: z
    .string({ required_error: "Bankruptcies is required" })
    .trim()
    .min(1, "Bankruptcies is required"),
  criminalRecord: z
    .string({ required_error: "Criminal record is required" })
    .trim()
    .min(1, "Criminal record is required"),
});

export type FinancialRequestDto = z.infer<typeof FinancialSchema>;
export const FinancialValidator = zodResolver(FinancialSchema);
