import { z } from "zod";

export const updateUserResponseSchema = z.object({
  success: z.boolean(),
});
