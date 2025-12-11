import EventCard from "@/components/EventCard";
import { CommunityRepository } from "@/repositories/community.repository";
import { EventRepository } from "@/repositories/event.repository";

interface EventFeedProps {
  communityName?: string;
}

export default async function PostFeed({ communityName }: EventFeedProps) {


  const AllEvents0 = [
    {
      id: 1,
      title: "Susitikimas!",
      author: "admin",
      community: "programming",
      content: "Sveiki, norėjau pranešti, kad vyksta bendruomenės susitikimas. "+
        "Bus maisto ir gėrimų bei visokių įdomybių. Kviečiami visi!"
    }
  ];

  if (!communityName){
    return ""
  }
  const community = await CommunityRepository.findByName(communityName);
  if (!community){
    return ""
  }
  const AllEvents = await EventRepository.findAllByCommunity(community.id);

  return (
    <div className="space-y-4">
      {AllEvents.map((event) => (
        <EventCard key={event.id} event={event} community={community} />
      ))}
      {AllEvents.length != 0 ? <br></br>: ""}
    </div>
  );
}