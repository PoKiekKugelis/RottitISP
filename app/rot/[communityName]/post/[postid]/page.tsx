"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { removeClientPost, getClientPostById } from "@/lib/mock/posts";

type Props = {
  params: Promise<{
    communityName: string;
    postid: string;
  }>;
};

export default function Page({ params }: Props) {
  const { communityName, postid } = use(params);
  const router = useRouter();

  const idNum = Number(postid);
  const post = getClientPostById(idNum);

  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState(""); // top-level
  const [replyText, setReplyText] = useState("");   // replies
  const [replyTo, setReplyTo] = useState<number | null>(null);

  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isModerator, setIsModerator] = useState(false);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState("");

  const [error, setError] = useState("");
  const [translatedText, setTranslatedText] = useState("")

  useEffect(() => {
    fetch(`/api/comments?postId=${idNum}`)
      .then(res => res.json())
      .then(setComments);

    fetch("/api/comments/me")
      .then(res => res.json())
      .then(setCurrentUser);

    fetch(`/api/comments/moderator?community=${communityName}`)
      .then(res => res.json())
      .then(data => setIsModerator(data.isModerator));
  }, [idNum, communityName]);

  if (!post) {
    return (
      <main className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center">
          <h1 className="text-2xl font-semibold">Post not found</h1>
        </div>
      </main>
    );
  }

  function handleRemove() {
    removeClientPost(idNum);
    router.push(`/rot/${communityName}`);
  }

  function buildTree(parentId: number | null) {
    return comments
      .filter(c => c.parentId === parentId)
      .map(c => ({
        ...c,
        replies: buildTree(c.id)
      }));
  }

  async function submitComment(parentId: number | null = null) {
    const text = parentId ? replyText : newComment;
    if (!text.trim()) return;

    await fetch("/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: text,
        postId: idNum,
        parentId
      })
    });

    setNewComment("");
    setReplyText("");
    setReplyTo(null);
    location.reload();
  }

  async function saveEdit(commentId: number) {
    await fetch(`/api/comments/${commentId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: editingText })
    });

    setEditingId(null);
    setEditingText("");
    location.reload();
  }

  async function handleTranslate(commentId: number, originalText: string) {
    const response = await fetch("/api/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: originalText })
    });

    const result = await response.json();

    if (result?.error) {
      setError(result.error);
      return;
    }

    // Update the flat comments array by matching id (not commentId)
    setComments(prev =>
      prev.map(c =>
        c.id === commentId
          ? { ...c, translatedContent: result.translatedText }
          : c
      )
    );
  }
  useEffect(() => {
    console.log("Comments changed:", comments);
  }, [comments]);

  function renderComments(list: any[], depth = 0) {
    return list.map(comment => (
      <div key={comment.id} style={{ marginLeft: depth * 20 }}>
        <div className="border p-3 rounded-md mt-3">
          <div className="text-sm text-muted-foreground">
            u/{comment.creator.username} •{" "}
            {comment.createdAt.slice(0, 10)}
            {comment.editStatus && " • (edited)"}
          </div>

          {/* CONTENT / EDIT MODE */}
          {editingId === comment.id ? (
            <>
              <textarea
                className="w-full border p-2 mt-2"
                value={editingText}
                onChange={e => setEditingText(e.target.value)}
              />
              <div className="flex gap-2 mt-2 text-sm">
                <button onClick={() => saveEdit(comment.id)}>Save</button>
                <button onClick={() => setEditingId(null)}>Cancel</button>
              </div>
            </>
          ) : (
            <p className="mt-1">{comment.translatedContent ?? comment.content}</p>
          )}

          {/* ACTIONS */}
          <div className="flex gap-3 text-sm mt-2">
            <button
              onClick={() => {
                setReplyTo(comment.id);
                setReplyText("");
              }}
            >
              Reply
            </button>

            {/* EDIT — creator only */}
            {currentUser?.id === comment.creator.id && (
              <button
                onClick={() => {
                  setEditingId(comment.id);
                  setEditingText(comment.content);
                }}
              >
                Edit
              </button>
            )}

            {/* DELETE — moderator only */}
            {isModerator && (
              <button
                onClick={async () => {
                  if (!confirm("Delete this comment?")) return;
                  await fetch(`/api/comments/${comment.id}`, {
                    method: "DELETE"
                  });
                  location.reload();
                }}
              >
                Delete
              </button>
            )}
            {/* TRANSLATE — authenticated user only */}
            <button
              onClick={() => {
                handleTranslate(comment.id, comment.content)
              }}
            >
              Translate
            </button>
          </div>

          {/* REPLY */}
          {replyTo === comment.id && (
            <div className="mt-2">
              <textarea
                className="w-full border p-2"
                placeholder="Reply..."
                value={replyText}
                onChange={e => setReplyText(e.target.value)}
              />
              <button
                className="text-sm mt-1"
                onClick={() => submitComment(comment.id)}
              >
                Post reply
              </button>
            </div>
          )}
        </div>

        {comment.replies && renderComments(comment.replies, depth + 1)}
      </div>
    ));
  }

  return (
    <main className="min-h-screen flex items-start justify-center p-6">
      <div className="max-w-3xl w-full">
        {/* POST — unchanged */}
        <div className="mb-4 flex items-center justify-between gap-4">
          <a
            href={`/rot/${post.community}`}
            className="text-sm text-primary/90 hover:underline"
          >
            rot/{post.community}
          </a>
          <div className="flex gap-2">
            <Link
              href={`/rot/${communityName}/post/${post.id}/edit`}
              className="text-sm"
            >
              <button className="px-3 py-1 border rounded-md">
                Edit Post
              </button>
            </Link>
            <button
              onClick={handleRemove}
              className="px-3 py-1 border rounded-md bg-red-600 text-white"
            >
              Remove Post
            </button>
          </div>
        </div>

        <h1 className="text-3xl font-bold mb-3">{post.title}</h1>
        <div className="text-sm text-muted-foreground mb-6">
          Posted by u/{post.author}
        </div>
        <article className="prose dark:prose-invert text-lg">
          {post.content}
        </article>

        {/* COMMENTS */}
        <hr className="my-8" />
        <h2 className="text-xl font-semibold mb-3">Comments</h2>

        <textarea
          className="w-full border p-2"
          placeholder="Write a comment..."
          value={newComment}
          onChange={e => setNewComment(e.target.value)}
        />
        <button
          className="mt-2 px-3 py-1 border rounded-md"
          onClick={() => submitComment(null)}
        >
          Post comment
        </button>

        <div className="mt-6">{renderComments(buildTree(null))}</div>
      </div>
    </main>
  );
}
