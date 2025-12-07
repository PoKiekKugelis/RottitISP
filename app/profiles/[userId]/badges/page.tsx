import SetBadgesForm from "@/components/SetBadgesForm";
import { UserRepository } from "@/repositories/user.repository";
import { BadgeRepository } from "@/repositories/badge.repository";
import { getCurrentUser } from "@/lib/auth"
import { Badge } from "@/models/badge/entities/badge.entity"

export default async function SetBadgesPage({ params }: {
  params: Promise<{ userId: string }>
}) {
  const { userId } = await params;

  const user = await UserRepository.findOne(parseInt(userId));
  if (!user) {
    return (<div>User not found</div>)
  }
  const currentUser = await getCurrentUser();
  if (currentUser == null || currentUser?.id != user.id){
    return (<div>Unauthorized</div>)
  }
  const badges = await BadgeRepository.findAll();
  if (!badges) {
    return (<div>Badges not found</div>)
  }

  const userBadges = await BadgeRepository.findAllByUser(parseInt(userId));
  const allBadges = badges;

  return (
    <div className="flex-1">
      <SetBadgesForm user={user} allBadges={allBadges} userBadges={userBadges}></SetBadgesForm>
    </div>
  );
}