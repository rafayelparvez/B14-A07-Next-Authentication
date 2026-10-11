"use client";

import { useMemo } from "react";
import { useBazardor, type Product } from "@/context/BazardorContext";
import PriceMovementSection from "./PriceMovementSection";

const changeOf = (p: Product) =>
  p.yesterday && p.yesterday !== 0
    ? ((p.today - p.yesterday) / p.yesterday) * 100
    : 0;

const ProductsOverview = () => {
  const { products, loading, error } = useBazardor();

  const { gainers, losers } = useMemo(() => {
    const withChange = products.map((p) => ({ p, change: changeOf(p) }));

    const gainers = withChange
      .filter((x) => x.change > 0)
      .sort((a, b) => b.change - a.change)
      .slice(0, 6)
      .map((x) => x.p);

    const losers = withChange
      .filter((x) => x.change < 0)
      .sort((a, b) => a.change - b.change)
      .slice(0, 6)
      .map((x) => x.p);

    return { gainers, losers };
  }, [products]);

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

  return (
    <div className="mx-auto max-w-7xl bg-white px-4 py-8 sm:px-6">
      <PriceMovementSection
        title="আজ দাম বেড়েছে"
        direction="up"
        products={gainers}
      />
      <PriceMovementSection
        title="আজ দাম কমেছে"
        direction="down"
        products={losers}
      />
    </div>
  );
};

export default ProductsOverview;