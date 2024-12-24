import { z } from "zod";
import { AuthPayload } from "../types";

export const validate = (payload: AuthPayload) => {
  const authSchema = z.object({
    username: z.string().min(1),
    password: z
      .string()
      .min(6)
      .regex(
        new RegExp(
          "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"
        )
      ),
  });

  return authSchema.safeParse(payload);
};
