"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

interface Admin {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: "super_admin" | "admin" | "editor";
  permissions: string[];
  profilePicture?: string;
  lastLogin: string;
  createdAt: string;
}

interface AdminContextType {
  admin: Admin | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  hasPermission: (permission: string) => boolean;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

// Mock admin data for demonstration
const mockAdmins = [
  {
    id: "admin-001",
    email: "admin@educonnect.africa",
    firstName: "John",
    lastName: "Doe",
    role: "super_admin" as const,
    permissions: ["all"],
    lastLogin: new Date().toISOString(),
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "admin-002",
    email: "editor@educonnect.africa",
    firstName: "Jane",
    lastName: "Smith",
    role: "editor" as const,
    permissions: ["universities.read", "universities.write", "scholarships.read", "scholarships.write"],
    lastLogin: new Date().toISOString(),
    createdAt: "2024-01-01T00:00:00Z",
  }
];

export function AdminProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing admin session
    const checkExistingSession = () => {
      try {
        if (typeof window !== 'undefined') {
          const storedAdmin = localStorage.getItem("educonnect_admin");
          if (storedAdmin) {
            const parsedAdmin = JSON.parse(storedAdmin);
            setAdmin(parsedAdmin);
          }
        }
      } catch (error) {
        console.error("Error parsing stored admin data:", error);
        if (typeof window !== 'undefined') {
          localStorage.removeItem("educonnect_admin");
        }
      } finally {
        setIsLoading(false);
      }
    };

    checkExistingSession();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock authentication
    const foundAdmin = mockAdmins.find(a => a.email === email);
    if (foundAdmin && password === "admin123") {
      const adminWithLogin = {
        ...foundAdmin,
        lastLogin: new Date().toISOString()
      };
      setAdmin(adminWithLogin);
      if (typeof window !== 'undefined') {
        localStorage.setItem("educonnect_admin", JSON.stringify(adminWithLogin));
      }
      setIsLoading(false);
      return true;
    }

    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setAdmin(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem("educonnect_admin");
    }
  };

  const hasPermission = (permission: string): boolean => {
    if (!admin) return false;
    if (admin.permissions.includes("all")) return true;
    return admin.permissions.includes(permission);
  };

  const value: AdminContextType = {
    admin,
    isAuthenticated: !!admin,
    isLoading,
    login,
    logout,
    hasPermission,
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
}
