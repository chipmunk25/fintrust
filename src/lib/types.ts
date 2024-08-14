export enum Status {
  Open = "Open",
  InProgress = "In Progress",
  New = "New",
  Closed = "Closed",
  Rejected = "Rejected",
  Resolved = "Resolved",
  Overdue = "Overdue",
  NonCompliant = "Non Compliant",
}

export type Role = {
  displayName: string;
  name: string;
  id: string;
};

type DirectReport = {
  id: string;
  name: string;
  isDisabled: boolean;
};

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  employeeId: string | null;
  dateOfBirth: string; // ISO 8601 date string
  nationality: string | null;
  email: string;
  privateEmail: string | null;
  phoneNumber: string | null;
  title: string | null;
  sex: string | null;
  directReport: DirectReport;
  employmentType: string | null;
  hiredOn: string; // ISO 8601 date string
  avatar: string | null;
  isDisabled: boolean;
  roles: Role[];
};
