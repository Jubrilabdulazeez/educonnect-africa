"use client";

import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, Lock } from "lucide-react";
import { toast } from "sonner";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    // Check if admin is already authenticated
    const checkAdminAuth = () => {
      try {
        if (typeof window !== 'undefined') {
          const adminAuth = localStorage.getItem("educonnect_admin_auth");
          if (adminAuth === "authenticated") {
            setIsAuthenticated(true);
          }
        }
      } catch (error) {
        console.error("Error checking admin authentication:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAdminAuth();
  }, []);

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simple demo authentication - in production, this would be a secure API call
    if (loginData.username === "admin" && loginData.password === "admin123") {
      if (typeof window !== 'undefined') {
        localStorage.setItem("educonnect_admin_auth", "authenticated");
      }
      setIsAuthenticated(true);
      toast.success("Admin login successful!");
    } else {
      toast.error("Invalid admin credentials");
    }
    setIsLoading(false);
  };

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem("educonnect_admin_auth");
    }
    setIsAuthenticated(false);
    toast.success("Logged out successfully");
  };

  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
        </div>
      </MainLayout>
    );
  }

  if (!isAuthenticated) {
    return (
      <MainLayout>
        <div className="min-h-screen flex items-center justify-center bg-gradient-green-light">
          <Card className="w-full max-w-md">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                <h1 className="text-2xl font-bold">Admin Access</h1>
                <p className="text-muted-foreground">
                  Enter your admin credentials to continue
                </p>
              </div>

              <form onSubmit={handleAdminLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    type="text"
                    value={loginData.username}
                    onChange={(e) => setLoginData(prev => ({ ...prev, username: e.target.value }))}
                    placeholder="Admin username"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={loginData.password}
                    onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                    placeholder="Admin password"
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Authenticating...
                    </>
                  ) : (
                    <>
                      <Lock className="h-4 w-4 mr-2" />
                      Sign In
                    </>
                  )}
                </Button>
              </form>

              <div className="mt-6 p-4 bg-muted/30 rounded-md">
                <p className="text-sm text-muted-foreground">
                  <strong>Demo Credentials:</strong><br />
                  Username: admin<br />
                  Password: admin123
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-muted/10">
        <div className="bg-gradient-green text-white p-4">
          <div className="container flex justify-between items-center">
            <h1 className="text-xl font-bold">EduConnect Africa - Admin Dashboard</h1>
            <Button variant="secondary" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
        {children}
      </div>
    </MainLayout>
  );
}
