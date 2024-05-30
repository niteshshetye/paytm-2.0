"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import styles from "./page.module.css";
import { AppBar } from "@repo/ui/app-bar";

export default function Page(): JSX.Element {
  const session = useSession();

  return (
    <>
      <AppBar user={session.data?.user} onSignin={signIn} onSignout={signOut} />
      <main className={styles.main}></main>;
    </>
  );
}
