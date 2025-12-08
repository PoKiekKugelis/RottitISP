import Header from "@/components/Header";
import PostFeed from "@/components/PostFeed";
import EventFeed from "@/components/EventFeed";
import SideBar from "@/components/SideBar";
import { CommunityRepository } from "@/repositories/community.repository";
import AvatarImg from "@/components/Avatar";
import HeaderImg from "@/components/CommunityHeader";

export default async function CommunityPage({ params }: {
  params: Promise<{ communityName: string }>
}) {
  const { communityName } = await params
  const community = await CommunityRepository.findByName(communityName);
  if (!community) {
    return <div>Community not found</div>;
  }
  const defaultAvatar = `/default-avatar.png`
  const defaultHeader = `/default-header.webp`

  const avatarSrc = community.avatar || defaultAvatar;
  const avatarAlt = "avatar";
  const avatarFallBack = "ROT";

  const headerSrc = community.header || defaultHeader;
  const headerAlt = "header"
  const headerFallBack = "YIKES";

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="relative">
        <HeaderImg src={headerSrc} alt={headerAlt} fallBack={headerFallBack} />
        <div className="absolute bottom-0 translate-y-1/2 left-8">
          <AvatarImg src={avatarSrc} alt={avatarAlt} fallBack={avatarFallBack} size={"size-19"} />
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 mt-4 ml-24">
        <div>
          <h1 className="text-3xl font-bold">rot/{communityName}</h1>
          <p className="text-muted-foreground text-sm mt-1">
            {community.description}
          </p>
        </div>
      </div>
      <main className="max-w-7xl mx-auto px-4 flex gap-6">
        <div className="flex-1">
          <EventFeed communityName={communityName} />
          <PostFeed communityName={communityName} />
        </div>
        <aside>
          <SideBar activeCommunity={community} />
        </aside>
      </main>
    </div>
  );
}
