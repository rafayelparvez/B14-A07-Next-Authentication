// src/app/page.tsx
"use client";

import { useBazardor } from "@/context/BazardorContext";
import Banner from "@/components/Banner";
import PriceMovementSection from "@/components/products/PriceMovementSection";
import AllProductsSection from "@/components/products/AllProductsSection";

function SectionSkeleton({ count = 6 }: { count?: number }) {
  return (
    <section aria-hidden>
      <div className="mb-3 h-6 w-40 animate-pulse rounded bg-gray-200" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="h-[110px] animate-pulse rounded-xl border border-gray-200 bg-white"
          />
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  const { products, loading, error, refetch } = useBazardor();

  return (
    <div className="bg-[#f3f7f4]">
      <main className="mx-auto max-w-7xl space-y-8 px-3 py-6 sm:px-6">
        <Banner />

        {error ? (
          <div className="rounded-xl border border-gray-200 bg-white p-8 text-center">
            <p className="mb-4 text-red-600">{error}</p>
            <button
              onClick={refetch}
              className="rounded-lg bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700"
            >
              আবার চেষ্টা করুন
            </button>
          </div>
        ) : loading ? (
          <div
            className="space-y-8"
            role="status"
            aria-busy="true"
            aria-label="লোড হচ্ছে"
          >
            <SectionSkeleton />
            <SectionSkeleton />
            <SectionSkeleton count={9} />
          </div>
        ) : (
          <>
            <PriceMovementSection
              direction="up"
              products={products}
              limit={6}
            />
            <PriceMovementSection
              direction="down"
              products={products}
              limit={6}
            />
            <div id="all-products">
              <AllProductsSection products={products} defaultSort="default" />
            </div>
          </>
        )}
      </main>
    </div>
  );
}
