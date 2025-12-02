import { z } from 'zod';

export const CreateEvent = z.object({
    title: z.string().max(50),
    description: z.string().max(255),
    startsAt: z.iso.datetime(),
    endsAt: z.iso.datetime(),
    address: z.string().max(255)   
});

export const UpdateEvent = z.object({
    title: z.string().max(50),
    description: z.string().max(255),
    startsAt: z.iso.datetime(),
    endsAt: z.iso.datetime(),
    address: z.string().max(255)
});

// Type inference
export type CreateEvent = z.infer<typeof CreateEvent>;
export type UpdateEvent = z.infer<typeof UpdateEvent>;