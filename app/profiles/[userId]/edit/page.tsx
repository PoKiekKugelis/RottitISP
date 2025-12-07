import EditProfileForm from "@/components/EditProfileForm";
import { UserRepository } from "@/repositories/user.repository";
import { getCurrentUser } from "@/lib/auth"

export default async function EditProfilePage({ params }: {
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

  return (
    <div className="flex-1">
      <EditProfileForm user={user}></EditProfileForm>
    </div>
  );
}