// src/app/category/[slug]/page.tsx
"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useMemo } from "react";
import { useBazardor } from "@/context/BazardorContext";
import AllProductsSection from "@/components/products/AllProductsSection";
import CategoryPageSkeleton from "@/components/products/CategoryPageSkeleton";
import Icon from "@/components/Icon";

const formatBn = (num: number) => new Intl.NumberFormat("bn-BD").format(num);

export default function CategoryPage() {
  const params = useParams<{ slug: string }>();
  const slug = decodeURIComponent(params.slug);

  const { categories, products, loading, error, refetch } = useBazardor();

  const category = useMemo(
    () => categories.find((c) => c.slug === slug),
    [categories, slug]
  );

  const categoryProducts = useMemo(
    () => products.filter((p) => p.category === slug),
    [products, slug]
  );

  if (loading) {
    return <CategoryPageSkeleton />;
  }

  if (error) {
    return (
      <div className="p-10 text-center">
        <p className="mb-4 text-red-600">{error}</p>
        <button
          onClick={refetch}
          className="rounded-lg bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700"
        >
          আবার চেষ্টা করুন
        </button>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="p-10 text-center">
        <p className="mb-4 text-gray-600">ক্যাটেগরিটি পাওয়া যায়নি</p>
        <Link href="/products" className="text-emerald-700 underline">
          সব পণ্য দেখুন
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#f3f7f4]">
      <main className="mx-auto max-w-7xl space-y-5 px-3 py-6 sm:px-6">
        {/* Category header */}
        <section className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white px-5 py-5">
          <span className="text-4xl">
            <Icon src={category.icon} className="h-12 w-12 object-contain" />
          </span>
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900">
              {category.nameBn}
            </h1>
            <p className="text-sm text-gray-500">
              {formatBn(categoryProducts.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
            </p>
          </div>
        </section>

        {/* Products */}
        {categoryProducts.length > 0 ? (
          <AllProductsSection
            products={categoryProducts}
            title={null}
            defaultSort="default"
          />
        ) : (
          <p className="rounded-xl border border-gray-200 bg-white p-8 text-center text-sm text-gray-500">
            এই ক্যাটেগরিতে এখন কোনো পণ্য নেই
          </p>
        )}
      </main>
    </div>
  );
}