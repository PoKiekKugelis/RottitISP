import Header from "@/components/Header";
import SideBar from "@/components/SideBar";
import CreateCommunityForm from "@/components/CreateCommunityForm";
import TagRepository from "@/repositories/tag.repository";

export default async function CreateCommunityPage() {
  const tags = await TagRepository.findAll();
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-6 flex gap-6">
        <div className="flex-1">
          <CreateCommunityForm allTags={tags} />
        </div>
        <aside>
          <SideBar />
        </aside>
      </main>
    </div>
  );
}
