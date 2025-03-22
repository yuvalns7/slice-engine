import { Step, StepStatus, Workflow } from "../steps"
import { executeStepFunc } from "./executeStepFunc"

export const runEngine = async (wf: Workflow) => {
    try {
      await Promise.all(wf.steps.map(executeStep))

      await Promise.all(wf.wfChildren.map(executeStep))
    } catch (error) {
      console.error(`Error executing wf`)
    }
  
}

export const executeStep = async (step: Step): Promise<void> => {
  try {
    await executeStepFunc(step)
    console.log(`Step ${step.id} completed`)
  } catch (error) {
    console.error(`Error executing step ${step.id}:`, error)
    return Promise.reject()
  }

  await Promise.all(step.children.map(executeStep))
}
