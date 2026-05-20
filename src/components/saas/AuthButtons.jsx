"use client";

import { signIn, signOut } from "next-auth/react";
import { FaGoogle, FaSignOutAlt } from "react-icons/fa";

export function LoginButton({ className }) {
  return (
    <button
      onClick={() => signIn("google")}
      className={`inline-flex items-center gap-2 px-3 py-1.5 border border-neutral-200 text-neutral-800 rounded-sm font-medium hover:bg-neutral-50 hover:border-neutral-300 transition-all text-sm outline-none cursor-pointer ${className}`}
    >
      <FaGoogle className="text-xs text-neutral-500" />
      Sign In
    </button>
  );
}

export function SignUpButton({ className }) {
  return (
    <button
      onClick={() => signIn("google")}
      className={`inline-flex items-center gap-2 px-3 py-1.5 bg-accent hover:bg-accent-hover text-neutral-900 rounded-sm font-medium transition-all text-sm outline-none cursor-pointer ${className}`}
    >
      Sign Up
    </button>
  );
}

export function SignOutButton({ className }) {
  return (
    <button
      onClick={() => signOut()}
      className={`inline-flex items-center gap-1.5 px-2 py-1 text-xs border border-neutral-200 text-neutral-500 rounded-sm hover:text-neutral-800 hover:border-neutral-300 transition-all outline-none cursor-pointer ${className}`}
    >
      <FaSignOutAlt className="text-[10px]" />
      Sign Out
    </button>
  );
}
