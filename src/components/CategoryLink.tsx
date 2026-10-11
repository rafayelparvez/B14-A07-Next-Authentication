import Link from "next/link";
import type { Category } from "@/context/BazardorContext";
import Icon from "./Icon";

type Props = {
  category: Category;
  active?: boolean;
  variant?: "pill" | "plain";
  className?: string;
};

export default function CategoryLink({
  category,
  active = false,
  variant = "pill",
  className = "",
}: Props) {
  const styles =
    variant === "pill"
      ? active
        ? "rounded-md bg-emerald-600 px-3 py-1.5 text-white"
        : "rounded-md px-3 py-1.5 text-gray-800 hover:bg-emerald-50 hover:text-emerald-700"
      : active
        ? "text-emerald-600"
        : "text-gray-800 hover:text-emerald-600";

  return (
    <Link
      href={`/category/${category.slug}`}
      aria-current={active ? "page" : undefined}
      className={`flex items-center gap-2 text-sm font-bold transition-colors ${styles} ${className}`}
    >
      <Icon src={category.icon} className="h-4 w-4 object-contain" />
      {category.nameBn}
    </Link>
  );
}