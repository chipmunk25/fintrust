import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
const schedule = z.enum(["FULL", "MONTHLY", "WEEKLY", "DAILY", "YEARLY"]);

export const FinancialSchema = z.object({
  previousLoan: z
    .string({ required_error: "Bankruptcies is required" })
    .trim()
    .min(1, "Previous Loan is required"),
  latePayments: z.string().optional(),
  // .string({ required_error: "Bankruptcies is required" })
  // .trim()
  // .min(1, "Bankruptcies is required"),
  // previousLoan: z.boolean({ required_error: "Previous Loan is required" }),
  // latePayments: z.boolean({ required_error: "Late payments is required" }),
  repaymentSchedule: z
    .object(
      {
        value: schedule,
        label: z.string(),
      },
      {
        message: "Repayment schedule is required",
      }
    )
    .optional(),

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
