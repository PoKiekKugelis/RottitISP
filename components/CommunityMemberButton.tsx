"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";


interface CommunityMemberButtonProps {
  communityId: number;
  communityName: string;
  isMember: boolean;
}

export function CommunityMemberButton({
  communityId,
  communityName,
  isMember: initialIsMember
}: CommunityMemberButtonProps) {
  const [isMember, setIsMember] = useState(initialIsMember)
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    try {
      const method = isMember ? "DELETE" : "POST";
      const response = await fetch(`/api/communities/${communityId}/members`, {
        method
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error)
        return
      }
      setIsMember(!isMember);
      isMember ? router.push(`/`) : router.push(`/rot/${communityName}`);
    } catch (error: any) {
      console.error(error)
    }
    finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Button
        onClick={() => setOpen(!open)}
        disabled={loading}
        className="w-full cursor-pointer"
      >
        {isMember ? "Leave Community" : "Join Community"}
      </Button>
      <Dialog open={open} onOpenChange={setOpen} >
        <DialogContent className="[&>button]:hidden">
          <DialogHeader>
            <DialogTitle>
              {isMember ? "Leave Community" : "Join Community"}
            </DialogTitle>
            {error && (<div className="text-red-500 text-sm text-center">{error}</div>)}
            <DialogDescription>Are you sure you want to {isMember ? "leave" : "join"} {communityName}</DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button className="cursor-pointer" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button className="cursor-pointer" variant="default" onClick={handleSubmit} disabled={loading}>
              yes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </>
  )
}
