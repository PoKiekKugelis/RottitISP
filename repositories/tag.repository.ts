import { prisma } from "@/lib/prisma";

export default class TagRepository {
  static async findAll() {
    return await prisma.tag.findMany();
  }

  static async findOne(tagId: number) {
    return await prisma.tag.findFirst({
      where: { id: tagId }
    })
  }
  static async delete(tagId: number) {
    return await prisma.tag.delete({
      where: { id: tagId }
    })
  }
}
