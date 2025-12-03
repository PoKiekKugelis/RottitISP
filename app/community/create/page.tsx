import Header from "@/components/Header";
import SideBar from "@/components/SideBar";
import CreateCommunityForm from "@/components/CreateCommunityForm";

export default function CreateCommunityPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-6 flex gap-6">
        <div className="flex-1">
          <CreateCommunityForm />
        </div>
        <aside>
          <SideBar />
        </aside>
      </main>
    </div>
  );
}
