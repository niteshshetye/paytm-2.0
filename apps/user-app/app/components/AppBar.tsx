"use client";

import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { AppBar as UiAppBar } from "@repo/ui/app-bar";

export const Appbar = () => {
  const session = useSession();
  const router = useRouter();

  async function onSignout() {
    await signOut();

    router.push("/api/auth/signin");
  }

  return (
    <div>
      <UiAppBar
        user={session.data?.user}
        onSignin={signIn}
        onSignout={onSignout}
      />
    </div>
  );
};
