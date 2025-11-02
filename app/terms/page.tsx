import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Terms of Service - Rottit",
  description: "Terms of Service for Rottit",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary/20 to-primary/20">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8">
          <Link href="/register">
            <div className="hover:underline">← Back to Home</div>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">Terms of Service</CardTitle>
          </CardHeader>
          <CardContent>
            <h2>Parduodi savo sielą krč</h2>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
