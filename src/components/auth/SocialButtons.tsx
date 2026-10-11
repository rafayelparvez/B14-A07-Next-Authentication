"use client";

import { authClient } from "@/lib/auth-client";

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" aria-hidden="true">
    <path
      fill="#4285F4"
      d="M23.52 12.27c0-.85-.07-1.47-.22-2.12H12v3.85h6.6c-.13 1.03-.86 2.59-2.47 3.64l-.02.15 3.59 2.78.25.02c2.28-2.1 3.57-5.19 3.57-8.32"
    />
    <path
      fill="#34A853"
      d="M12 24c3.24 0 5.96-1.06 7.95-2.88l-3.79-2.95c-1.02.7-2.4 1.19-4.16 1.19-3.18 0-5.88-2.1-6.84-5l-.14.01-3.73 2.89-.05.13C3.24 21.3 7.28 24 12 24"
    />
    <path
      fill="#FBBC05"
      d="M5.16 14.36A7.3 7.3 0 0 1 4.76 12c0-.82.14-1.62.39-2.36L5.14 9.5 1.36 6.55l-.12.06A11.97 11.97 0 0 0 0 12c0 1.93.46 3.76 1.24 5.39z"
    />
    <path
      fill="#EA4335"
      d="M12 4.75c2.25 0 3.77.97 4.64 1.79l3.39-3.31C17.95 1.19 15.24 0 12 0 7.28 0 3.24 2.7 1.36 6.55l3.78 2.94C6.12 6.6 8.82 4.75 12 4.75"
    />
  </svg>
);

const GithubIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="h-4 w-4 shrink-0"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.38 7.86 10.9.57.1.78-.25.78-.55v-2.17c-3.2.7-3.87-1.37-3.87-1.37-.53-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.59.24 2.76.12 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.41-5.26 5.69.42.36.78 1.07.78 2.16v3.2c0 .31.21.66.79.55A10.52 10.52 0 0 0 23.5 12c0-6.27-5.23-11.5-11.5-11.5Z" />
  </svg>
);

const SocialButtons = () => {
  const handleSocial = (provider: "google" | "github") => {
    authClient.signIn.social({ provider, callbackURL: "/" });
  };

  return (
    <div className="grid grid-cols-2 gap-3">
      <button
        type="button"
        onClick={() => handleSocial("google")}
        className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-xs font-semibold text-gray-700 transition-colors hover:bg-gray-50 sm:text-sm"
      >
        <GoogleIcon /> Google দিয়ে চালিয়ে যান
      </button>

      <button
        type="button"
        onClick={() => handleSocial("github")}
        className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-xs font-semibold text-gray-700 transition-colors hover:bg-gray-50 sm:text-sm"
      >
        <GithubIcon /> GitHub দিয়ে চালিয়ে যান
      </button>
    </div>
  );
};

export default SocialButtons;