import { z } from 'zod';

export const CreateCommunity = z.object({
  name: z.string().max(50),
  description: z.string().max(255),
  avatar: z.string().max(255),
  header: z.string().max(255),
  ageRestriction: z.boolean(),
});
export const UpdateCommunity = z.object({
  name: z.string().max(50),
  description: z.string().max(255),
  avatar: z.string().max(255),
  header: z.string().max(255),
  ageRestriction: z.boolean(),
});

// Type inference
export type UpdateCommunity = z.infer<typeof UpdateCommunity>;
export type CreateCommunity = z.infer<typeof CreateCommunity>;
