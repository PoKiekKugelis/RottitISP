import { z } from 'zod';

export const ReplySchema = z.object({
    commentId: z.number(),
    parentId: z.number()
})

export const CreateReplySchema = z.object({
    commentId: z.number(),
    parentId: z.number()
});

// Type inference
export type Reply = z.infer<typeof ReplySchema>;
export type CreateReply = z.infer<typeof CreateReplySchema>;