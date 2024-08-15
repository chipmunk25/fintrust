import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
const marital = z.enum([
  "SINGLE",
  "MARRIED",
  "WIDOWED",
  "SEPARATED",
  "DIVORCED",
]);
export const PersonSchema = z.object({
  id: z
    .string({ required_error: "Person ID is required" })
    .trim()
    .min(1, "Person ID  is required"),
  fullname: z
    .string({ required_error: "Full name is required" })
    .trim()
    .min(1, "Full name is required"),
  // dob: z.date({ required_error: "Date of birth is required" }),
  dob: z.string({ required_error: "Date of birth  is required" }).min(1, {
    message: "Date of birth  is required",
  }),
  maritalStatus: z.object(
    {
      value: marital,
      label: z.string(),
    },
    {
      message: "Marital Status is required",
    }
  ),

  noOfDependants: z
    .string()
    .optional()
    .refine(
      (value) => {
        const height = value ? parseFloat(value) : 0;
        if (height < 0) return false;
        return true;
      },
      {
        message: "Number of dependent can not be negative",
      }
    ),
  previousHomeAddress: z.string().optional().nullable(),
  currentHomeAddress: z
    .string({ required_error: "Current home address is required" })
    .trim()
    .min(1, "Current home address is required"),
  email: z.string().email().optional().nullable(),
  telephone: z
    .string({ required_error: "Phone number is required" })
    .trim()
    .min(1, "Phone number is required"),
  previousPhone: z.string().optional().nullable(),
  nationalID: z
    .string({ required_error: "National ID is required" })
    .trim()
    .min(1, { message: "National ID cannot be empty" }),
  passport: z.any().refine(
    (image: File | string | undefined) => {
      if (typeof image === "string") {
        return z.string().min(3).safeParse(image).success;
      }
      return z.string().startsWith("image/").safeParse(image?.type).success;
    },
    {
      message: "Passport photo is required. Upload a valid image",
    }
  ),
  // passport: z
  //   .instanceof(File)
  //   .refine(
  //     (file) => file.size <= 5 * 1024 * 1024,
  //     "File size should be less than 5MB"
  //   )
  //   .refine(
  //     (file) => ["image/jpeg", "image/png"].includes(file.type),
  //     "Only JPEG or PNG images are allowed"
  //   ),
});

export type PersonRequestDto = z.infer<typeof PersonSchema>;
export const PersonValidator = zodResolver(PersonSchema);
