"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { LoginButton, SignUpButton, SignOutButton } from "./AuthButtons";
import { CreditBadge } from "./CreditBadge";
import { FaWandMagicSparkles } from "react-icons/fa6";
import { SiVercel } from "react-icons/si";

export function Navbar() {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  return (
    <header className="w-full border-b border-neutral-100 bg-white">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">

        {/* Logo and Brand */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-neutral-800 transition-transform group-hover:scale-105">
            <FaWandMagicSparkles className="text-sm" />
          </div>
          <span className="font-semibold text-neutral-800 tracking-tight text-md">
            Pet Product Studio
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="flex items-center gap-6">
          <Link
            href="/"
            className={`flex items-center gap-1 text-sm font-medium transition-colors ${pathname === "/"
                ? "text-neutral-900 border-b border-neutral-950 pb-0.5"
                : "text-neutral-500 hover:text-neutral-800"
              }`}
          >
            <span>Pet Studio</span>
            <FaWandMagicSparkles className="text-xs text-neutral-400" />
          </Link>
          <Link
            href="/pricing"
            className={`text-sm font-medium transition-colors ${pathname === "/pricing"
                ? "text-neutral-900 border-b border-neutral-950 pb-0.5"
                : "text-neutral-500 hover:text-neutral-800"
              }`}
          >
            Pricing
          </Link>
        </nav>

        {/* Auth / Account Controls */}
        <div className="flex items-center gap-3">
          {status === "loading" ? (
            <div className="h-7 w-20 animate-pulse bg-neutral-100 rounded-sm" />
          ) : session?.user ? (
            <div className="flex items-center gap-3">
              <CreditBadge credits={session.user.credits ?? 0} />

              <Link href="/pricing" className="inline-flex items-center px-2.5 py-1 bg-neutral-950 hover:bg-neutral-800 text-white rounded-sm text-xs font-medium transition-all">
                Buy Credits
              </Link>

              {session.user.image ? (
                <img
                  src={session.user.image}
                  alt={session.user.name || "User Profile"}
                  className="h-6 w-6 rounded-full border border-neutral-200"
                />
              ) : (
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-neutral-200 text-neutral-600 text-xs font-semibold">
                  {session.user.name ? session.user.name[0].toUpperCase() : "U"}
                </div>
              )}

              <SignOutButton />
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <LoginButton />
              <SignUpButton />
            </div>
          )}

          <a 
            href="https://vercel.com/new/clone?repository-url=https://github.com/SamurAIGPT/pet-product-studio"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white hover:bg-slate-800 transition-all font-bold text-[10px] tracking-widest uppercase shadow-lg shadow-slate-900/10"
          >
            <SiVercel className="text-xs" />
            Deploy
          </a>
        </div>

      </div>
    </header>
  );
}
