import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({ message: "Email is Required " }),
  password: z.string().min(1, "Password is Required"),
});

export const RegisterSchema = z.object({
  email: z.string().email({ message: "Email is Required " }),
  password: z.string().min(6, "minimum 6 characters required"),
  name: z.string().min(4, "minimum 4 characters required"),
});
