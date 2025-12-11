import { z } from 'zod';

export enum Rarity {
  COMMON = "Common",
  RARE = "Rare",
  EPIC = "Epic"
}

export const BadgeSchema = z.object({
    id: z.number(),
    name: z.string().max(50).regex(/^[a-zA-Z]{1,}.{0,}/).trim(),
    description: z.string().max(255).regex(/^[a-zA-Z]{1,}.{0,}/).trim(),
    avatar: z.string().max(255),
    price: z.number(),
    rarity: z.enum(Rarity)
});

export const CreateBadgeSchema = z.object({
    name: z.string().max(50).regex(/^[a-zA-Z]{1,}.{0,}/).trim().optional(),
    description: z.string().max(255).regex(/^[a-zA-Z]{1,}.{0,}/).trim().optional(),
    avatar: z.string().max(255).optional(),
    price: z.number().optional(),
    rarity: z.enum(Rarity).optional()
});

// Type inference
export type Badge = z.infer<typeof BadgeSchema>;
export type CreateBadge = z.infer<typeof CreateBadgeSchema>;