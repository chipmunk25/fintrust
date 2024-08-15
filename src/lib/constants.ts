export const APP_NAME = "Ghana Passport Online Portal";

export const routes = {
  home: () => "/home",
  login: () => "/login",
  logout: () => "/logout",
  profile: () => "/profile",
  resetPassword: () => "/reset-password",
  forgotPassword: () => "/forgot-password",
  setPassword: () => "/set-password",
  otpValidation: (params: { telephone: string }) => `/otp/${params.telephone}`,
  settings: () => "/settings",
  person: () => "/",
  employment: () => "/employment",
  guarantor: () => "/guarantor",
  bank: () => "/bank",
  financial: () => "/financial",
  document: () => "/document",
  loan: () => "/loan",
  summary: () => "/summary",
};

export interface Option {
  label: string;
  value: string;
}

export enum InputTypes {
  TEXT = "text",
  TIME = "time",
  OTP = "otp",
  EMAIL = "email",
  NUMBER = "number",
  PASSWORD = "password",
  PHONE = "phone",
  SELECT = "select",
  MULTI = "multi",
  DATE = "date",
  DATETIME = "date-time",
  RANGE = "daterange",
  RADIO = "radio",
  CHECKBOX = "checkbox",
  TEXTAREA = "textarea",
  RICHTEXT = "richtext",
  UPLOAD = "upload",
  IMAGE = "image",
  BUTTON = "button",
  SUBMIT = "submit",
  COLOR = "color",
  SEARCHABLE_SELECT = "searchable-select",
}

export const BASE_URL = "http://localhost:3001";

export const REST_API_URL = BASE_URL;

export const HEADER_HEIGHT_CLASS = "h-10";

export const DEFAULT_API_PAYLOAD = {
  "App-Name": "Veiligh-EHS",
  version: "1",
};

export const DEFAULT_CLIENT_ID = "web";

export const SCREENS = {
  OBSERVATION: "observations",
  INCIDENT: "incidents",
  INSPECTIONS: "inspections",
  COURSES: "courses",
  REGULATION: "regulations",
  CERTIFICATION: "certifications",
  STOREST: "stores-transactions",
  STORES: "stores",
  RENEWALS: "renewals",
  PERMITS: "permits",
  AUDITS: "audits",
  ACTIONS: "actions",
  ACTION_COMMENTS: "action-comments",
  TRAININGS: "trainings",
  FINDINGS: "findings",
  COSTS: "costs",
  EMPLOYEE: "employee",
};

export const COLLECTION_TYPES = {
  ItemType: "ItemType",
  Severity: "Severity",
  Site: "Site",
  Status: "Status",
  WorkRelated: "WorkRelated",
  Employee: "Employee",
  Risk: "Risk",
  Location: "Location",
  InjuryCase: "InjuryCase",
  Illness: "Illness",
  Concern: "Concern",
  JobType: "JobType",
  DirectReport: "DirectReport",
  EmploymentType: "EmploymentType",
  Function: "Function",
  Concerns: "Concern",
  GoverningBody: "GoverningBody",
  FormType: "FormType",
  ActionStatus: "ActionStatus",
  CauseType: "CauseType",
  EffectType: "EffectType",
  GROUPBY: "GroupBy",
  Title: "Title",
  Gender: "Gender",
  Nationality: "Nationality",
};

export const ACTION_MODEL_TYPES = {
  Inspection: "Inspection",
  Audit: "Audit",
};

export const ANALYTICS_TYPES = {
  COURSE: "course",
  INCIDENT: "incident",
  INSPECTION: "inspection",
  OBSERVATION: "observation",
};
