
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AvatarImg from "@/components/Avatar";
import { UserRepository } from "@/repositories/user.repository";

export default async function ProfilePage({ params }: {
  params: Promise<{ userId: string }>
}) {
  /*const [username, setUsername] = useState("Nickas");
  const [country, setCountry] = useState("Lithuania");
  const [birthDate, setBirthDate] = useState("2000-01-01");
  const [karmaPoints, setKarmaPoints] = useState(1000);
  const [bio, setBio] = useState("Ay, Im walking 'ere");
  const [creationDate, setCreationDate] = useState("2025-11-02");
  const [onlineStatus, setOnlineStatus] = useState(false);
  */
  const { userId } = await params;
  const imageSrc = "https://github.com/shadcn.png";
  const imageAlt = "@shadcn";
  const imageFallBack = "CN";

  const user = await UserRepository.findOne(parseInt(userId))
  if (!user) {
    return (<div>User not found</div>)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br flex items-center justify-center px-4 from-secondary/20 to-primary/20">
      <div className="max-w-md w-full">
        <div className="flex text-center gap-x-5">
          <div className="my-auto gap-x-5">
            <Link href="/">
              <div className="hover:underline">← Back to Home</div>
            </Link>
          </div>
          <div className="gap-x-5 mb-2">
            <h1 className="text-4xl font-bold text-primary">
              My Profile
            </h1>
          </div>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-row items-left justify-left w-1/2 gap-x-5">
              <CardTitle className="text-2xl">{user.username}</CardTitle>
              <AvatarImg src={imageSrc} alt={imageAlt} fallBack={imageFallBack} size={"size-9"} />
            </div>
            <CardDescription>
              <div className="flex gap-2 items-left justify-left">
                <p>Created at {user.createdAt.toLocaleString("lt-LT", { year: "numeric", month: "numeric", day: "numeric" })}</p>
                {user.status ? <p className="text-green-500">•Online</p> : <p className="text-red-500">•Offline</p>}
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-left text-lg">
              <div className="flex flex-row items-left justify-left w-1/2 gap-x-3">
                <h1>Country:</h1>
                <p>{user.country}</p>
              </div>
              <div className="flex flex-row items-left justify-left gap-x-3">
                <h1>Date of birth:</h1>
                <p>{user.birthdate.toLocaleString("lt-LT", { year: "numeric", month: "numeric", day: "numeric" })}</p>
              </div>
              <div className="flex flex-row items-left justify-left w-1/2 gap-x-3">
                <h1>Karma points:</h1>
                <p>{user.karma}</p>
              </div>
              <div className="flex flex-row items-left justify-left gap-x-3">
                <h1>Description:</h1>
                <p>{user.bio}</p>
              </div>
              <br></br>
              <div className="flex gap-3">
                <Link href="/editProfile"><Button>Edit Profile</Button></Link>
                <Link href="/badges"><Button>Set Badges</Button></Link>
                <div className="ml-auto">
                  <Link href="/logout"><Button className="float-right">Log out</Button></Link>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
