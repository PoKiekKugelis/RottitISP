"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ChangePasswordPage() {
  const searchParams = useSearchParams();
  const tokenFromEmail = searchParams.get("token");

  const [email, setEmail] = useState("");
  const [current, setCurrent] = useState("");
  const [newPass, setNewPass] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");

  // If link contains ?token=xxxx → confirm password
  useEffect(() => {
    if (!tokenFromEmail) return;

    async function confirmPassword() {
      setStatus("Confirming password...");
      const res = await fetch("/api/change-password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: tokenFromEmail })
      });

      const data = await res.json();
      if (res.ok) {
        setStatus("Your password has been changed successfully!");
      } else {
        setStatus(data.error || "Something went wrong.");
      }
    }

    confirmPassword();
  }, [tokenFromEmail]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setStatus("");

    const res = await fetch("/api/change-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        currentPassword: current,
        newPassword: newPass
      })
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error);
    } else {
      setStatus("Confirmation email sent. Check your inbox.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br flex items-center justify-center px-4 from-secondary/20 to-primary/20">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary">Change Password</h1>
        </div>

        <Card>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">

              {error && <div className="text-red-500 text-center">{error}</div>}
              {status && <div className="text-green-600 text-center">{status}</div>}

              <div className="space-y-2">
                <Label>Email</Label>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>

              <div className="space-y-2">
                <Label>Current Password</Label>
                <Input type="password" value={current} onChange={(e) => setCurrent(e.target.value)} />
              </div>

              <div className="space-y-2">
                <Label>New Password</Label>
                <Input type="password" value={newPass} onChange={(e) => setNewPass(e.target.value)} />
              </div>

              <Button type="submit" className="w-full">
                Save
              </Button>
            </form>

            <br />
            <Link href="/"><Button>Cancel</Button></Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
