import { z } from 'zod';

export enum Rarity {
  COMMON = "Common",
  RARE = "Rare",
  EPIC = "Epic"
}

export const BadgeSchema = z.object({
    id: z.number(),
    name: z.string().max(50),
    description: z.email().max(255),
    avatar: z.string().max(255),
    price: z.number(),
    rarity: z.enum(Rarity)
});

export const CreateBadgeSchema = z.object({
    name: z.string().max(50),
    description: z.email().max(255),
    avatar: z.string().max(255),
    price: z.number(),
    rarity: z.enum(Rarity)
});

// Type inference
export type Badge = z.infer<typeof BadgeSchema>;
export type CreateBadge = z.infer<typeof CreateBadgeSchema>;