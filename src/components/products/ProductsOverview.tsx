"use client";

import { useBazardor } from "@/context/BazardorContext";
import PriceMovementSection from "./PriceMovementSection";

const ProductsOverview = () => {
  const { products, loading, error } = useBazardor();

  if (loading) {
    return (
      <p className="px-6 py-10 text-center text-sm text-gray-500">
        লোড হচ্ছে...
      </p>
    );
  }

  if (error) {
    return (
      <p className="px-6 py-10 text-center text-sm text-red-500">{error}</p>
    );
  }

  // PriceMovementSection filters, sorts and limits the products by itself
  // and renders its own title based on `direction`.
  return (
    <div className="mx-auto max-w-7xl space-y-8 bg-white px-4 py-8 sm:px-6">
      <PriceMovementSection direction="up" products={products} />
      <PriceMovementSection direction="down" products={products} />
    </div>
  );
};

export default ProductsOverview;