export type Post = {
  id: number
  title: string
  author: string
  community: string
  votes: number
  comments: number
  content: string
  file?: {
    name: string
    url: string
    type: string
    size: number
  }
}

const STORAGE_KEY = "rotti_posts_v1"

export const seedPosts: Post[] = [
  {
    id: 1,
    title: "Labuka!",
    author: "admin",
    community: "programming",
    votes: 420,
    comments: 69,
    content:
      "😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉",
  },
  {
    id: 2,
    title: "Labuka!",
    author: "admin",
    community: "itsjoever",
    votes: 420,
    comments: 69,
    content:
      "lolol😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉",
  },
  {
    id: 3,
    title: "Labuka!",
    author: "admin",
    community: "gaming",
    votes: 420,
    comments: 69,
    content:
      "😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉",
  },
  {
    id: 4,
    title: "Labuka!",
    author: "admin",
    community: "cooking",
    votes: 420,
    comments: 69,
    content:
      "😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉",
  },
  {
    id: 5,
    title: "Labuka!",
    author: "admin",
    community: "fitness",
    votes: 420,
    comments: 69,
    content:
      "😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉",
  },
  {
    id: 6,
    title: "Labuka!",
    author: "admin",
    community: "itsjoever",
    votes: 420,
    comments: 69,
    content:
      "😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉😉",
  },
]

function readStorage(): Post[] {
  try {
    if (typeof window === "undefined") return seedPosts
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return seedPosts
    return JSON.parse(raw) as Post[]
  } catch (e) {
    return seedPosts
  }
}

function writeStorage(posts: Post[]) {
  try {
    if (typeof window === "undefined") return
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts))
  } catch (e) {
    // ignore
  }
}

export function getClientPosts(): Post[] {
  return readStorage()
}

export function getClientPostById(id: number): Post | undefined {
  return readStorage().find((p) => p.id === id)
}

export function addClientPost(data: Partial<Post> & { title: string; content: string; community: string }): Post {
  const posts = readStorage()
  const id = Date.now()
  const post: Post = {
    id,
    title: data.title,
    author: data.author || "admin",
    community: data.community,
    votes: data.votes ?? 0,
    comments: data.comments ?? 0,
    content: data.content,
    file: data.file
  }
  const next = [post, ...posts]
  writeStorage(next)
  return post
}

export function updateClientPost(id: number, updates: Partial<Post>): Post | undefined {
  const posts = readStorage()
  const idx = posts.findIndex((p) => p.id === id)
  if (idx === -1) return undefined
  const updated = { ...posts[idx], ...updates }
  posts[idx] = updated
  writeStorage(posts)
  return updated
}

export function removeClientPost(id: number): boolean {
  const posts = readStorage()
  const next = posts.filter((p) => p.id !== id)
  writeStorage(next)
  return true
}
