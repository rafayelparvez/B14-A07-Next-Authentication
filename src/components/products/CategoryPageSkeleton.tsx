import React from "react";

// Reusable Skeleton Bar
const Bar = ({ className = "" }: { className?: string }) => (
  <div className={`animate-pulse rounded bg-gray-200 ${className}`} />
);

/** ProductCard-er hubohu shape */
function ProductCardSkeleton() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4" aria-hidden>
      <div className="flex items-center gap-3">
        <Bar className="h-10 w-10 shrink-0 rounded-lg" />
        <div className="space-y-2">
          <Bar className="h-4 w-28" />
          <Bar className="h-3 w-16" />
        </div>
      </div>

      <Bar className="mt-4 h-3 w-16" />

      <div className="mt-2 flex items-center justify-between">
        <Bar className="h-6 w-24" />
        <Bar className="h-5 w-14 rounded-full" />
      </div>
    </div>
  );
}

/** Card grid (AllProductsSection-er grid-er sathe same column) */
function ProductGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

/** Puro category page-er skeleton */
function CategoryPageSkeleton() {
  return (
    <div
      className="bg-[#f3f7f4]"
      role="status"
      aria-busy="true"
      aria-label="লোড হচ্ছে"
    >
      <main className="mx-auto max-w-7xl space-y-5 px-3 py-6 sm:px-6">
        {/* Category header */}
        <section className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white px-5 py-5">
          <Bar className="h-12 w-12 shrink-0 rounded-xl" />
          <div className="space-y-2.5">
            <Bar className="h-7 w-24" />
            <Bar className="h-4 w-56 max-w-full" />
          </div>
        </section>

        {/* Count + sort row */}
        <div className="flex items-center justify-between gap-3">
          <Bar className="h-4 w-44" />
          <Bar className="h-8 w-28 rounded-lg" />
        </div>

        {/* Cards */}
        <ProductGridSkeleton />
      </main>
    </div>
  );
}
export default CategoryPageSkeleton;