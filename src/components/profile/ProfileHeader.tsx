"use client";

import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

type Props = {
  name: string;
  email: string;
};

export default function ProfileHeader({ name, email }: Props) {
  const router = useRouter();
  const initial = (name?.trim()?.[0] ?? email?.[0] ?? "?").toUpperCase();

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/sign-in");
    router.refresh();
  };

  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-white px-7 py-6 shadow-sm">
      <div className="flex min-w-0 items-center gap-4">
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-green-700 text-2xl font-semibold text-white">
          {initial}
        </span>
        <div className="min-w-0">
          <p className="truncate text-xl font-semibold text-gray-900">{name}</p>
          <p className="truncate text-base text-gray-500">{email}</p>
        </div>
      </div>

      <button
        type="button"
        onClick={handleSignOut}
        className="flex shrink-0 items-center gap-1.5 rounded-lg border border-red-500 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50"
      >
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4"
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
  );
}