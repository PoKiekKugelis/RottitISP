import { z } from 'zod';

export const PostSchema = z.object({
    id: z.number(),
    title: z.string().max(50),
    description: z.string().max(255),
    createdAt: z.date(),
    likesCount: z.number(),
    editStatus: z.boolean(),
    views: z.number(),
    ageRestriction: z.boolean(),
    communityId: z.number(),
    creatorId: z.number()
})

export const CreatePostSchema = z.object({
    title: z.string().max(50),
    description: z.string().max(255),
    ageRestriction: z.boolean(),
    communityId: z.number(),
    creatorId: z.number()
});

// Type inference
export type Post = z.infer<typeof PostSchema>;
export type CreatePost = z.infer<typeof CreatePostSchema>;