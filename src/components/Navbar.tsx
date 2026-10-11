import Link from "next/link";
import Image from "next/image";
import Logo from "../../public/logo-icon.png";

type Category = {
  id: number | string;
  slug: string;
  nameBn: string;
  icon: string;
};

const getCategories = async (): Promise<Category[]> => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/categories",
  );

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  const data = await res.json();

  // Some programming-hero openapi endpoints wrap the array in a `data` key —
  // this handles both shapes safely.
  return data?.data ?? data;
};

const Navbar = async () => {
  const today = new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());

  const categories = await getCategories();

  return (
    <div className="w-full">
      {/* Top bar: logo + date + auth */}
      <div className="border-b border-gray-200 bg-white shadow-sm">
        <nav className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-3 px-3 py-3 sm:min-h-20 sm:gap-4 sm:px-6 sm:py-4">
          {/* Logo and Date */}
          <Link href="/" className="flex min-w-0 items-center gap-2.5 sm:gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-600 p-2 sm:h-12 sm:w-12">
              <Image
                src={Logo}
                alt="বাজার দর লোগো"
                className="h-full w-full object-contain brightness-0 invert"
                priority
              />
            </span>

            <span className="flex min-w-0 flex-col gap-0.5">
              <span className="text-base font-extrabold leading-tight text-gray-900 sm:text-xl">
                বাজার দর
              </span>

              <span className="text-[10px] leading-relaxed text-gray-500 sm:text-sm">
                {today}
              </span>
            </span>
          </Link>

          {/* Authentication Buttons */}
          <div className="flex shrink-0 items-center gap-2 sm:gap-4">
            <Link
              href="/sign-in"
              className="rounded-lg px-2.5 py-2 text-xs font-bold text-gray-800 transition-colors hover:bg-emerald-50 hover:text-emerald-700 sm:px-4 sm:text-base"
            >
              সাইন ইন
            </Link>

            <Link
              href="/sign-up"
              className="rounded-lg bg-emerald-600 px-3 py-2 text-xs font-bold text-white transition-colors hover:bg-emerald-700 sm:px-5 sm:py-2.5 sm:text-base"
            >
              সাইন আপ
            </Link>
          </div>
        </nav>
      </div>

      {/* Category links */}
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl overflow-x-auto px-3 sm:px-6">
          <nav className="flex items-center gap-6 whitespace-nowrap py-3 sm:gap-8">
            {categories?.map((cat) => (
              <a
                key={cat.id ?? cat.slug}
                href={`/category/${cat.slug}`}
                className="flex items-center gap-2 text-sm font-bold text-gray-800 transition-colors hover:text-emerald-600"
              >
                {/* If `icon` is an image URL instead of an emoji, swap this
                    span for: <img src={cat.icon} alt={cat.nameBn} className="h-4 w-4" /> */}
                <span className="text-base leading-none">{cat.icon}</span>
                {cat.nameBn}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
