import { z } from "zod";

export const AuthSchema = z.object({
  id: z.number(),
  username: z.string(),
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  gender: z.string(),
  image: z.string().url(),
  accessToken: z.string(),
  refreshToken: z.string(),
});
