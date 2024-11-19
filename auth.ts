import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";
import { GetUserbyId } from "./data/user";

export const { auth, handlers, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
    signOut: "/",
  },
  events: {
    async linkAccount({ user }) {
      await prisma.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") return true;

      const exstingUser = await GetUserbyId(user.id!);

      if (!exstingUser?.emailVerified) return false;

      return true;
    },
    async jwt({ token }) {
      if (!token.sub) {
        return token;
      }
      const exstingUser = await GetUserbyId(token.sub);
      if (!exstingUser) {
        return token;
      }
      token.role = exstingUser.role;

      return token;
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        session.user.role = token.role;
      }

      return session;
    },
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt", maxAge: 86400 },
  ...authConfig,
});
