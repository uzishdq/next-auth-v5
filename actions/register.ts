"use server";
import * as z from "zod";
import { RegisterSchema } from "@/schemas";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { GetUserbyEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validateValues = RegisterSchema.safeParse(values);
  if (!validateValues.success) {
    return { error: "Invalid field!" };
  }
  const { name, email, password } = validateValues.data;
  const hasedPassword = await bcrypt.hash(password, 10);

  const isEmail = await GetUserbyEmail(email);

  if (isEmail) {
    return { error: "email is registered!" };
  }

  await prisma.user.create({
    data: {
      name: name,
      email: email,
      password: hasedPassword,
    },
  });

  const verificationToken = await generateVerificationToken(email);

  return { success: "confirmation email send!" };
};
