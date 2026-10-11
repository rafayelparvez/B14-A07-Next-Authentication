"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

type Props = {
  initialName: string;
};

export default function ProfileForm({ initialName }: Props) {
  const router = useRouter();
  const [name, setName] = useState(initialName);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const trimmed = name.trim();
  const unchanged = trimmed === initialName.trim();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (trimmed.length < 2) {
      setMessage({ type: "error", text: "নাম কমপক্ষে ২ অক্ষরের হতে হবে।" });
      return;
    }

    setSaving(true);
    try {
      const { error } = await authClient.updateUser({ name: trimmed });
      if (error) {
        setMessage({
          type: "error",
          text: error.message || "নাম হালনাগাদ করা যায়নি।",
        });
      } else {
        setMessage({ type: "success", text: "নাম সফলভাবে হালনাগাদ হয়েছে।" });
        router.refresh();
      }
    } catch {
      setMessage({ type: "error", text: "কিছু একটা সমস্যা হয়েছে, আবার চেষ্টা করুন।" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
    >
      <h2 className="mb-4 text-xl font-bold text-gray-900">
        নাম হালনাগাদ করুন
      </h2>

      <label htmlFor="name" className="mb-1.5 block text-base text-gray-900">
        নাম
      </label>
      <input
        id="name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={saving}
        autoComplete="name"
        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-600/20 disabled:opacity-60"
      />

      {message && (
        <p
          role="status"
          className={`mt-3 text-sm ${
            message.type === "success" ? "text-green-700" : "text-red-600"
          }`}
        >
          {message.text}
        </p>
      )}

      <button
        type="submit"
        disabled={saving || unchanged}
        className="mt-4 rounded-lg bg-green-700 px-5 py-2.5 text-sm font-bold text-white shadow transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {saving ? "হালনাগাদ হচ্ছে..." : "নাম হালনাগাদ করুন"}
      </button>
    </form>
  );
}