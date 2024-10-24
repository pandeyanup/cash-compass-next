"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { Button } from "~/components/ui/button";

const SignOutButton = () => {
  return (
    <Button
      className="flex h-auto w-full content-start items-start justify-start px-2"
      onClick={() => signOut({ callbackUrl: "/" })}
      variant={"ghost"}
    >
      <LogOut className="mr-2 h-4 w-4" />
      <p>Sign out</p>
    </Button>
  );
};

export default SignOutButton;
