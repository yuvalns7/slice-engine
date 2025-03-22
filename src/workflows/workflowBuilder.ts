import {
  Step,
  StepParamsConfig,
  StepStatus,
  StepType,
  Workflow,
} from "../steps"

type StepInput<T extends StepType> = {
  id: string
  type: T
  params: StepParamsConfig[T]
}

export class WorkflowBuilder {
  private workflow: Workflow

  constructor() {
    this.workflow = {
      steps: [],
      wfChildren: [],
    }
  }

  addStep<T extends StepType>(step: StepInput<T>): this {
    this.workflow.steps.push({
      ...step,
      children: [],
      status: StepStatus.Pending,
    })
    return this
  }

  addChildStep<T extends StepType>(
    parentId: string,
    childStep: StepInput<T>
  ): this {
    let parentStep = this.findStepById(parentId, this.workflow.steps)
    if (!parentStep) {
      parentStep = this.findStepById(parentId, this.workflow.wfChildren)
      if (!parentStep) {
        throw new Error(`Parent step with id "${parentId}" not found.`)
      }
    }
    parentStep.children!.push({
      ...childStep,
      children: [],
      status: StepStatus.Pending,
    })
    return this
  }

  addWorkflowChild<T extends StepType>(step: StepInput<T>): this {
    this.workflow.wfChildren!.push({
      ...step,
      children: [],
      status: StepStatus.Pending,
    })
    return this
  }

  private findStepById(id: string, steps: Step[]): Step | undefined {
    for (const step of steps) {
      if (step.id === id) return step
      const found = step.children
        ? this.findStepById(id, step.children)
        : undefined
      if (found) return found
    }
    return undefined
  }

  updateStepStatus(id: string, status: StepStatus) {
    let step = this.findStepById(id, this.workflow.steps)
    if (!step) {
      step = this.findStepById(id, this.workflow.wfChildren)
      if (!step) {
        throw new Error(`Step with id "${id}" not found.`)
      }
    }
    step.status = status
  }

  build(): Workflow {
    return this.workflow
  }
}
