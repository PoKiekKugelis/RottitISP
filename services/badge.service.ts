import { prisma } from "@/lib/prisma"
import { BadgeRepository } from "@/repositories/badge.repository";
import { UserRepository } from "@/repositories/user.repository";

export class BadgeService {
    static async buyBadge(userId: number, badgeId: number) {
        const user = await UserRepository.findOne(userId);
        if (!user) {
            throw new Error("Invalid user ID");
        }
        const badge = await BadgeRepository.findOne(badgeId);
        if (!badge) {
            throw new Error("Invalid badge ID");
        }

        if (user?.karma < badge?.price) {
            throw new Error("Not enough karma points");
        }
        const userBadge = await BadgeRepository.findOneByUser(userId, badgeId);
        if (userBadge){
            throw new Error("You already have this badge");
        }

        const newBalance = user?.karma - badge?.price;
        const data = {
            karma: newBalance
        }
        UserRepository.update(userId, data);

        return await prisma.userBadge.create({
            data: {
                userId: userId,
                badgeId: badgeId
            }
        });
    }
}