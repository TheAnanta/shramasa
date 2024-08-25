"use client";

import { auth } from "@/lib/firebase/config";

export default function Page() {
  return (
    <div>
      My Account page
      <button
        onClick={() => {
          auth.signOut();
        }}
      >
        Sign out
      </button>
    </div>
  );
}
