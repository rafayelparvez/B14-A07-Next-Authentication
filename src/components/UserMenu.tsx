"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function UserMenu() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click / Escape
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  if (isPending) {
    return (
      <div className="flex items-center gap-3" aria-hidden>
        <div className="h-8 w-8 animate-pulse rounded-full bg-green-100" />
        <div className="h-4 w-28 animate-pulse rounded bg-gray-200" />
      </div>
    );
  }

  if (!session?.user) return null;

  const { name, email } = session.user;
  const initial = (name?.trim()?.[0] ?? email?.[0] ?? "?").toUpperCase();

  const handleSignOut = async () => {
    setOpen(false);
    await authClient.signOut();
    router.push("/sign-in");
    router.refresh();
  };

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex items-center gap-3 rounded-full py-1 pl-1 pr-2 transition hover:bg-green-50"
      >
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-700 text-sm font-bold text-white">
          {initial}
        </span>
        <span className="text-base font-medium text-gray-900">{name}</span>
        <span
          className={`text-[10px] text-gray-500 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 z-50 mt-3 w-72 rounded-2xl border border-gray-200 bg-white p-5 shadow-xl"
        >
          <p className="font-semibold text-gray-400">{name}</p>
          <p className="mb-4 truncate text-sm text-gray-300">{email}</p>

          <button
            type="button"
            role="menuitem"
            onClick={() => {
              setOpen(false);
              router.push("/profile");
            }}
            className="flex w-full items-center gap-2 rounded-lg py-2 text-left text-lg text-gray-900 transition hover:bg-gray-50"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5 text-purple-800"
              fill="currentColor"
              aria-hidden
            >
              <circle cx="12" cy="7" r="4" />
              <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8H4z" />
            </svg>
            আমার প্রোফাইল
          </button>

          <button
            type="button"
            role="menuitem"
            onClick={handleSignOut}
            className="flex w-full items-center gap-2 rounded-lg py-2 text-left text-lg text-red-600 transition hover:bg-red-50"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M9 14 4 9l5-5" />
              <path d="M4 9h10a6 6 0 0 1 0 12h-3" />
            </svg>
            সাইন আউট
          </button>
        </div>
      )}
    </div>
  );
}