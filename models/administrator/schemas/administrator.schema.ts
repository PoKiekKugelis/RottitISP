import { z } from 'zod';

export const AdminSchema = z.object({
    id: z.number(),
    assignedAt: z.date()
});

export const CreateAdminSchema = z.object({
    id: z.number()
});

// Type inference
export type Admin = z.infer<typeof AdminSchema>;
export type CreateAdmin = z.infer<typeof CreateAdminSchema>;