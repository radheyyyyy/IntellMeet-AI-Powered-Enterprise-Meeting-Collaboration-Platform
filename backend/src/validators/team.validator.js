import { z } from "zod";

export const createTeamSchema =
  z.object({
    name: z
      .string()
      .min(3)
      .max(100),

    description:
      z.string().optional()
  });