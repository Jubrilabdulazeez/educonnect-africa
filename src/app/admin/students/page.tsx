"use client";

import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Filter,
  Download,
  Mail,
  Phone,
  CheckCircle,
  XCircle,
  Clock
} from "lucide-react";

// Mock student data
const mockStudents = [
  {
    id: "student-001",
    firstName: "Adebayo",
    lastName: "Johnson",
    email: "adebayo.johnson@email.com",
    phone: "+234 803 123 4567",
    state: "Lagos",
    city: "Lagos",
    verified: true,
    profileCompletion: 85,
    applications: 3,
    lastLogin: "2024-12-10T08:30:00Z",
    createdAt: "2024-11-15T00:00:00Z",
    qualifications: ["WAEC", "NECO"],
    savedUniversities: 8
  },
  {
    id: "student-002",
    firstName: "Chioma",
    lastName: "Okafor",
    email: "chioma.okafor@email.com",
    phone: "+234 812 987 6543",
    state: "Anambra",
    city: "Awka",
    verified: true,
    profileCompletion: 92,
    applications: 5,
    lastLogin: "2024-12-09T14:20:00Z",
    createdAt: "2024-10-20T00:00:00Z",
    qualifications: ["WAEC"],
    savedUniversities: 12
  },
  {
    id: "student-003",
    firstName: "Kemi",
    lastName: "Adeleke",
    email: "kemi.adeleke@email.com",
    phone: "+234 806 555 1234",
    state: "Osun",
    city: "Osogbo",
    verified: false,
    profileCompletion: 45,
    applications: 1,
    lastLogin: "2024-12-08T16:45:00Z",
    createdAt: "2024-12-01T00:00:00Z",
    qualifications: [],
    savedUniversities: 3
  },
  {
    id: "student-004",
    firstName: "Ibrahim",
    lastName: "Musa",
    email: "ibrahim.musa@email.com",
    phone: "+234 809 444 7890",
    state: "Kano",
    city: "Kano",
    verified: true,
    profileCompletion: 78,
    applications: 2,
    lastLogin: "2024-12-07T11:15:00Z",
    createdAt: "2024-11-28T00:00:00Z",
    qualifications: ["WAEC", "NECO"],
    savedUniversities: 6
  }
];

export default function AdminStudentsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedState, setSelectedState] = useState("all");

  // Get unique states for filter
  const states = Array.from(new Set(mockStudents.map(student => student.state))).sort();

  const filteredStudents = mockStudents.filter(student => {
    const matchesSearch =
      student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesState = selectedState === "all" || student.state === selectedState;
    return matchesSearch && matchesState;
  });

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getCompletionColor = (percentage: number) => {
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 50) return "text-yellow-600";
    return "text-red-600";
  };

  const handleDeleteStudent = (studentId: string) => {
    console.log("Delete student:", studentId);
  };

  const handleContactStudent = (email: string) => {
    window.open(`mailto:${email}`, '_blank');
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Students</h1>
            <p className="text-muted-foreground">
              Manage student accounts and profiles
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{mockStudents.length}</div>
              <p className="text-sm text-muted-foreground">Total Students</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">
                {mockStudents.filter(s => s.verified).length}
              </div>
              <p className="text-sm text-muted-foreground">Verified</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">
                {mockStudents.filter(s => s.profileCompletion >= 80).length}
              </div>
              <p className="text-sm text-muted-foreground">Complete Profiles</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">
                {mockStudents.reduce((sum, s) => sum + s.applications, 0)}
              </div>
              <p className="text-sm text-muted-foreground">Total Applications</p>
            </CardContent>
          </Card>
        </div>

        {/* Students Management */}
        <Card>
          <CardHeader>
            <CardTitle>Student Management</CardTitle>
            <CardDescription>
              View and manage student accounts and profiles
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search students..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="w-48">
                <select
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  className="w-full h-10 px-3 border border-input bg-background text-sm rounded-md"
                >
                  <option value="all">All States</option>
                  {states.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>

            {/* Students Table */}
            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Profile</TableHead>
                    <TableHead>Activity</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src="" alt={student.firstName} />
                            <AvatarFallback>
                              {getInitials(student.firstName, student.lastName)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">
                              {student.firstName} {student.lastName}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              ID: {student.id.slice(-3)}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center text-sm">
                            <Mail className="h-3 w-3 mr-1 text-muted-foreground" />
                            {student.email}
                          </div>
                          <div className="flex items-center text-sm">
                            <Phone className="h-3 w-3 mr-1 text-muted-foreground" />
                            {student.phone}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{student.city}</div>
                          <div className="text-sm text-muted-foreground">{student.state}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <Badge variant={student.verified ? "default" : "secondary"}>
                            {student.verified ? (
                              <>
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Verified
                              </>
                            ) : (
                              <>
                                <XCircle className="h-3 w-3 mr-1" />
                                Unverified
                              </>
                            )}
                          </Badge>
                          <div className="text-xs text-muted-foreground">
                            {student.applications} applications
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className={`font-medium ${getCompletionColor(student.profileCompletion)}`}>
                            {student.profileCompletion}%
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {student.qualifications.length} qualifications
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="flex items-center text-sm">
                            <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
                            {formatDate(student.lastLogin)}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Joined {formatDate(student.createdAt)}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              View Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleContactStudent(student.email)}>
                              <Mail className="mr-2 h-4 w-4" />
                              Contact Student
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Account
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={() => handleDeleteStudent(student.id)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {filteredStudents.length === 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No students found matching your criteria.</p>
              </div>
            )}

            {/* Pagination placeholder */}
            <div className="flex items-center justify-between mt-6">
              <div className="text-sm text-muted-foreground">
                Showing {filteredStudents.length} of {mockStudents.length} students
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm" disabled>
                  Next
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
