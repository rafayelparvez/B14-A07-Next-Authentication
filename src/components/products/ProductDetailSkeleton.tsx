const Skeleton = ({
  className = "",
}: {
  className?: string;
}) => {
  return (
    <div
      className={`animate-pulse rounded-md bg-gray-200 ${className}`}
    />
  );
};

// Summary Skeleton
export const SummarySkeleton = () => {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="rounded-lg border border-gray-200 p-4"
        >
          <Skeleton className="mb-3 h-3 w-24" />
          <Skeleton className="mb-3 h-8 w-32" />
          <Skeleton className="h-3 w-36" />
        </div>
      ))}
    </div>
  );
};

// Market Table Skeleton
export const MarketTableSkeleton = () => {
  return (
    <section className="rounded-xl border border-gray-200 bg-white p-5">
      <Skeleton className="mb-5 h-5 w-48" />

      <div className="overflow-hidden rounded-lg border border-gray-200">
        {/* Table Header */}
        <div className="grid grid-cols-5 gap-4 border-b border-gray-200 bg-gray-50 px-4 py-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} className="h-4 w-full" />
          ))}
        </div>

        {/* Table Rows */}
        {Array.from({ length: 5 }).map((_, row) => (
          <div
            key={row}
            className="grid grid-cols-5 gap-4 border-b border-gray-100 px-4 py-4 last:border-b-0"
          >
            {Array.from({ length: 5 }).map((_, col) => (
              <Skeleton
                key={col}
                className="h-4 w-full"
              />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

// Full Product Details Skeleton
const ProductDetailSkeleton = () => {
  return (
    <div className="min-h-screen bg-[#f3f7f4]">
      <main className="mx-auto w-full max-w-7xl space-y-6 px-3 py-6 sm:px-6">

        {/* Breadcrumb */}
        <div className="flex items-center gap-3">
          <Skeleton className="h-3 w-12" />
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-3 w-24" />
        </div>

        {/* Product Header */}
        <section className="rounded-xl border border-gray-200 bg-white p-4 sm:p-5">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

            <div className="flex items-center gap-4">
              {/* Product Image */}
              <Skeleton className="h-16 w-16 shrink-0 rounded-xl" />

              {/* Product Information */}
              <div className="flex-1 space-y-3">
                <Skeleton className="h-6 w-36 sm:w-48" />
                <Skeleton className="h-3 w-28" />
                <Skeleton className="h-3 w-44" />
              </div>
            </div>

            {/* Today Price */}
            <div className="w-full rounded-xl bg-green-50 p-4 sm:w-40">
              <Skeleton className="mx-auto mb-3 h-3 w-20" />
              <Skeleton className="mx-auto mb-3 h-8 w-24" />
              <Skeleton className="mx-auto h-3 w-20" />
            </div>

          </div>
        </section>

        {/* Price Summary */}
        <section className="rounded-xl border border-gray-200 bg-white p-5">
          <Skeleton className="mb-5 h-5 w-40" />
          <SummarySkeleton />
        </section>

        {/* Market Prices */}
        <MarketTableSkeleton />

        {/* Bottom Link */}
        <Skeleton className="h-4 w-36" />

      </main>
    </div>
  );
};

export default ProductDetailSkeleton;