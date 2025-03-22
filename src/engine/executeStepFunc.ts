import { Step } from "../steps";
import { handlers } from "../steps";

export const executeStepFunc = async <T extends Step>(step: T): Promise<void> => {
  const handler = handlers[step.type] as (params: T["params"]) => Promise<void>;

  if (!handler) {
    throw new Error(`No handler found for step type: ${step.type}`);
  }

  await handler(step.params);

};