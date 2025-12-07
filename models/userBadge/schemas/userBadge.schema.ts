import { z } from 'zod';

export const UserBadge = z.object({
    userId: z.number(),
    badgeId: z.number()
})

export const CreateUserBadge = z.object({
    userId: z.number(),
    badgeId: z.number()
});

// Type inference
export type UserBadge = z.infer<typeof UserBadge>;
export type CreateUserBadge = z.infer<typeof CreateUserBadge>;