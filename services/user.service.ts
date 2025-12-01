import { UserRepository } from "@/repositories/user.repository";
import { signIn, signOut } from "next-auth/react";

export class UserService {
  static async login(loginName: string, password: string) {
    return await signIn("credentials", {
      loginName: loginName,
      password: password,
      redirect: false,
    })
  }
  static async logout() {
    return await signOut();
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
