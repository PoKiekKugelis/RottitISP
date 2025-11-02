import Header from "@/components/Header";
import PostFeed from "@/components/PostFeed";
import { prisma } from "@/lib/prisma";
import SideBar from "@/components/SideBar";

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
