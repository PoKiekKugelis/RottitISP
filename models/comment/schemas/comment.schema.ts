import { z } from 'zod';

export const CommentSchema = z.object({
  id: z.number(),
  content: z.string().max(255),
  createdAt: z.date(),
  editStatus: z.boolean(),
  postId: z.number(),
  creatorId: z.number(),
  parentId: z.number()
});

export const CreateCommentSchema = z.object({
  content: z.string().max(255),
  postId: z.number(),
  creatorId: z.number(),
  parentId: z.number()
});

// Type inference
export type Comment = z.infer<typeof CommentSchema>;
export type CreateComment = z.infer<typeof CreateCommentSchema>;
