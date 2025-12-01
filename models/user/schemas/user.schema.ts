import { z } from 'zod';

export const CreateUser = z.object({
  loginName: z.string().max(30),
  email: z.email().max(50),
  password: z.string().max(30),
  country: z.string().max(50),
  username: z.string().max(30),
  birthdate: z.iso.datetime()
});

export const UpdateUser = z.object({
  email: z.email().max(50),
  avatar: z.string().max(255),
  country: z.string().max(50),
  username: z.string().max(30),
  bio: z.string().max(255),
});

export type CreateUser = z.infer<typeof CreateUser>;
export type UpdateUser = z.infer<typeof UpdateUser>;

