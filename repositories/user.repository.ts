import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs";

export class UserRepository {
  static async create(data: any) {
    data.password = await bcrypt.hash(data.password, 10)
    return await prisma.user.create({
      data: data
    });
  }
  static async findOne(id: number) {
    if (Number.isNaN(id)){
      return null;
    }
    return await prisma.user.findUnique({
      where: { id: id }
    });
  }
  static async findAny(filters: {
    loginName?: string;
    username?: string;
    email?: string;
  }) {
    return await prisma.user.findFirst({
      where: {
        OR: [
          { loginName: filters.loginName },
          { email: filters.email },
          { username: filters.username },
        ]
      },
    });
  }
  static async findAll() {
    return await prisma.user.findMany();
  }
  static async update(id: number, data: any) {
    return await prisma.user.update({
      where: { id },
      data: data
    })
  }
  static async delete(id: number) {
    return await prisma.user.delete({
      where: { id }
    });
  }
}
