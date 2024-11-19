import Credentials from "next-auth/providers/credentials";
import github from "next-auth/providers/github";
import google from "next-auth/providers/google";
import type { NextAuthConfig } from "next-auth";
import bcrypt from "bcryptjs";

import { LoginSchema } from "./schemas";
import { GetUserbyEmail } from "./data/user";

export default {
  providers: [
    github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const validateFields = LoginSchema.safeParse(credentials);

        if (!validateFields.success) {
          return null;
        }

        const { email, password } = validateFields.data;

        try {
          const user = await GetUserbyEmail(email);
          if (!user || !password || !user.password) {
            return null;
          }

          const passwordMatch = await bcrypt.compare(password, user.password);
          if (passwordMatch) {
            return user;
          } else {
            return null;
          }
        } catch (error) {
          console.error("Authentication error:", error);
          return null;
        }
      },
    }),
  ],
} satisfies NextAuthConfig;
