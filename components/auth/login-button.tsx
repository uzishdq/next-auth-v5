"use client";

import { useRouter } from "next/navigation";

interface LoginButtinProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}

export default function LoginButton({
  children,
  mode = "redirect",
  asChild,
}: LoginButtinProps) {
  const router = useRouter();

  const onClick = () => {
    router.push("/auth/login");
  };
  if (mode === "modal") {
    return <span>Modal Show</span>;
  }
  return (
    <span className="cursor-pointer" onClick={onClick}>
      {children}
    </span>
  );
}
