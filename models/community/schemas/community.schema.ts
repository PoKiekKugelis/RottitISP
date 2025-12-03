import { z } from 'zod';

export const CreateCommunity = z.object({
  name: z.string().min(3).max(50).regex(/^[a-zA-Z0-9_-]+$/).trim(),
  description: z.string().max(255),
  avatar: z.string().max(255),
  header: z.string().max(255),
  ageRestriction: z.boolean(),
});
export const UpdateCommunity = z.object({
  name: z.string().min(3).max(50).regex(/^[a-zA-Z0-9_-]+$/).trim(),
  description: z.string().max(255),
  avatar: z.string().max(255),
  header: z.string().max(255),
  ageRestriction: z.boolean(),
});

// Type inference
export type UpdateCommunity = z.infer<typeof UpdateCommunity>;
export type CreateCommunity = z.infer<typeof CreateCommunity>;
