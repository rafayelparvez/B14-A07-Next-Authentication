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
  // ... baki ager moto

  <CategoryLink
    key={cat.id ?? cat.slug}
    category={cat}
    variant={variant}
    active={pathname === `/category/${cat.slug}`}
    className={linkClassName}
  />