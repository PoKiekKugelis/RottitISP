import { prisma } from "@/lib/prisma"

export class CommunityRepository {
  static async create(data: any) {
    return await prisma.community.create({
      data: data
    });
  }
  static async findOne(id: number) {
    return await prisma.community.findUnique({
      where: { id: id }
    });
  }
  static async findAll() {
    return await prisma.community.findMany();
  }
  static async update(id: number, data: any) {
    return await prisma.community.update({
      where: { id },
      data: data,
    });
  }
  static async delete(id: number) {
    return await prisma.community.delete({
      where: { id }
    });
  }
  static async findByName(title: string) {
    return await prisma.community.findUnique({
      where: { name: title }
    })
  }

}
