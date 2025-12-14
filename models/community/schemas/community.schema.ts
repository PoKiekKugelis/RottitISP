import { z } from 'zod';

export const CreateCommunity = z.object({
  name: z.string().min(3).max(50).regex(/^[a-zA-Z0-9_-]+$/).trim(),
  description: z.string().max(255).trim(),
  avatar: z.string().max(255).nullable(),
  header: z.string().max(255).nullable(),
  ageRestriction: z.boolean(),
});
export const UpdateCommunity = z.object({
  name: z.string().min(3).max(50).regex(/^[a-zA-Z0-9_-]+$/).trim().optional(),
  description: z.string().max(255).trim().optional(),
  avatar: z.string().max(255).optional().nullable(),
  header: z.string().max(255).optional().nullable(),
  ageRestriction: z.boolean().optional(),
});

// Type inference
export type UpdateCommunity = z.infer<typeof UpdateCommunity>;
export type CreateCommunity = z.infer<typeof CreateCommunity>;
