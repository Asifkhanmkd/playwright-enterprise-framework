import { z } from "zod";
export const AddressSchema = z.object({
  house_number: z.string(),
  street: z.string(),
  city: z.string(),
  state: z.string(),
  country: z.string(),
  postal_code: z.string(),
});
