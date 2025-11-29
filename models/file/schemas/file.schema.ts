import { z } from 'zod';

export const FileSchema = z.object({
    id: z.number(),
    link: z.string().max(255),
    content: z.string().max(255),
    type: z.string().max(10),
    size: z.number(),
    postId: z.number()
})

export const CreateFileSchema = z.object({
    link: z.string().max(255),
    content: z.string().max(255),
    type: z.string().max(10),
    size: z.number(),
    postId: z.number()
});

// Type inference
export type File = z.infer<typeof FileSchema>;
export type CreateFile = z.infer<typeof CreateFileSchema>;