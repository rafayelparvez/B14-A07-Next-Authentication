// src/components/Icon.tsx
const isUrl = (s?: string) =>
  !!s && (s.startsWith("http") || s.startsWith("/") || s.startsWith("data:"));

export default function Icon({
  src,
  className = "",
}: {
  src?: string;
  className?: string;
}) {
  if (!src) return null;
  if (isUrl(src)) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt="" className={className} />;
  }
  return <span className="text-base leading-none">{src}</span>;
}