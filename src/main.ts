import { runEngine } from "./engine/runEngine"
import { StepType } from "./steps"
import { WorkflowBuilder } from "./workflows/WorkflowBuilder"

const emailWorkflow1 = new WorkflowBuilder()
  .addStep({
    id: "e1",
    type: StepType.sendEmail,
    params: {
      to: "a@123.com",
      subject: "Welcome!",
      value: "Hello and welcome!",
    },
  })
  .addChildStep("e1", {
    id: "e11",
    type: StepType.sendEmail,
    params: {
      to: "a@123.com",
      subject: "Follow-up",
      value: "Don't forget us!",
    },
  })
  .addChildStep("e11", {
    id: "e111",
    type: StepType.grantOptionsUpdateStatus,
    params: {
      id: "4",
      status: "Granted",
    },
  })
  .addChildStep("e11", {
    id: "e112",
    type: StepType.grantOptionsUpdateStatus,
    params: {
      id: "5",
      status: "Not Granted",
    },
  })
  .addChildStep("e11", {
    id: "e113",
    type: StepType.grantOptionsUpdateStatus,
    params: {
      id: "6",
      status: "Not Granted",
    },
  })
  .addStep({
    id: "e2",
    type: StepType.sendEmail,
    params: {
      to: "b@123.com",
      subject: "Order Confirmation",
      value: "Your order is confirmed!",
    },
  })
  .addWorkflowChild({
    id: "e121",
    type: StepType.sendEmail,
    params: {
      to: "c@123.com",
      subject: "Thank You!",
      value: "We appreciate your business!",
    },
  })
  .addChildStep("e121", {
    id: "e1211",
    type: StepType.grantOptionsUpdateStatus,
    params: {
      id: "76",
      status: "Granted",
    },
  })
  .addChildStep("e121", {
    id: "e1212",
    type: StepType.grantOptionsUpdateStatus,
    params: {
      id: "79",
      status: "Granted",
    },
  })
  .addChildStep("e1212", {
    id: "e12121",
    type: StepType.grantOptionsUpdateStatus,
    params: {
      id: "85",
      status: "Granted",
    },
  })
  .build()

runEngine(emailWorkflow1)
