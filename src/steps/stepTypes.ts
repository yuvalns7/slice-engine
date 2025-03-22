import { StepParamsConfig } from "./stepConfig"

export enum StepType {
  sendEmail = "sendEmail",
  grantOptionsUpdateStatus = "grantOptionsUpdateStatus",
}

export enum StepStatus {
  Pending = "Step has not been executed yet",
  Success = "Step completed successfully",
  Error = "Step failed due to an error",
}

export type Step<T extends StepType = StepType> = {
  id: string
  type: T
  params: StepParamsConfig[T]
  children: Step[]
  status: StepStatus
}

export type Workflow = {
  steps: Step[]
  wfChildren: Step[]
}
