"use client";

import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Building2,
  Users,
  GraduationCap,
  FileText,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Eye,
  Plus,
  AlertCircle
} from "lucide-react";
import Link from "next/link";

// Mock data for dashboard
const dashboardStats = {
  universities: { total: 127, change: +12, changeType: "increase" },
  students: { total: 2456, change: +156, changeType: "increase" },
  scholarships: { total: 89, change: +5, changeType: "increase" },
  applications: { total: 1234, change: -23, changeType: "decrease" },
  revenue: { total: 45600, change: +2300, changeType: "increase" },
  pendingReviews: { total: 34, change: +8, changeType: "increase" }
};

const recentActivity = [
  {
    id: 1,
    type: "university",
    title: "New university added",
    description: "University of Rwanda was added to the database",
    time: "2 hours ago",
    status: "success"
  },
  {
    id: 2,
    type: "application",
    title: "Application submitted",
    description: "John Doe submitted application to University of Ghana",
    time: "4 hours ago",
    status: "info"
  },
  {
    id: 3,
    type: "scholarship",
    title: "Scholarship updated",
    description: "MASTERCARD Foundation Scholarship details updated",
    time: "6 hours ago",
    status: "warning"
  },
  {
    id: 4,
    type: "user",
    title: "New student registered",
    description: "Sarah Johnson completed her profile",
    time: "8 hours ago",
    status: "success"
  }
];

const quickActions = [
  {
    title: "Add University",
    description: "Add a new university to the database",
    href: "/admin/universities/new",
    icon: Building2,
    color: "bg-blue-500"
  },
  {
    title: "Add Scholarship",
    description: "Create a new scholarship opportunity",
    href: "/admin/scholarships/new",
    icon: GraduationCap,
    color: "bg-green-500"
  },
  {
    title: "Review Applications",
    description: "Review pending application submissions",
    href: "/admin/applications?status=pending",
    icon: FileText,
    color: "bg-orange-500"
  },
  {
    title: "User Management",
    description: "Manage student accounts and permissions",
    href: "/admin/students",
    icon: Users,
    color: "bg-purple-500"
  }
];

export default function AdminDashboardPage() {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return "bg-green-100 text-green-600";
      case "warning":
        return "bg-orange-100 text-orange-600";
      case "info":
        return "bg-blue-100 text-blue-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-lg p-6 text-white">
          <h2 className="text-2xl font-bold mb-2">Welcome to EduConnect Africa Admin</h2>
          <p className="text-green-100">
            Manage universities, students, and applications from your centralized dashboard.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Universities</p>
                  <p className="text-3xl font-bold">{dashboardStats.universities.total}</p>
                  <div className="flex items-center mt-2">
                    {dashboardStats.universities.changeType === "increase" ? (
                      <TrendingUp className="h-4 w-4 text-green-600" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-600" />
                    )}
                    <span className={`text-sm ml-1 ${
                      dashboardStats.universities.changeType === "increase"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}>
                      +{dashboardStats.universities.change} this month
                    </span>
                  </div>
                </div>
                <Building2 className="h-12 w-12 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Students</p>
                  <p className="text-3xl font-bold">{dashboardStats.students.total}</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-600 ml-1">
                      +{dashboardStats.students.change} this month
                    </span>
                  </div>
                </div>
                <Users className="h-12 w-12 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Scholarships</p>
                  <p className="text-3xl font-bold">{dashboardStats.scholarships.total}</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-600 ml-1">
                      +{dashboardStats.scholarships.change} this month
                    </span>
                  </div>
                </div>
                <GraduationCap className="h-12 w-12 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Applications</p>
                  <p className="text-3xl font-bold">{dashboardStats.applications.total}</p>
                  <div className="flex items-center mt-2">
                    <TrendingDown className="h-4 w-4 text-red-600" />
                    <span className="text-sm text-red-600 ml-1">
                      {dashboardStats.applications.change} this month
                    </span>
                  </div>
                </div>
                <FileText className="h-12 w-12 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Revenue</p>
                  <p className="text-3xl font-bold">{formatCurrency(dashboardStats.revenue.total)}</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-600 ml-1">
                      +{formatCurrency(dashboardStats.revenue.change)} this month
                    </span>
                  </div>
                </div>
                <DollarSign className="h-12 w-12 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pending Reviews</p>
                  <p className="text-3xl font-bold">{dashboardStats.pendingReviews.total}</p>
                  <div className="flex items-center mt-2">
                    <AlertCircle className="h-4 w-4 text-orange-600" />
                    <span className="text-sm text-orange-600 ml-1">
                      +{dashboardStats.pendingReviews.change} this week
                    </span>
                  </div>
                </div>
                <Eye className="h-12 w-12 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Common administrative tasks and shortcuts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {quickActions.map((action) => (
                <Link key={action.title} href={action.href}>
                  <div className="flex items-center p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                    <div className={`p-2 rounded-full ${action.color} text-white mr-4`}>
                      <action.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">{action.title}</h4>
                      <p className="text-sm text-muted-foreground">{action.description}</p>
                    </div>
                    <Plus className="h-5 w-5 text-muted-foreground" />
                  </div>
                </Link>
              ))}
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Latest system events and user actions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className={`p-1 rounded-full ${getStatusIcon(activity.status)}`}>
                      <div className="h-2 w-2 rounded-full bg-current" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{activity.title}</p>
                      <p className="text-sm text-muted-foreground">{activity.description}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <Link href="/admin/activity">
                  <Button variant="outline" className="w-full">
                    View All Activity
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
