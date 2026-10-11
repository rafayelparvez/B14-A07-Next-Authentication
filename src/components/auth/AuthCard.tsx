import Link from "next/link";
import type { ReactNode } from "react";

type AuthCardProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
  footerText: string;
  footerLinkText: string;
  footerLinkHref: string;
};

const AuthCard = ({
  title,
  subtitle,
  children,
  footerText,
  footerLinkText,
  footerLinkHref,
}: AuthCardProps) => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-[#F3F6F1] px-4 py-10">
      <div className="w-full max-w-md">
        <h1 className="text-center text-2xl font-extrabold text-gray-900 sm:text-3xl">
          {title}
        </h1>
        <p className="mt-2 text-center text-sm text-gray-500">{subtitle}</p>

        <div className="mt-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
          {children}
        </div>

        <p className="mt-4 text-center text-sm text-gray-600">
          {footerText}{" "}
          <Link
            href={footerLinkHref}
            className="font-semibold text-emerald-600 hover:underline"
          >
            {footerLinkText}
          </Link>
        </p>

        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-sm text-gray-500 transition-colors hover:text-gray-700"
          >
            ← হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AuthCard;