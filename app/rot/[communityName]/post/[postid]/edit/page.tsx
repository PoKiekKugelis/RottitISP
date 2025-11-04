"use client"

import { use } from "react"
import { useRouter } from "next/navigation"
import PostForm from "@/components/PostForm"
import { getClientPostById, updateClientPost } from "@/lib/mock/posts"

type Props = {
  params: Promise<{
    communityName: string
    postid: string
  }>
}

export default function Page({ params }: Props) {
  const { communityName, postid } = use(params)
  const router = useRouter()
  const idNum = Number(postid)
  const post = getClientPostById(idNum)

  if (!post) {
    return (
      <main className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center">
          <h1 className="text-2xl font-semibold">Post not found</h1>
        </div>
      </main>
    )
  }

  function handleCancel() {
    router.push(`/rot/${communityName}`)
  }

  function handleSubmit(data: { title: string; content: string }) {
    updateClientPost(idNum, { title: data.title, content: data.content })
    router.push(`/rot/${communityName}`)
  }

  return (
    <main className="min-h-screen flex items-start justify-center p-6">
      <div className="max-w-3xl w-full">
        <h1 className="text-2xl font-semibold mb-4">Edit post in rot/{communityName}</h1>
        <PostForm initialTitle={post.title} initialContent={post.content} onCancel={handleCancel} onSubmit={handleSubmit} />
      </div>
    </main>
  )
}
