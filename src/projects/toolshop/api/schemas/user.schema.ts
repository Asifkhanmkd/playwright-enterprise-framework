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

  provider: z.string().nullable(), //made nullable because the actaul response return it as null but swagger retun false
  totp_enabled: z.boolean().nullable(), //made nullable because the actaul response return it as null but swagger retun false
  enabled: z.boolean().optional(), //contradiction between swagger and actual response, response doesn't return it
  failed_login_attempts: z.number().optional(), //same reason as above
  created_at: z.string(),
});
