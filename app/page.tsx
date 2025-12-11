import Header from "@/components/Header";
import PostFeed from "@/components/PostFeed";
import { prisma } from "@/lib/prisma";
import SideBar from "@/components/SideBar";
import { CreateUser } from "@/models/user/schemas/user.schema";
import { UserRepository } from "@/repositories/user.repository";
import bcrypt from "bcryptjs";
import { Community } from "@/models/community/entities/community.entity";
import { CreateCommunity } from "@/models/community/schemas/community.schema";
import { CommunityService } from "@/services/community.service";
import { getCurrentUser } from "@/lib/auth";

async function testDB() {
  // This function is purely to test out that DB queries work
  // await prisma.test.create({ // Can only do this once, since email is a unique value, comment it after running the program once
  //   data: {
  //     name: 'Alice',
  //     email: 'alice@gmail.com',
  //   },
  // })

  const allTestEntries = await prisma.test.findMany()
  console.dir(allTestEntries)
}

testDB()

// To test out Zod, you can change the attribute values as you see fit
const admin = {
  loginName: "admin",
  email: "admin@gmail.com",
  password: "admin",
  avatar: "",
  country: "",
  createdAt: new Date(),
  username: "admin",
  karma: 0,
  bio: "I am admin",
  birthdate: new Date("2020-01-02").toJSON(),
  status: false
};
const user = {
  loginName: "user",
  email: "user@gmail.com",
  password: "user",
  avatar: "",
  country: "",
  createdAt: new Date(),
  username: "user",
  karma: 0,
  bio: "I am user",
  birthdate: new Date("2020-01-02").toJSON(),
  status: false
};
const community = {
  name: "GamesOrBacon",
  description: "Unlimited bacon but no games? Or... GAMES, unlimited games but no games?",
  avatar: "",
  header: "",
  ageRestriction: false,
  creatorId: 1
}

//This is purely to test out if we can create an instance of the given object in DB table User
async function createUser(userData: any) {

  console.log("\n ZOD test\n");
  const result = CreateUser.safeParse(userData);
  if (!result.success) {
    console.log(result.error);   // ZodError instance
  } else {
    console.log(result.data);

    const isNameUsed = await prisma.user.findFirst({
      where: {
        loginName: userData.loginName
      }
    });

    if (isNameUsed != null) {
      console.log("A user with that name is already registered in DB. Name = ", userData.loginName);
    }

    else {
      UserRepository.create(result.data)
      await prisma.administrator.create({
        data: { id: userData.id }
      })
    }
  }
}
async function createCommunity(communityData: any) {
  const result = CreateCommunity.safeParse(communityData);
  if (!result.success) {
    console.log(result.error);
  } else {
    console.log(result.data);
    await CommunityService.register({ ...result.data, creatorId: communityData.creatorId })
  }
}

createUser(admin);
createUser(user);
createCommunity(community)

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-6 flex gap-6">
        <div className="flex-1">
          <PostFeed />
        </div>
        <aside>
          <SideBar />
        </aside>
      </main>
    </div>
  );
}
