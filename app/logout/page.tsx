"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { UserService } from "@/services/user.service";

async function NavigateToLogin() {
  try {
    //Sets online status to false
    const response = await fetch(`/api/changeStatus`, {
      method: 'PUT',
      headers: { "Content-Type": "application/json" }
    })
    const result = await response.json()
    console.log(result)

    if (!response.ok) {
      console.log(response);
      return;
    }
  }
  catch (error: any) {
    console.error(error)
  }
  await UserService.logout();
  window.location.href = '/login';
}

export default function Logout() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-y-10 min-w-screen">
      <p className="font-sans text-3xl font-semibold text-stone-700">
        You will be <span className="text-fuchsia-800">logged out</span>. Are you sure you want to continue?
      </p>
      <div className="flex flex-row items-center justify-center w-1/2 gap-x-5">
        <Button onClick={NavigateToLogin}>Yes</Button>
        <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}>
              No, go back
            </Button>
      </div>
    </div>
  );
}
