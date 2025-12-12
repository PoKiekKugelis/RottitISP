import { getCurrentUser } from "@/lib/auth";
import { UserRepository } from "@/repositories/user.repository";
import { signIn, signOut } from "next-auth/react";
import { countryToAlpha2 } from "country-to-iso";
import { User } from "@/models/user/entities/user.entity";
import ISO6391 from "iso-639-1";

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

  static async getAge(userId: number) {
    const user = await UserRepository.findOne(userId)
    const today = new Date();
    let age = today.getFullYear() - user!.birthdate.getFullYear();
    const month = today.getMonth() - user!.birthdate.getMonth();
    if (month < 0 || (today.getDate() < user!.birthdate.getDate() && month == 0)) {
      age--;
    }
    return age;
  }

  static async changeStatus(loginName: string) {
    const user = await UserRepository.findOneByName(loginName);
    if (!user) {
      throw new Error("Could not get user id via session");
    }
    const oldStatus = user.status;
    const data = {
      status: !oldStatus
    }
    return await UserRepository.update(user.id, data);
  }

  static async getCountryCode(userId: number) {
    const user = await UserRepository.findOne(userId) as User
    const res = await fetch(`https://restcountries.com/v3.1/alpha/${countryToAlpha2(user.country)}`);
    const data = await res.json();
    const languages3 = data[0].languages || null;
    if (languages3) {
      const first3 = Object.values(languages3)[0] as string;
      return ISO6391.getCode(first3);
    }
    return "en"

  }

}
