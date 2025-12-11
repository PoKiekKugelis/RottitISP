import { z } from 'zod';

export const CreateEvent = z.object({
    title: z.string().max(50).regex(/^[a-zA-Z]{1,}.{0,}/).trim(),
    description: z.string().max(255).regex(/^[a-zA-Z]{1,}.{0,}/).trim(),
    startsAt: z.iso.datetime(),
    endsAt: z.iso.datetime(),
    address: z.string().max(255).regex(/^[a-zA-Z]{1,}.{0,}/).trim()  
});

export const UpdateEvent = z.object({
    title: z.string().max(50).regex(/^[a-zA-Z]{1,}.{0,}/).trim().optional(),
    description: z.string().max(255).regex(/^[a-zA-Z]{1,}.{0,}/).trim().optional(),
    startsAt: z.iso.datetime().optional(),
    endsAt: z.iso.datetime().optional(),
    address: z.string().max(255).regex(/^[a-zA-Z]{1,}.{0,}/).trim().optional(),
    editStatus: z.boolean().optional()
});

// Type inference
export type CreateEvent = z.infer<typeof CreateEvent>;
export type UpdateEvent = z.infer<typeof UpdateEvent>;