import { StepType } from "./stepTypes";
import { sendEmail, updateStatusGrantOptions } from "./stepHandlers";
import { StepParamsConfig } from "./stepConfig";

export const handlers: {
  [K in StepType]: (params: StepParamsConfig[K]) => Promise<void>;
} = {
  [StepType.sendEmail]: sendEmail,
  [StepType.grantOptionsUpdateStatus]: updateStatusGrantOptions,
} as const;