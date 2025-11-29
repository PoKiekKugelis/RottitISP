import { z } from 'zod';

export const UserBadgeSchema = z.object({
    userId: z.number(),
    badgeId: z.number()
})

export const CreateUserBadgeSchema = z.object({
    userId: z.number(),
    badgeId: z.number()
});

// Type inference
export type UserBadge = z.infer<typeof UserBadgeSchema>;
export type CreateUserBadge = z.infer<typeof CreateUserBadgeSchema>;