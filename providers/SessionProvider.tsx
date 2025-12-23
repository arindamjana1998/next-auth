"use client";

import { useEffect } from "react";
import { Session } from "next-auth";
import { SessionProvider, signOut, useSession } from "next-auth/react";

function AutoLogoutCustom() {
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.expires) {
      const expiryDate = new Date(session.expires).getTime();
      const now = Date.now();
      const delay = expiryDate - now;

      if (delay <= 0) {
        signOut({ callbackUrl: "/signin" });
      } else {
        const timer = setTimeout(() => {
          signOut({ callbackUrl: "/signin" });
        }, delay);

        return () => clearTimeout(timer);
      }
    }
  }, [session]);

  return null;
}

export function Providers({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) {
  return (
    <SessionProvider session={session}>
      <AutoLogoutCustom />
      {children}
    </SessionProvider>
  );
}
