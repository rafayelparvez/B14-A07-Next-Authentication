import Link from "next/link";

export const metadata = {
  title: "পাতাটি পাওয়া যায়নি | বাজার দর",
};

export default function NotFound() {
  return (
    <main className="flex min-h-[calc(100vh-10rem)] flex-col items-center justify-center bg-green-50/60 px-4 py-16 text-center">
      <div className="text-7xl leading-none" role="img" aria-label="ঝুড়ি">
        🧺
      </div>

      <h1 className="mt-6 text-3xl font-extrabold text-gray-900 sm:text-4xl">
        পাতাটি খুঁজে পাওয়া যায়নি
      </h1>

      <p className="mt-4 max-w-xl text-base text-gray-600 sm:text-lg">
        আপনি যে পণ্য বা পাতাটি খুঁজছেন সেটি সরানো হয়েছে বা কখনো ছিল না।
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white shadow transition-colors hover:bg-emerald-700"
        >
          হোম পেজে যান
        </Link>
        <Link
          href="/products"
          className="rounded-lg border border-gray-900 bg-white px-5 py-2.5 text-sm font-bold text-gray-900 transition-colors hover:bg-emerald-50 hover:text-emerald-700"
        >
          বাজার তুলনা দেখুন
        </Link>
      </div>
    </main>
  );
}