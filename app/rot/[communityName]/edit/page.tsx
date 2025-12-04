
import Header from "@/components/Header";
import SideBar from "@/components/SideBar";
import { EditCommunityForm } from "@/components/EditCommunityForm";
import { CommunityRepository } from "@/repositories/community.repository";
import TagRepository from "@/repositories/tag.repository";

export default async function EditCommunityPage({ params }: {
  params: Promise<{ communityName: string }>
}) {
  const { communityName } = await params;
  const community = await CommunityRepository.findByName(communityName)
  const tags = await TagRepository.findAll();
  if (!community) {
    return <div>Community not found</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-7xl mx-auto py-6 flex gap-6">
        <div className="flex-1">

          <div className="flex-1">
            <EditCommunityForm community={community} allTags={tags} />
          </div>
        </div>

        <aside>
          <SideBar activeCommunity={community} />
        </aside>
      </main>
    </div>
  );
}
