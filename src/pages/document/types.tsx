import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const DocumentType = z.enum([
  "PASSPORT",
  "NATIONALID",
  "DRIVERLICENSE",
  "UTITLITYBILL",
  "LEASEAGREEMENT",
  "TAXRETURNS",
  "BANKSTATMENT",
  "CREDITREPORT",
  "RECENTPAYSTUBS",
]);

export const DocumentSchema = z.object({
  type: z.object(
    {
      value: DocumentType,
      label: z.string(),
    },
    {
      message: "Document Type is required",
    }
  ),
  document: z.any().refine(
    (file: File | string | undefined) => {
      if (typeof file === "string") {
        return z.string().min(3).safeParse(file).success;
      }

      const allowedMimeTypes = [
        "image/",
        "application/pdf",
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "text/csv",
      ];

      return allowedMimeTypes.some(
        (type) => z.string().startsWith(type).safeParse(file?.type).success
      );
    },
    {
      message:
        "document File is required. Upload a valid file (image, PDF, Excel, or CSV)",
    }
  ),
});

export const DocumentValidator = zodResolver(DocumentSchema);
export type DocumentRequestDto = z.infer<typeof DocumentSchema>;
