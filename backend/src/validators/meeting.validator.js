import { z } from "zod";

export const createMeetingSchema =
  z.object({
    title: z
      .string()
      .min(3)
      .max(100),

    description:
      z.string().optional(),

    team: z.string(),

    scheduledAt:
      z.string().datetime()
  });