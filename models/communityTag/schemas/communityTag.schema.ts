import { z } from 'zod';

export const CommunityTagSchema = z.object({
    communityId: z.number(),
    tagId: z.number()
});

export const CreateCommunityTagSchema = z.object({
    communityId: z.number(),
    tagId: z.number()
});

// Type inference
export type CommunityTag = z.infer<typeof CommunityTagSchema>;
export type CreateCommunityTag = z.infer<typeof CreateCommunityTagSchema>;