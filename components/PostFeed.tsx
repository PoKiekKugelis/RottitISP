import PostCard from "@/components/PostCard";

interface PostFeedProps {
  communityName?: string;
}

export default function PostFeed({ communityName }: PostFeedProps) {


  const AllPosts = [
    {
      id: 1,
      title: "Labuka!",
      author: "admin",
      community: "programming",
      votes: 420,
      comments: 69,
      content: "😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉"
    },
    {
      id: 2,
      title: "Labuka!",
      author: "admin",
      community: "itsjoever",
      votes: 420,
      comments: 69,
      content: "lolol😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉"
    },
    {
      id: 3,
      title: "Labuka!",
      author: "admin",
      community: "gaming",
      votes: 420,
      comments: 69,
      content: "😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉"
    },
    {
      id: 4,
      title: "Labuka!",
      author: "admin",
      community: "cooking",
      votes: 420,
      comments: 69,
      content: "😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉"
    },
    {
      id: 5,
      title: "Labuka!",
      author: "admin",
      community: "fitness",
      votes: 420,
      comments: 69,
      content: "😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉"
    },
    {
      id: 6,
      title: "Labuka!",
      author: "admin",
      community: "itsjoever",
      votes: 420,
      comments: 69,
      content: "😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉"
    },
  ];
  const posts = communityName
    ? AllPosts.filter(post => post.community == communityName)
    : AllPosts;

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <PostCard key={post.id} {...post} />
      ))}
    </div>
  );
}
