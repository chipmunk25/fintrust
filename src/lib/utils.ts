import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { DEFAULT_API_PAYLOAD } from "./constants";
import { Status } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function waitForTimeout(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
export const getFormData = (data: any) => {
  const formData = new FormData();
  Object.keys(data).forEach((key) => {
    formData.append(key, data[key] ?? "");
  });
  return formData;
};
export const constructPayload = <T>(data: any): T => {
  return {
    ...DEFAULT_API_PAYLOAD,
    ...data,
  };
};

export const getStatusColor = (status: string) => {
  switch (status) {
    case Status.New:
      return "bg-neutral-300 text-neutral-600";
    case Status.Open:
      return "bg-accent-200 text-accent-900";
    case Status.InProgress:
      return "bg-info-100 text-info-500";
    case Status.Resolved:
      return "bg-success-100 text-success-500";
    case Status.Rejected:
      return "bg-danger-200 text-danger-500";
    case Status.NonCompliant:
      return "bg-warning-200 text-warning-800";
    case Status.Overdue:
      return "bg-danger-500 text-white";
    case Status.Closed:
      return "bg-success-500 text-white";
    default:
      return "bg-gray-100 text-gray-500";
  }
};

export const fullname = (name?: string, surname?: string) =>
  `${name} ${surname}`;
export const getInitials = (name: string) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("");
  return initials.toUpperCase();
};
