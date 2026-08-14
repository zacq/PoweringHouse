"use client";

import { signOut } from "next-auth/react";

export function SignOutButton() {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: "/admin/login" })}
      style={{
        background: "none",
        border: "none",
        color: "inherit",
        font: "inherit",
        cursor: "pointer",
        padding: 0,
      }}
    >
      Sign out
    </button>
  );
}
