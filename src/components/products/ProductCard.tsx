import type { Product } from "@/context/BazardorContext";

const CATEGORY_COLORS: Record<string, string> = {
  chal: "bg-rose-100",
  dal: "bg-amber-100",
  tel: "bg-sky-100",
  sobji: "bg-emerald-100",
  mach: "bg-blue-100",
  mangsho: "bg-red-100",
  "dim-dudh": "bg-yellow-100",
  mosla: "bg-orange-100",
};

const formatBn = (num: number) => new Intl.NumberFormat("bn-BD").format(num);

const ProductCard = ({ product }: { product: Product }) => {
  const change =
    product.yesterday && product.yesterday !== 0
      ? ((product.today - product.yesterday) / product.yesterday) * 100
      : 0;
  const isFlat = change === 0;
  const isUp = change > 0;

  const bg = CATEGORY_COLORS[product.category] ?? "bg-gray-100";

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
      {/* Icon + name */}
      <div className="flex items-center gap-3">
        <span
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg ${bg}`}
        >
          {/* If `categoryIcon` is an image URL instead of an emoji, swap this
              span for: <img src={product.categoryIcon} alt="" className="h-5 w-5" /> */}
          {product.categoryIcon}
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-bold text-gray-900">
            {product.nameBn}
          </p>
          <p className="text-xs text-gray-500">প্রতি {product.unit}</p>
        </div>
      </div>

      {/* Price */}
      <p className="mt-4 text-xs text-gray-400">আজকের দাম</p>

      <div className="mt-1 flex items-center justify-between">
        <span className="text-lg font-extrabold text-gray-900">
          {formatBn(product.today)} টাকা
        </span>

        <span
          className={`flex items-center gap-0.5 text-sm font-bold ${
            isFlat
              ? "text-gray-400"
              : isUp
                ? "text-emerald-600"
                : "text-red-500"
          }`}
        >
          {isFlat ? "—" : isUp ? "▲" : "▼"}{" "}
          {formatBn(Math.abs(Number(change.toFixed(1))))}%
        </span>
      </div>
    </div>
  );
};

export default ProductCard;