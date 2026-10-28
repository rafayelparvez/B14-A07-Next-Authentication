"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/context/BazardorContext";
import ProductCard from "./ProductCard";

type SortKey = "default" | "name" | "price-asc" | "price-desc" | "change-desc";

type Props = {
  products?: Product[];
  title?: string | null;
  defaultSort?: SortKey;
};

const formatBn = (num: number) => new Intl.NumberFormat("bn-BD").format(num);

const changeOf = (p: Product) =>
  p.yesterday && p.yesterday !== 0
    ? ((p.today - p.yesterday) / p.yesterday) * 100
    : 0;

const AllProductsSection = ({
  products: productsProp,
  title = "সব পণ্য",
  defaultSort = "name",
}: Props) => {
  // caller bhul korleo crash korbe na
  const products = useMemo(
    () => (Array.isArray(productsProp) ? productsProp : []),
    [productsProp]
  );

  const [sortKey, setSortKey] = useState<SortKey>(defaultSort);

  const sorted = useMemo(() => {
    const list = [...products];

    switch (sortKey) {
      case "default":
        return list;
      case "price-asc":
        return list.sort((a, b) => a.today - b.today);
      case "price-desc":
        return list.sort((a, b) => b.today - a.today);
      case "change-desc":
        return list.sort(
          (a, b) => Math.abs(changeOf(b)) - Math.abs(changeOf(a))
        );
      default:
        return list.sort((a, b) => a.nameBn.localeCompare(b.nameBn, "bn"));
    }
  }, [products, sortKey]);

  return (
    <section>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <div>
          {title && (
            <h2 className="text-lg mb-3 font-extrabold text-gray-900">{title}</h2>
          )}
          <p
            className={
              title ? "text-xs text-emerald-600" : "text-sm text-gray-500"
            }
          >
            মোট {formatBn(sorted.length)}টি পণ্য দেখানো হচ্ছে
          </p>
        </div>

        <label className="flex items-center gap-2 text-sm text-gray-600">
          সাজান
          <select
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value as SortKey)}
            className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-800 outline-none focus:border-emerald-500"
          >
            <option value="default">ডিফল্ট</option>
            <option value="name">নাম</option>
            <option value="price-asc">দাম (কম থেকে বেশি)</option>
            <option value="price-desc">দাম (বেশি থেকে কম)</option>
            <option value="change-desc">সবচেয়ে বেশি পরিবর্তন</option>
          </select>
        </label>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
};

export default AllProductsSection;