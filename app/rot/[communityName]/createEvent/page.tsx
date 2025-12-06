import CreateEventForm from "@/components/CreateEventForm";
import { CommunityRepository } from "@/repositories/community.repository";

export default async function CreateEventPage({ params }: {
  params: Promise<{ communityName: string }>
}) {
  const { communityName } = await params;
  const community = await CommunityRepository.findByName(communityName);
  if (!community) {
    return <div>Community not found</div>;
  }

  return (
    <div className="flex-1">
      <CreateEventForm communityName={communityName}></CreateEventForm>
    </div>
  );
}