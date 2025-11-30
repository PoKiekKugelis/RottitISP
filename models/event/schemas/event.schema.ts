import { z } from 'zod';

export const EventSchema = z.object({
    id: z.string(),
    title: z.string().max(50),
    description: z.string().max(255),
    startsAt: z.date(),
    endsAt: z.date(),
    address: z.string().max(255),
    createdAt: z.date(),
    editStatus: z.boolean(),
    communityId: z.number(),
    creatorId: z.number()
});

export const CreateEventSchema = z.object({
    title: z.string().max(50),
    description: z.string().max(255),
    startsAt: z.date(),
    endsAt: z.date(),
    address: z.string().max(255),
    communityId: z.number(),
    creatorId: z.number()
});

// Type inference
export type Event = z.infer<typeof EventSchema>;
export type CreateEvent = z.infer<typeof CreateEventSchema>;