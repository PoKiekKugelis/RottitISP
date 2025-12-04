import { CommunityRepository } from "@/repositories/community.repository";
import SideBarContent from "./SideBarContent";
import { Community } from "@/models/community/entities/community.entity";
import { getSession, isModerator } from "@/lib/auth";

interface SideBarProps {
  activeCommunity?: Community;
}

export default async function SideBar({ activeCommunity }: SideBarProps) {
  const session = await getSession()
  let communityRole = "RANDOM"

  const communities = CommunityRepository.findByMembers(5);
  if (session && activeCommunity) {
    communityRole = await isModerator(parseInt(session.user.id), activeCommunity?.id) ? "MODERATOR" :
      await CommunityRepository.isMember(parseInt(session.user.id), activeCommunity?.id) ? "MEMBER" : "RANDOM"
  }

  return (
    <SideBarContent
      activeCommunity={activeCommunity}
      communities={communities}
      userCommunityRole={communityRole}
    />
  );
}
