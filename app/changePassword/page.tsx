"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Profile() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [newPass, setNewPass] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href='/editProfile';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br flex items-center justify-center px-4 from-secondary/20 to-primary/20">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary">
            Change Password
          </h1>
        </div>

        <Card>
          <CardContent>
            <div className="text-left text-lg">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Please write your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="username">Current Password</Label>
                <Input
                  id="pass"
                  type="password"
                  placeholder="Please write your current password"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="newPass">New Password</Label>
                <Input
                  id="newPass"
                  type="password"
                  placeholder="Please write a new password"
                  value={newPass}
                  onChange={(e) => setNewPass(e.target.value)}
                />
              </div>

              <Button type="submit" className="w-full">
                Save
              </Button>
            </form>
            <br></br>
            <Link href="/editProfile"><Button>Cancel</Button></Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
