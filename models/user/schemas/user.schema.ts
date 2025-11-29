import { z } from 'zod';

export const UserSchema = z.object({
    id: z.number(),
    loginName: z.string().max(30),
    email: z.email().max(50),
    password: z.string().max(30),
    avatar: z.string().max(255),
    country: z.string().max(50),
    createdAt: z.date(),
    username: z.string().max(30),
    karma: z.number(),
    bio: z.string().max(255),
    birthdate: z.date(),
    status: z.boolean()
});

export const CreateUserSchema = z.object({
    loginName: z.string().max(30),
    email: z.email().max(50),
    password: z.string().max(30),
    avatar: z.string().max(255),
    country: z.string().max(50),
    username: z.string().max(30),
    bio: z.string().max(255),
    birthdate: z.date()
});

// Type inference
export type User = z.infer<typeof UserSchema>;
export type CreateUser = z.infer<typeof CreateUserSchema>;