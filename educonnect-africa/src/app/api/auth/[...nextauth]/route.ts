import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

// In a real application, you'd use a database
// For now, we'll simulate a user database with easy demo passwords
const users = [
  {
    id: "1",
    email: "admin@educonnect.com",
    password: "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdCx0WUxZq.wHLK", // password: admin123
    name: "Admin User",
    role: "admin",
    image: "/images/admin-avatar.jpg"
  },
  {
    id: "2",
    email: "student@test.com",
    password: "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdCx0WUxZq.wHLK", // password: student123
    name: "Test Student",
    role: "student",
    image: "/images/student-avatar.jpg"
  },
  {
    id: "3",
    email: "counselor@test.com",
    password: "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdCx0WUxZq.wHLK", // password: counselor123
    name: "Test Counselor",
    role: "counselor",
    image: "/images/counselor-avatar.jpg"
  },
  {
    id: "4",
    email: "demo@student.com",
    password: "$2a$12$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi", // password: password
    name: "Demo Student",
    role: "student",
    image: "/images/student-avatar.jpg"
  },
  {
    id: "5",
    email: "test@test.com",
    password: "$2a$12$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi", // password: password
    name: "Test User",
    role: "student",
    image: "/images/student-avatar.jpg"
  }
];

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        console.log("Attempting to authorize user:", credentials?.email);

        if (!credentials?.email || !credentials?.password) {
          console.log("Missing credentials");
          return null;
        }

        const user = users.find(user => user.email === credentials.email);

        if (!user) {
          console.log("User not found:", credentials.email);
          return null;
        }

        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);

        if (!isPasswordValid) {
          console.log("Invalid password for user:", credentials.email);
          return null;
        }

        console.log("User authenticated successfully:", user.email);
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          image: user.image,
        };
      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.role = user.role;
        console.log("JWT callback - user role:", user.role);
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub || "";
        session.user.role = token.role as string;
        console.log("Session callback - user role:", token.role);
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Handle redirects properly
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
  debug: process.env.NODE_ENV === "development",
  secret: process.env.NEXTAUTH_SECRET || "educonnect-africa-super-secret-key-for-development-2024",
});

export { handler as GET, handler as POST };
