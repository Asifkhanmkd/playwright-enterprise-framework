import { z } from "zod";
import { AddressSchema } from "./address.schema";
export const RegisterResponseSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  address: AddressSchema,
  phone: z.string(),
  dob: z.string(),
  email: z.email(),
  id: z.string(),
  created_at: z.string(),
});

/* export const RegisterResponseSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  address: {
    street: z.string(),
    house_number: z.string(),
    city: z.string(),
    state: z.string(),
    country: z.string(),
    postal_code: z.string(),
  },
  phone: z.string(),
  dob: z.string(),
  email: z.email(),
  id: z.string(),
  created_at: z.string(),
});
 */
