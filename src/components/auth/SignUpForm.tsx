"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import PasswordInput from "./PasswordInput";
import SocialButtons from "./SocialButtons";
import { authClient } from "@/lib/auth-client";
import { notifySuccess, notifyError } from "@/lib/toast";

const SignUpForm = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (password.length < 8) {
      notifyError("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।");
      return;
    }

    if (password !== confirmPassword) {
      notifyError("পাসওয়ার্ড দুটো মিলছে না।");
      return;
    }

    setSubmitting(true);

    try {
      const { error } = await authClient.signUp.email({
        name,
        email,
        password,
      });

      if (error) {
        notifyError(error.message ?? "অ্যাকাউন্ট তৈরি ব্যর্থ হয়েছে।");
        return;
      }

      notifySuccess("অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে।");
      router.push("/");
      router.refresh();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("Sign up failed:", err);
      notifyError("সার্ভারের সাথে যোগাযোগ করা যায়নি। আবার চেষ্টা করুন।");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="name"
          className="mb-1.5 block text-sm font-bold text-gray-900"
        >
          নাম
        </label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="যেমন: রহিম উদ্দিন"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="name"
          required
          className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-emerald-500"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="mb-1.5 block text-sm font-bold text-gray-900"
        >
          ইমেইল
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          required
          className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-emerald-500"
        />
      </div>

      <PasswordInput
        id="password"
        label="পাসওয়ার্ড"
        placeholder="কমপক্ষে ৮ অক্ষর"
        value={password}
        onChange={setPassword}
        autoComplete="new-password"
      />

      <PasswordInput
        id="confirmPassword"
        label="পাসওয়ার্ড নিশ্চিত করুন"
        placeholder="আবার লিখুন"
        value={confirmPassword}
        onChange={setConfirmPassword}
        autoComplete="new-password"
      />

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-lg bg-emerald-600 py-2.5 text-sm font-bold text-white transition-colors hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? "তৈরি হচ্ছে..." : "অ্যাকাউন্ট তৈরি করুন"}
      </button>

      <div className="relative py-1 text-center text-xs text-gray-400">
        <span className="relative z-10 bg-white px-2">অথবা</span>
        <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-gray-200" />
      </div>

      <SocialButtons />
    </form>
  );
};

export default SignUpForm;