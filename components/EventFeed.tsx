import EventCard from "@/components/EventCard";

interface EventFeedProps {
  communityName?: string;
}

export default function PostFeed({ communityName }: EventFeedProps) {


  const AllEvents = [
    {
      id: 1,
      title: "Susitikimas!",
      author: "admin",
      community: "programming",
      content: "Sveiki, norėjau pranešti, kad vyksta bendruomenės susitikimas. "+
        "Bus maisto ir gėrimų bei visokių įdomybių. Kviečiami visi!"
    }
  ];
  const events = communityName
    ? AllEvents.filter(event => event.community == communityName)
    : AllEvents;

  return (
    <div className="space-y-4">
      {events.map((event) => (
        <EventCard key={event.id} {...event} />
      ))}
      {events.length != 0 ? <br></br>: ""}
    </div>
  );
}