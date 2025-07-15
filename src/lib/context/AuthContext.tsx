"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { User } from "@/lib/types/user";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const checkExistingSession = () => {
      try {
        if (typeof window !== 'undefined') {
          const savedUser = localStorage.getItem("educonnect_user");
          if (savedUser) {
            const parsedUser = JSON.parse(savedUser);
            setUser(parsedUser);
          }
        }
      } catch (error) {
        console.error("Error loading saved user:", error);
        if (typeof window !== 'undefined') {
          localStorage.removeItem("educonnect_user");
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

    // For demo purposes, accept any email/password combination
    if (email && password) {
      const mockUser: User = {
        id: "user-001",
        email,
        firstName: email.split("@")[0] || "User",
        lastName: "Demo",
        nationality: "Nigerian",
        verified: true,
        role: "Student",
        createdAt: new Date().toISOString(),
        qualifications: [],
        languageProficiencies: [
          {
            language: "English",
            level: "Native",
          }
        ],
        studyPreferences: {
          fieldsOfInterest: [],
          preferredCountries: [],
          preferredDegreeTypes: [],
          preferredLanguages: ["English"],
          budgetRange: {
            min: 0,
            max: 20000,
          },
          accommodationPreference: "No Preference",
          startDate: "Flexible",
          studyMode: "No Preference",
          scholarshipRequired: false,
        },
        savedUniversities: [],
        applications: [],
        counselingSessions: [],
      };

      setUser(mockUser);
      if (typeof window !== 'undefined') {
        localStorage.setItem("educonnect_user", JSON.stringify(mockUser));
      }
      setIsLoading(false);
      return true;
    }

    setIsLoading(false);
    return false;
  };

  const register = async (userData: RegisterData): Promise<boolean> => {
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    const newUser: User = {
      id: `user-${Date.now()}`,
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      nationality: "Nigerian",
      verified: false,
      role: "Student",
      createdAt: new Date().toISOString(),
      qualifications: [],
      languageProficiencies: [
        {
          language: "English",
          level: "Native",
        }
      ],
      studyPreferences: {
        fieldsOfInterest: [],
        preferredCountries: [],
        preferredDegreeTypes: [],
        preferredLanguages: ["English"],
        budgetRange: {
          min: 0,
          max: 20000,
        },
        accommodationPreference: "No Preference",
        startDate: "Flexible",
        studyMode: "No Preference",
        scholarshipRequired: false,
      },
      savedUniversities: [],
      applications: [],
      counselingSessions: [],
    };

    setUser(newUser);
    if (typeof window !== 'undefined') {
      localStorage.setItem("educonnect_user", JSON.stringify(newUser));
    }
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem("educonnect_user");
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
