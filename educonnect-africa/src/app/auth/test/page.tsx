"use client";

import { useAuth } from "@/lib/context/AuthContext";
import { useSession } from "next-auth/react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function AuthTestPage() {
  const { user } = useAuth();
  const { data: session, status } = useSession();

  return (
    <MainLayout>
      <div className="container max-w-4xl mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">Authentication Test Page</h1>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Auth Context */}
          <Card>
            <CardHeader>
              <CardTitle>Auth Context</CardTitle>
            </CardHeader>
            <CardContent>
              {user ? (
                <div className="space-y-2">
                  <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>Role:</strong> <Badge>{user.role}</Badge></p>
                  <p><strong>Verified:</strong> {user.verified ? "Yes" : "No"}</p>
                </div>
              ) : (
                <p className="text-muted-foreground">No user in auth context</p>
              )}
            </CardContent>
          </Card>

          {/* NextAuth Session */}
          <Card>
            <CardHeader>
              <CardTitle>NextAuth Session</CardTitle>
            </CardHeader>
            <CardContent>
              <p><strong>Status:</strong> <Badge variant="outline">{status}</Badge></p>
              {session?.user ? (
                <div className="space-y-2 mt-4">
                  <p><strong>Name:</strong> {session.user.name}</p>
                  <p><strong>Email:</strong> {session.user.email}</p>
                  <p><strong>Role:</strong> <Badge>{session.user.role}</Badge></p>
                </div>
              ) : (
                <p className="text-muted-foreground mt-4">No session</p>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 flex gap-4">
          <Link href="/auth/signin">
            <Button variant="outline">Go to Sign In</Button>
          </Link>
          <Link href="/counseling">
            <Button>Test Counseling Page</Button>
          </Link>
          <Link href="/counseling/book/counselor-001">
            <Button variant="secondary">Test Booking (Auth Required)</Button>
          </Link>
        </div>
      </div>
    </MainLayout>
  );
}
