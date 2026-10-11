"use client";

import Link from "next/link";
import Image from "next/image";
import Logo from "../../public/logo-icon.png";
import { authClient } from "@/lib/auth-client";
import UserMenu from "@/components/UserMenu";
import CategoryNav from "@/components/CategoryNav";

const Navbar = () => {
  const { data: session, isPending } = authClient.useSession();

  const today = new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());

  return (
    <div className="w-full">
      {/* Top bar: logo + date + auth */}
      <div className="border-b border-gray-200 bg-white shadow-sm">
        <nav className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-3 px-3 py-3 sm:min-h-20 sm:gap-4 sm:px-6 sm:py-4">
          {/* Logo and Date */}
          <Link href="/" className="flex min-w-0 items-center gap-2.5 sm:gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-600 p-2 sm:h-12 sm:w-12">
              <Image
                src={Logo}
                alt="বাজার দর লোগো"
                className="h-full w-full object-contain brightness-0 invert"
                priority
              />
            </span>

            <span className="flex min-w-0 flex-col gap-0.5">
              <span className="text-base font-extrabold leading-tight text-gray-900 sm:text-xl">
                বাজার দর
              </span>

              <span className="text-[10px] leading-relaxed text-gray-500 sm:text-sm">
                {today}
              </span>
            </span>
          </Link>

          {/* Auth area: UserMenu when logged in (or still loading, UserMenu
              shows its own skeleton), otherwise Sign in / Sign up */}
          <div className="flex shrink-0 items-center gap-2 sm:gap-4">
            {isPending || session?.user ? (
              <UserMenu />
            ) : (
              <>
                <Link
                  href="/sign-in"
                  className="rounded-lg px-2.5 py-2 text-xs font-bold text-gray-800 transition-colors hover:bg-emerald-50 hover:text-emerald-700 sm:px-4 sm:text-base"
                >
                  সাইন ইন
                </Link>

                <Link
                  href="/sign-up"
                  className="rounded-lg bg-emerald-600 px-3 py-2 text-xs font-bold text-white transition-colors hover:bg-emerald-700 sm:px-5 sm:py-2.5 sm:text-base"
                >
                  সাইন আপ
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>

      {/* Category links (uses next/link, so no full page reload) */}
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl overflow-x-auto px-3 sm:px-6">
          <CategoryNav
            variant="plain"
            className="flex items-center gap-6 whitespace-nowrap py-3 sm:gap-8"
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;