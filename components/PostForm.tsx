"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

type Props = {
  initialTitle?: string
  initialContent?: string
  onCancel?: () => void
  onSubmit: (data: { title: string; content: string }) => void
}

export default function PostForm({ initialTitle = "", initialContent = "", onCancel, onSubmit }: Props) {
  const [title, setTitle] = useState(initialTitle)
  const [content, setContent] = useState(initialContent)

  function handleSubmit(e?: React.FormEvent) {
    if (e) e.preventDefault()
    onSubmit({ title, content })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Title</label>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Post title" className="mb-2" />

        <label className="block text-sm font-medium mb-2">Content</label>
        <Textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Type your post here..." className="min-h-[120px]" />
      </div>

      <div className="flex gap-2 justify-end">
        <Button variant="outline" type="button" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Submit</Button>
      </div>
    </form>
  )
}
