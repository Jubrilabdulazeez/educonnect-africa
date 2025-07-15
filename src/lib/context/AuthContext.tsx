"use client";

import { createContext, useContext, type ReactNode } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
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
  const { data: session, status } = useSession();
  const isLoading = status === "loading";

  // Transform NextAuth session to our User format
  const user: User | null = session?.user ? {
    id: session.user.id,
    email: session.user.email,
    firstName: session.user.name?.split(' ')[0] || '',
    lastName: session.user.name?.split(' ').slice(1).join(' ') || '',
    nationality: "Nigerian",
    verified: true,
    role: (session.user.role as 'Student' | 'Admin' | 'Counselor') || 'Student',
    createdAt: new Date().toISOString(),
    profilePicture: session.user.image || undefined,
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
  } : null;

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      return result?.ok || false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const register = async (userData: RegisterData): Promise<boolean> => {
    try {
      // In a real app, you'd make an API call to register the user
      // For now, we'll simulate registration
      console.log('Registering user:', userData);

      // After successful registration, automatically sign them in
      const result = await signIn("credentials", {
        email: userData.email,
        password: userData.password,
        redirect: false,
      });

      return result?.ok || false;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  const logout = async () => {
    await signOut({ redirect: false });
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
