"use client";

import { usePathname } from "next/navigation";
import { useBazardor } from "@/context/BazardorContext";
import CategoryLink from "./CategoryLink";

type Props = {
  className?: string;
  linkClassName?: string;
  variant?: "pill" | "plain";
};

export default function CategoryNav({
  className = "",
  linkClassName = "",
  variant = "pill",
}: Props) {
  const { categories } = useBazardor();
  const pathname = usePathname();

  return (
    <nav className={className}>
      {categories.map((cat) => (
        <CategoryLink
          key={cat.id ?? cat.slug}
          category={cat}
          variant={variant}
          active={pathname === `/category/${cat.slug}`}
          className={linkClassName}
        />
      ))}
    </nav>
  );
}