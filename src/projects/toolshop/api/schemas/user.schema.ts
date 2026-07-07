import { z } from "zod";
import { AddressSchema } from "./address.schema";

export const UserSchema = z.object({
  id: z.string(),

  first_name: z.string(),
  last_name: z.string(),

  address: AddressSchema,

  phone: z.string(),
  dob: z.string(),
  email: z.email(),

  provider: z.string(),
  totp_enabled: z.boolean(),
  enabled: z.boolean(),
  failed_login_attempts: z.number(),
  created_at: z.string(),
});
