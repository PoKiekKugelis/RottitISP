
import Header from "@/components/Header";
import SideBar from "@/components/SideBar";
import { EventRepository } from "@/repositories/event.repository";
import { UserRepository } from "@/repositories/user.repository";
import { CommunityRepository } from "@/repositories/community.repository";
import ViewEvent from "@/components/ViewEvent";
import { getCurrentUser } from "@/lib/auth"
import Link from "next/link";

export default async function EventPage({ params }: {
  params: Promise<{ communityName: string, eventId: string }>
}) {
  const { communityName, eventId } = await params;

  const event = await EventRepository.findOne(parseInt(eventId))
  if (!event) {
    return (<div>Event not found</div>)
  }
  const community = await CommunityRepository.findOne(event.communityId)
  if (!community) {
    return <div>Community not found</div>;
  }
  const user = await UserRepository.findOne(event.creatorUserId)
  if (!user) {
    return <div>Creator not found</div>;
  }
  const currentUser = await getCurrentUser();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="my-auto gap-x-5">
        <Link href={`../`}>
          <div className="hover:underline">← Back</div>
        </Link>
      </div>

      <main className="max-w-4xl mx-auto py-6 flex gap-6">
        <div className="flex-1">
          <ViewEvent event={event} community={community} creator={user} user={currentUser}
          ></ViewEvent>
        </div>

        <aside>
          <SideBar activeCommunity={community} />
        </aside>

      </main>
    </div>
  );
}
