import React from "react";
import Link from "next/link";
import Image from "next/image";
import BannerImage from "../../public/bazar-hero.png"

const Banner = () => {
  const today = new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());

  return (
    <section className="w-full bg-[#F3F6F1] px-4 py-6 sm:px-6">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-[#F8FAF6] px-6 py-10 sm:px-10 sm:py-14">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
          {/* Left: content */}
          <div>
            <span className="inline-block rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700">
              {today}
            </span>

            <h1 className="mt-4 text-3xl font-extrabold leading-tight text-gray-900 sm:text-4xl lg:text-5xl">
              আজকের বাজারের দাম এক নজরে
            </h1>

            <p className="mt-4 max-w-md text-sm leading-relaxed text-gray-600 sm:text-base">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
              বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক
              জায়গায়।
            </p>

            <Link
              href="/products"
              className="mt-6 inline-block rounded-lg bg-emerald-600 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-emerald-700 sm:text-base"
            >
              সব পণ্য দেখুন
            </Link>
          </div>

          {/* Right: image */}
          <div className="flex items-center justify-center">
            {/* TODO: replace src with the actual image path (e.g. from /public or an import) */}
            <Image
              src={BannerImage}
              alt="বাজারের তাজা পণ্যের ঝুড়ি"
              className="h-auto w-full max-w-xs object-contain sm:max-w-sm"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;