import { z } from 'zod';

export const CreateUser = z.object({
  loginName: z.string().max(30).regex(/^[a-zA-Z0-9_-]+$/).trim(),
  email: z.email().max(50).trim(),
  password: z.string().max(30).regex(/^.{4,}/).trim(),
  country: z.string().max(50).regex(/^[a-zA-Z ]+$/).trim(),
  username: z.string().max(30).regex(/^[a-zA-Z0-9_-]+$/).trim(),
  birthdate: z.iso.datetime()
});

export const UpdateUser = z.object({
  loginName: z.string().max(30).regex(/^[a-zA-Z0-9_-]+$/).trim().optional(),
  username: z.string().max(30).regex(/^[a-zA-Z0-9_-]+$/).trim().optional(),
  avatar: z.string().max(255).optional().nullable(),
  country: z.string().max(50).regex(/^[a-zA-Z ]+$/).trim().optional(),
  birthdate: z.iso.datetime().optional(),
  bio: z.string().max(255).optional(),
  status: z.boolean().optional()
});

export type CreateUser = z.infer<typeof CreateUser>;
export type UpdateUser = z.infer<typeof UpdateUser>;

