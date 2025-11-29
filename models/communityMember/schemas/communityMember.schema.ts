import { z } from 'zod';

export const CommunityMemberSchema = z.object({
    communityId: z.number(),
    userId: z.number()
});

export const CreateCommunityMemberSchema = z.object({
    communityId: z.number(),
    userId: z.number()
});

// Type inference
export type CommunityMember = z.infer<typeof CommunityMemberSchema>;
export type CreateCommunityMember = z.infer<typeof CreateCommunityMemberSchema>;