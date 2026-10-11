"use client";

import FastMarquee from "react-fast-marquee";
import { useBazardor, type Product } from "@/context/BazardorContext";

const formatBn = (num: number) => new Intl.NumberFormat("bn-BD").format(num);

const TickItem = ({ product }: { product: Product }) => {
  const change =
    product.yesterday && product.yesterday !== 0
      ? ((product.today - product.yesterday) / product.yesterday) * 100
      : 0;
  const isUp = change >= 0;

  return (
    <span className="mx-6 flex items-center gap-2 text-sm font-semibold text-white">
      {/* If `categoryIcon` is an image URL instead of an emoji, swap this
          span for: <img src={product.categoryIcon} alt="" className="h-4 w-4" /> */}
      <span className="text-base leading-none">{product.categoryIcon}</span>
      <span className="text-gray-200">{product.nameBn}</span>
      <span className="font-bold text-white">
        {formatBn(product.today)} টাকা/{product.unit}
      </span>
      <span
        className={`flex items-center gap-0.5 font-bold ${
          isUp ? "text-emerald-400" : "text-red-400"
        }`}
      >
        {isUp ? "▲" : "▼"} {formatBn(Math.abs(Number(change.toFixed(1))))}%
      </span>
    </span>
  );
};

const Marquee = () => {
  const { products } = useBazardor();

  if (products.length === 0) return null;

  return (
    <div className="w-full border-b border-black/20 bg-[#121212] py-2.5">
      <FastMarquee speed={45} pauseOnHover gradient={false}>
        {products.map((p) => (
          <TickItem key={p.id} product={p} />
        ))}
      </FastMarquee>
    </div>
  );
};

export default Marquee;