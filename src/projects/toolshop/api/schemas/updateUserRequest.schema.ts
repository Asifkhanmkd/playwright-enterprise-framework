import { z } from "zod";
import { AddressSchema } from "./address.schema";

export const updateUserRequestSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  address: AddressSchema,
  phone: z.string(),
  dob: z.string(),
  password: z.string(),
  email: z.string(),
});
