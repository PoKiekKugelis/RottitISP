"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

function NavigateToLogin(){
    window.location.href='/login';
}

export default function Logout(){
    return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-y-10 min-w-screen">
            <p className="font-sans text-3xl font-semibold text-stone-700">
                You will be <span className="text-fuchsia-800">logged out</span>. Are you sure you want to continue?
            </p>
            <div className="flex flex-row items-center justify-center w-1/2 gap-x-5">
                <Button onClick={NavigateToLogin}>Yes</Button>
                <Link href="/profile"><Button>No, go back</Button></Link>
            </div>
        </div>
    );
}