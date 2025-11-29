import { z } from 'zod';

export const LikeSchema = z.object({
    id: z.number(),
    likeStatus: z.boolean(),
    userId: z.number(),
    postId: z.number()
})

export const CreateLikeSchema = z.object({
    likeStatus: z.boolean(),
    userId: z.number(),
    postId: z.number()
});

// Type inference
export type Like = z.infer<typeof LikeSchema>;
export type CreateLike = z.infer<typeof CreateLikeSchema>;