import { z } from 'zod';

export const CommunitySchema = z.object({
    id: z.number(),
    name: z.string().max(50),
    description: z.string().max(255),
    createdAt: z.date(),
    avatar: z.string().max(255),
    header: z.string().max(255),
    ageRestriction: z.boolean(),
    creatorId: z.number()
});

export const CreateCommunitySchema = z.object({
    name: z.string().max(50),
    description: z.string().max(255),
    avatar: z.string().max(255),
    header: z.string().max(255),
    ageRestriction: z.boolean(),
    creatorId: z.number()
});

// Type inference
export type Community = z.infer<typeof CommunitySchema>;
export type CreateCommunity = z.infer<typeof CreateCommunitySchema>;