"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation"

export default function Login() {
  const router = useRouter();
  const [loginName, setLoginName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const result = await signIn("credentials", {
        loginName: loginName,
        password: password,
        redirect: false,
      })
      if (result?.error) {
        setError("Invalid credentials")
        return;
      } else if (result?.ok) {
        router.push("/")
      }
    } catch (error: any) {
      console.error(error)
    }
    finally {
      setIsLoading(false)
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br flex items-center justify-center px-4 from-secondary/20 to-primary/20">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link href="/" className="text-4xl font-bold text-primary hover:text-primary/80">
            Rottit
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Welcome back</CardTitle>
            <CardDescription>Sign in to your account to continue</CardDescription>
          </CardHeader>
          {error && (<div className="text-red-500 text-sm text-center">{error}</div>)}
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="loginName">Login name</Label>
                <Input
                  name="loginName"
                  type="loginName"
                  placeholder="login name"
                  value={loginName}
                  onChange={(e) => setLoginName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <div>
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" className="w-full">
                {isLoading ? "Loading..." : "Sign up"}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm">
              Don't have an account? {" "}
              <Link href="/register" className="text-primary hover:underline font-medium">
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
