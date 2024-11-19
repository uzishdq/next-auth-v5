"use client";

import { Chrome, Github } from "lucide-react";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/lib/routes";
import google from "next-auth/providers/google";

export function Social() {
  const onClick = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };
  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        size="lg"
        variant="outline"
        className="w-full"
        onClick={() => onClick("google")}
      >
        <Chrome />
      </Button>
      <Button
        size="lg"
        variant="outline"
        className="w-full"
        onClick={() => onClick("github")}
      >
        <Github />
      </Button>
    </div>
  );
}
