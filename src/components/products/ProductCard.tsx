import Link from "next/link";
import type { Product } from "@/context/BazardorContext";
import Icon from "@/components/Icon";

const formatBn = (num: number) => new Intl.NumberFormat("bn-BD").format(num);
const formatPercent = (num: number) =>
  new Intl.NumberFormat("bn-BD", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(num);

const ProductCard = ({ product }: { product: Product }) => {
  const change =
    product.yesterday && product.yesterday !== 0
      ? ((product.today - product.yesterday) / product.yesterday) * 100
      : 0;
  const rounded = Number(change.toFixed(1));
  const isFlat = rounded === 0;
  const isUp = rounded > 0;

  const badge = isFlat
    ? "bg-gray-100 text-gray-500"
    : isUp
      ? "bg-red-50 text-red-600"
      : "bg-emerald-50 text-emerald-600";

  return (
    <Link
      href={`/products/${product.slug}`}
      className="block rounded-xl border border-gray-200 bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-600"
    >
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-lg">
          <Icon src={product.categoryIcon} className="h-6 w-6 object-contain" />
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-bold text-gray-900">
            {product.nameBn}
          </p>
          <p className="text-xs text-gray-500">প্রতি {product.unit}</p>
        </div>
      </div>

      <p className="mt-4 text-xs text-gray-400">আজকের দাম</p>

      <div className="mt-1 flex items-center justify-between">
        <span className="text-lg font-extrabold text-gray-900">
          {formatBn(product.today)} টাকা
        </span>

        <span
          className={`rounded-full px-2 py-0.5 text-xs font-bold ${badge}`}
        >
          {isFlat ? "—" : isUp ? "▲" : "▼"} {formatPercent(Math.abs(rounded))}%
        </span>
      </div>
    </Link>
  );
};

export default ProductCard;