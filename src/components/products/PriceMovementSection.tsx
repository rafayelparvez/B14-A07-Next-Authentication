import type { Product } from "@/context/BazardorContext";
import ProductCard from "./ProductCard";

type Props = {
  products?: Product[];
  direction: "up" | "down";
  limit?: number;
};

const changeOf = (p: Product) =>
  p.yesterday && p.yesterday !== 0
    ? ((p.today - p.yesterday) / p.yesterday) * 100
    : 0;

export default function PriceMovementSection({
  products = [],
  direction,
  limit = 6,
}: Props) {
  const isUp = direction === "up";

  const items = (Array.isArray(products) ? products : [])
    .filter((p) => (isUp ? changeOf(p) > 0 : changeOf(p) < 0))
    .sort((a, b) =>
      isUp ? changeOf(b) - changeOf(a) : changeOf(a) - changeOf(b)
    )
    .slice(0, limit);

  return (
    <section>
      <h2 className="mb-3 flex items-center gap-2 text-lg font-extrabold text-gray-900">
        <span
          className={`text-xs ${isUp ? "text-red-500" : "text-emerald-600"}`}
          aria-hidden
        >
          {isUp ? "▲" : "▼"}
        </span>
        {isUp ? "আজ দাম বেড়েছে" : "আজ দাম কমেছে"}
      </h2>

      {items.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <p className="rounded-xl border border-gray-200 bg-white p-6 text-center text-sm text-gray-500">
          আজ কোনো পণ্যের দাম {isUp ? "বাড়েনি" : "কমেনি"}
        </p>
      )}
    </section>
  );
}