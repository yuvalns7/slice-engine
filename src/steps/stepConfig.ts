import { StepType } from "./stepTypes";

export type EmailParams = {
  to: string;
  subject: string;
  value: string;
};

export type UpdateStatusGrantOfOptionsParams = {
  id: string;
  status: "Granted" | "Not Granted";
};

export type StepParamsConfig = {
  [StepType.sendEmail]: EmailParams;
  [StepType.grantOptionsUpdateStatus]: UpdateStatusGrantOfOptionsParams;
};