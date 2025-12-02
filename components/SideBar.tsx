import { CommunityRepository } from "@/repositories/community.repository";
import SideBarContent from "./SideBarContent";
import { Community } from "@/models/community/entities/community.entity";

interface SideBarProps {
  activeCommunity?: Community;
}

export default function SideBar({ activeCommunity }: SideBarProps) {

  const communities = CommunityRepository.findByMembers(5)

  return (
    <SideBarContent
      activeCommunity={activeCommunity}
      communities={communities}
    />
  );
}
