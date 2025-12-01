import Header from "@/components/Header";
import PostFeed from "@/components/PostFeed";
import { prisma } from "@/lib/prisma";
import SideBar from "@/components/SideBar";
import { CreateUser } from "@/models/user/schemas/user.schema";

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
const user = {
  id: 1,
  loginName: "testBirthDate2",
  email: "testBirthDate2@gmail.com",
  password: "pass",
  avatar: "",
  country: "",
  createdAt: new Date(),
  username: "testBirthDate2",
  karma: 0,
  bio: "I am testBirthDate2",
  birthdate: new Date("2020-1-2"),
  status: false
};

//This is purely to test out if we can create an instance of the given object in DB table User
async function createUser(userData: any) {

  console.log("\n ZOD test\n");
  const result = CreateUser.safeParse(user);
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
        data: result.data
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
