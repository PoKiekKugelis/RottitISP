import PostCard from "@/components/PostCard";

export default function PostFeed() {

  const posts = [
    {
      id: 1,
      title: "Labuka!",
      author: "admin",
      community: "itsjoever",
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
      content: "😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉"
    },
    {
      id: 3,
      title: "Labuka!",
      author: "admin",
      community: "itsjoever",
      votes: 420,
      comments: 69,
      content: "😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉"
    },
    {
      id: 4,
      title: "Labuka!",
      author: "admin",
      community: "itsjoever",
      votes: 420,
      comments: 69,
      content: "😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉"
    },
    {
      id: 5,
      title: "Labuka!",
      author: "admin",
      community: "itsjoever",
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

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <PostCard key={post.id} {...post} />
      ))}
    </div>
  );
}
