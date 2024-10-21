"use client";

import { signOut } from "next-auth/react";
import { Button } from "~/components/ui/button";

const SignOutButton = () => {
  return (
    <Button onClick={() => signOut({ callbackUrl: "/" })} variant={"ghost"}>
      Sign Out
    </Button>
  );
};

export default SignOutButton;
