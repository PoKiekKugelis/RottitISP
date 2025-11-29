import { z } from 'zod';

export const ModeratorSchema = z.object({
    id: z.number(),
    assignedAt: z.date(),
    assignedBy: z.string().max(30),
    communityId: z.number()
})

export const CreateModeratorSchema = z.object({
    assignedBy: z.string().max(30),
    communityId: z.number()
});

// Type inference
export type Moderator = z.infer<typeof ModeratorSchema>;
export type CreateModerator = z.infer<typeof CreateModeratorSchema>;