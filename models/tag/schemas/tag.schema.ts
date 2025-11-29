import { z } from 'zod';

export const TagSchema = z.object({
    id: z.number(),
    name: z.string().max(50),
    description: z.string().max(255),
    group: z.string().max(50)
})

export const CreateTagSchema = z.object({
    name: z.string().max(50),
    description: z.string().max(255),
    group: z.string().max(50)
});

// Type inference
export type Tag = z.infer<typeof TagSchema>;
export type CreateTag = z.infer<typeof CreateTagSchema>;