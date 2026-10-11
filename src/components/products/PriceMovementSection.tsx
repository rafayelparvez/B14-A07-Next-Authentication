import type { Product } from "@/context/BazardorContext";
import ProductCard from "./ProductCard";

type Props = {
  title: string;
  direction: "up" | "down";
  products: Product[];
};

const PriceMovementSection = ({ title, direction, products }: Props) => {
  if (products.length === 0) return null;

  const isUp = direction === "up";

  return (
    <section className="mb-8">
      <h2
        className={`mb-3 flex items-center gap-2 text-base font-extrabold ${
          isUp ? "text-emerald-600" : "text-red-500"
        }`}
      >
        <span>{isUp ? "▲" : "▼"}</span>
        {title}
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
};

export default PriceMovementSection;