import Header from "@/components/Header";
import PostFeed from "@/components/PostFeed";
import { prisma } from "@/lib/prisma";
import SideBar from "@/components/SideBar";
//import { User } from "@/models/user/entities/user.entity";
import { User, UserSchema } from "@/models/user/schemas/user.schema";

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
const user: User = {
  id: 1,
  loginName: "test",
  email: "test@gmail.com",
  password: "pass",
  avatar: "",
  country: "",
  createdAt: new Date(),
  username: "test",
  karma: 0,
  bio: "I am test",
  birthdate: new Date("2020-1-1"),
  status: false
};

//This is purely to test out if we can create an instance of the given object in DB table User
async function createUser(userData: User) {
  
  console.log("\n ZOD test\n");
  const result = UserSchema.safeParse(user);
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
      await prisma.user.create({
        data: {
          loginName: userData.loginName,
          email: userData.email,
          password: userData.password,
          avatar: userData.avatar,
          country: userData.country,
          username: userData.username,
          bio: userData.bio,
          birthdate: userData.birthdate
        },
      });
    }
  }
}

createUser(user);

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-6 flex gap-6">
        {/* Main stuff */}
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
