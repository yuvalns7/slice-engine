import { EmailParams, UpdateStatusGrantOfOptionsParams } from "./stepConfig";
import { generateRandomTimeout } from "../utils/random";

export const sendEmail = async ({ value, subject, to }: EmailParams) => {
  await new Promise((r) => setTimeout(r, generateRandomTimeout()));
  console.log(`📩 Email to ${to} was sent, with subject: ${subject}, value: ${value}`);
};

export const updateStatusGrantOptions = async ({ id, status }: UpdateStatusGrantOfOptionsParams) => {
  await new Promise((r) => setTimeout(r, generateRandomTimeout()));
  console.log(`✅ Status of grant options updated to ${status} for ID: ${id}`);
};