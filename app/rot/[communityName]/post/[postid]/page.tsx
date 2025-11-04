"use client"

import { use } from "react";
import Link from "next/link"
import { useRouter } from "next/navigation"
import { removeClientPost, getClientPostById } from "@/lib/mock/posts"

type Props = {
        params: Promise<{
                communityName: string;
                postid: string;
        }>;
};

export default function Page({ params }: Props) {
        const { communityName, postid } = use(params);
        const router = useRouter()

        const idNum = Number(postid)
        const post = getClientPostById(idNum)

        if (!post) {
            return (
                <main className="min-h-screen flex items-center justify-center p-6">
                    <div className="text-center">
                        <h1 className="text-2xl font-semibold">Post not found</h1>
                        <p className="text-sm text-muted-foreground mt-2">
                            No post with id <strong>{postid}</strong> in community <strong>{communityName}</strong>.
                        </p>
                    </div>
                </main>
            )
        }

        function handleRemove() {
            removeClientPost(idNum)
            router.push(`/rot/${communityName}`)
        }

        return (
            <main className="min-h-screen flex items-start justify-center p-6">
                <div className="max-w-3xl w-full">
                    <div className="mb-4 flex items-center justify-between gap-4">
                        <a href={`/rot/${post.community}`} className="text-sm text-primary/90 hover:underline">
                            rot/{post.community}
                        </a>
                        <div className="flex gap-2">
                            <Link href={`/rot/${communityName}/post/${post.id}/edit`} className="text-sm">
                                <button className="px-3 py-1 border rounded-md">Edit Post</button>
                            </Link>
                            <button onClick={handleRemove} className="px-3 py-1 border rounded-md bg-red-600 text-white">Remove Post</button>
                        </div>
                    </div>

                    <h1 className="text-3xl font-bold mb-3">{post.title}</h1>

                    <div className="text-sm text-muted-foreground mb-6">Posted by u/{post.author}</div>

                    <article className="prose dark:prose-invert text-lg">{post.content}</article>
                </div>
            </main>
        )
}