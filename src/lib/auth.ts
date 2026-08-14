import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  pages: {
    signIn: "/admin/login",
  },
  providers: [
    CredentialsProvider({
      name: "Admin",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminHash = process.env.ADMIN_PASSWORD_HASH;

        if (!adminEmail || !adminHash) {
          throw new Error("Admin credentials are not configured on the server.");
        }
        if (!credentials?.email || !credentials?.password) return null;

        const emailMatches =
          credentials.email.trim().toLowerCase() === adminEmail.trim().toLowerCase();
        if (!emailMatches) return null;

        const passwordMatches = await bcrypt.compare(credentials.password, adminHash);
        if (!passwordMatches) return null;

        return { id: "admin", email: adminEmail, name: "Gachoka" };
      },
    }),
  ],
  callbacks: {
    async jwt({ token }) {
      token.role = "admin";
      return token;
    },
    async session({ session }) {
      return session;
    },
  },
};
