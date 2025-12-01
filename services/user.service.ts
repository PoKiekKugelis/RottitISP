import { UserRepository } from "@/repositories/user.repository";

export class UserService {
  static async login() {
    //TODO
  }
  static async logout() {
    //TODO
  }
  static async register(data: {
    loginName: string,
    email: string,
    password: string,
    country: string,
    username: string,
    birthdate: string
  }) {
    const existing = await UserRepository.findAny({ loginName: data.loginName, username: data.username, email: data.email })
    if (existing) {
      return null
    }
    return await UserRepository.create(data);
  }
  static async addBadge() {
    //TODO
  }
  static async addKarma() {
    //TODO
  }
}
