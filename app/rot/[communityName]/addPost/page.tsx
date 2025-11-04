"use client"

import { use } from "react"
import { useRouter } from "next/navigation"
import { addClientPost } from "@/lib/mock/posts"
import PostForm from "@/components/PostForm"

type Props = {
  params: Promise<{
    communityName: string
  }>
}

export default function Page({ params }: Props) {
  const { communityName } = use(params)
  const router = useRouter()

  function handleCancel() {
    router.push(`/rot/${communityName}`)
  }

  function handleSubmit(data: { title: string; content: string }) {
    // Add to client mock storage and navigate back to community
    const created = addClientPost({ title: data.title, content: data.content, community: communityName })
    // Navigate to the new post's detail page
    router.push(`/rot/${communityName}/post/${created.id}`)
  }

  return (
    <main className="min-h-screen flex items-start justify-center p-6">
      <div className="max-w-3xl w-full">
        <h1 className="text-2xl font-semibold mb-4">Create a post in rot/{communityName}</h1>

        <PostForm initialTitle={""} initialContent={""} onCancel={handleCancel} onSubmit={handleSubmit} />
      </div>
    </main>
  )
}
