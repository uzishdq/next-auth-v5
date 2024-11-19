"use server";
import * as z from "zod";
import bcrypt from "bcryptjs";
import { LoginSchema } from "@/schemas";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/lib/routes";
import { AuthError } from "next-auth";
import { GetUserbyEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validateValues = LoginSchema.safeParse(values);
  if (!validateValues.success) {
    return { error: "Invalid field!" };
  }
  const { email, password } = validateValues.data;

  const existingUser = await GetUserbyEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "don't have an account!" };
  }

  const passwordMatch = await bcrypt.compare(password, existingUser.password);
  if (!passwordMatch) {
    return { error: "email / password is wrong!" };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email
    );
    return { success: "confirmation email send!" };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
    return { success: "login complited!" };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "email / password is wrong!" };
        default:
          return { error: "someting went wrong!" };
      }
    }
    throw error;
  }
};
