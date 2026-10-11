"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileForm from "@/components/profile/ProfileForm";
import ProfileSkeleton from "@/components/profile/ProfileSkeleton";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  // Not signed in -> go to sign-in
  useEffect(() => {
    if (!isPending && !session?.user) {
      router.replace("/sign-in");
    }
  }, [isPending, session, router]);

  const user = session?.user;

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-green-50/60 px-4 py-8">
      <div className="mx-auto w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-900">আমার প্রোফাইল</h1>
        <p className="mb-6 mt-1 text-sm text-gray-600">
          আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
        </p>

        {isPending || !user ? (
          <ProfileSkeleton />
        ) : (
          <div className="space-y-6">
            <ProfileHeader name={user.name} email={user.email} />
            {/* key remounts the form when the saved name changes */}
            <ProfileForm key={user.name} initialName={user.name} />
          </div>
        )}
      </div>
    </main>
  );
}