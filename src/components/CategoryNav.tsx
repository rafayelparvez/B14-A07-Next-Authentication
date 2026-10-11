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
  // তোমার আগের state, pathname এবং category logic এখানে থাকবে

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