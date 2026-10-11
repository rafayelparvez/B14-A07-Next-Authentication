"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { useBazardor } from "@/context/BazardorContext";
import { useSession } from "@/lib/auth-client";
import Icon from "@/components/Icon";
import ProductDetailSkeleton, {
  SummarySkeleton,
  MarketTableSkeleton,
} from "@/components/products/ProductDetailSkeleton";

const BASE_URL = "https://openapi.programming-hero.com/api/bazardor";

type MarketPrice = {
  market: string;
  division: string;
  min: number;
  max: number;
  avg: number;
};

const toBn = (n: number, digits = 0) =>
  n.toLocaleString("bn-BD", { maximumFractionDigits: digits });

const toBn2 = (n: number) =>
  n.toLocaleString("bn-BD", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

function normalizeMarkets(json: any): MarketPrice[] {
  const list =
    json?.data?.markets ?? json?.data?.marketPrices ?? json?.markets ?? [];
  if (!Array.isArray(list)) return [];

  return list.map((m: any) => {
    const min = Number(m.min ?? m.minPrice ?? 0);
    const max = Number(m.max ?? m.maxPrice ?? 0);
    const rawAvg = Number(m.avg ?? m.avgPrice ?? m.average ?? m.price ?? 0);

    return {
      market: m.marketNameBn ?? m.nameBn ?? m.market ?? "",
      division: m.divisionBn ?? m.division ?? "",
      min,
      max,
      // API avg na dile min-max er majhamajhi
      avg: rawAvg > 0 ? rawAvg : (min + max) / 2,
    };
  });
}

/** Product image with fallback when the URL is broken */
function ProductImage({
  image,
  fallback,
  name,
}: {
  image?: string;
  fallback?: string;
  name: string;
}) {
  const [failed, setFailed] = useState(false);

  useEffect(() => setFailed(false), [image]);

  if (image && !failed) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={image}
        alt=""
        onError={() => setFailed(true)}
        className="h-10 w-10 object-contain"
      />
    );
  }
  if (fallback) return <Icon src={fallback} className="h-9 w-9 object-contain" />;
  return <span className="text-xl font-bold text-gray-500">{name.charAt(0)}</span>;
}

function ProductDetailPage() {
  const params = useParams<{ slug: string }>();
  const slug = decodeURIComponent(params.slug);
  const router = useRouter();

  // ---- Auth guard: signed-in না থাকলে /sign-in এ পাঠিয়ে দাও ----
  const { data: session, isPending: sessionLoading } = useSession();

  useEffect(() => {
    if (!sessionLoading && !session) {
      toast.info("বিস্তারিত দাম দেখতে সাইন ইন করুন", {
        toastId: "product-auth-required",
      });
      router.replace("/sign-in");
    }
  }, [sessionLoading, session, router]);

  const { products, loading, error, refetch } = useBazardor();
  const product = useMemo(
    () => products.find((p) => p.slug === slug || String(p.id) === slug),
    [products, slug]
  );

  const [markets, setMarkets] = useState<MarketPrice[]>([]);
  // true diye shuru, jate product paoyar por ek frame-o "tothyo pawa jayni" jhalke na uthe
  const [marketsLoading, setMarketsLoading] = useState(true);

  useEffect(() => {
    if (!product) return;
    let cancelled = false;

    (async () => {
      setMarketsLoading(true);
      try {
        const res = await fetch(`${BASE_URL}/products/${product.id}`);
        if (!res.ok) throw new Error("failed");
        const json = await res.json();
        if (!cancelled) setMarkets(normalizeMarkets(json));
      } catch {
        if (!cancelled) {
          setMarkets([]);
          toast.error("বাজারভিত্তিক দাম লোড করা যায়নি", {
            toastId: `markets-error-${product.id}`,
          });
        }
      } finally {
        if (!cancelled) setMarketsLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [product]);

  const summary = useMemo(() => {
    if (markets.length === 0) return null;
    const lowest = markets.reduce((a, b) => (b.min < a.min ? b : a));
    const highest = markets.reduce((a, b) => (b.max > a.max ? b : a));
    const avg = markets.reduce((s, m) => s + m.avg, 0) / markets.length;
    return { lowest, highest, avg };
  }, [markets]);

  // সেশন চেক হওয়ার আগ পর্যন্ত, বা সাইন-ইন না থাকলে (redirect হওয়ার সময়টুকু)
  // স্কেলিটন দেখাও — আসল কন্টেন্ট এক মুহূর্তের জন্যও ফ্ল্যাশ করবে না
  if (sessionLoading || !session) {
    return <ProductDetailSkeleton />;
  }

  if (loading) {
    return <ProductDetailSkeleton />;
  }
  if (error) {
    return (
      <div className="p-10 text-center">
        <p className="mb-4 text-red-600">{error}</p>
        <button
          onClick={refetch}
          className="rounded-lg bg-green-700 px-4 py-2 text-white hover:bg-green-800"
        >
          আবার চেষ্টা করুন
        </button>
      </div>
    );
  }
  if (!product) {
    return (
      <div className="p-10 text-center">
        <p className="mb-4 text-gray-600">পণ্যটি পাওয়া যায়নি</p>
        <Link href="/products" className="text-green-700 underline">
          সব পণ্য দেখুন
        </Link>
      </div>
    );
  }

  const categoryHref = `/category/${product.category}`;

  const diff = product.today - product.yesterday;
  const percent = product.yesterday
    ? Math.abs((diff / product.yesterday) * 100)
    : 0;
  const up = diff > 0;
  const down = diff < 0;

  return (
    <div className="bg-[#f3f7f4]">
      <main className="mx-auto w-full max-w-7xl space-y-6 px-3 py-6 sm:px-6">
        {/* Breadcrumb */}
        <nav className="text-xs text-gray-500">
          <Link href="/" className="hover:underline">
            হোম
          </Link>{" "}
          <span>›</span>{" "}
          <Link href={categoryHref} className="hover:underline">
            {product.categoryNameBn}
          </Link>{" "}
          <span>›</span>{" "}
          <span className="text-gray-800">{product.nameBn}</span>
        </nav>

        {/* Product header */}
        <section className="flex items-center justify-between gap-4 rounded-xl border border-gray-200 bg-white p-5">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-3xl">
              <ProductImage
                image={product.image}
                fallback={product.categoryIcon}
                name={product.nameBn}
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{product.nameBn}</h1>
              <p className="text-xs text-gray-500">
                প্রতি {product.unit} · {product.categoryNameBn}
              </p>
              <p className="mt-1 text-xs text-gray-600">
                গতকালের তুলনায় আজ দাম{" "}
                {up ? "বেড়েছে" : down ? "কমেছে" : "অপরিবর্তিত আছে"}{" "}
                {diff !== 0 && (
                  <span className={up ? "text-red-600" : "text-green-600"}>
                    {toBn(percent, 1)}%
                  </span>
                )}
              </p>
            </div>
          </div>

          <div className="shrink-0 rounded-xl bg-green-50 px-5 py-3 text-center">
            <p className="text-xs text-gray-500">আজকের দাম</p>
            <p className="text-3xl font-bold text-gray-900">{toBn(product.today)}</p>
            <p className="text-xs text-gray-500">টাকা / {product.unit}</p>
            {diff !== 0 && (
              <p
                className={`text-xs font-medium ${
                  up ? "text-red-600" : "text-green-600"
                }`}
              >
                {up ? "▲" : "▼"} {toBn(percent, 1)}%
              </p>
            )}
          </div>
        </section>

        {/* Summary */}
        <section className="rounded-xl border border-gray-200 bg-white p-5">
          <h2 className="mb-4 font-semibold text-gray-900">দামের সারসংক্ষেপ</h2>
          {marketsLoading ? (
            <SummarySkeleton />
          ) : summary ? (
            <div className="grid gap-3 sm:grid-cols-3">
              <SummaryCard
                label="সর্বনিম্ন দাম"
                value={summary.lowest.min}
                note="সবচেয়ে কম দামের বাজার"
                valueClass="text-green-600"
              />
              <SummaryCard
                label="সর্বোচ্চ দাম"
                value={summary.highest.max}
                note="সবচেয়ে বেশি দামের বাজার"
                valueClass="text-red-600"
              />
              <SummaryCard
                label="গড় দাম"
                value={summary.avg}
                note={`প্রতি ${product.unit} এর গড়`}
                valueClass="text-gray-900"
              />
            </div>
          ) : (
            <p className="text-sm text-gray-500">বাজারভিত্তিক তথ্য পাওয়া যায়নি</p>
          )}
        </section>

        {/* Market table */}
        {marketsLoading ? (
          <MarketTableSkeleton />
        ) : (
          markets.length > 0 && (
            <section className="rounded-xl border border-gray-200 bg-white p-5">
              <h2 className="mb-4 font-semibold text-gray-900">
                বাজারভিত্তিক আজকের দাম
              </h2>
              <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="w-full min-w-[560px] text-sm">
                  <thead className="bg-gray-50 text-gray-500">
                    <tr>
                      <th className="px-4 py-3 text-left font-medium">বাজার</th>
                      <th className="px-4 py-3 text-left font-medium">বিভাগ</th>
                      <th className="px-4 py-3 text-right font-medium">সর্বনিম্ন</th>
                      <th className="px-4 py-3 text-right font-medium">সর্বোচ্চ</th>
                      <th className="px-4 py-3 text-right font-medium">গড়</th>
                    </tr>
                  </thead>
                  <tbody>
                    {markets.map((m, i) => (
                      <tr
                        key={`${m.market}-${i}`}
                        className="border-t border-gray-100 even:bg-green-50/50"
                      >
                        <td className="px-4 py-3 text-gray-900">{m.market}</td>
                        <td className="px-4 py-3 text-gray-600">{m.division}</td>
                        <td className="px-4 py-3 text-right">{toBn(m.min)} টাকা</td>
                        <td className="px-4 py-3 text-right">{toBn(m.max)} টাকা</td>
                        <td className="px-4 py-3 text-right font-semibold">
                          {toBn2(m.avg)} টাকা
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )
        )}

        <Link
          href={categoryHref}
          className="inline-flex items-center gap-1.5 text-sm text-green-700 hover:underline"
        >
          <Icon src={product.categoryIcon} className="h-4 w-4 object-contain" />
          সব {product.categoryNameBn}
        </Link>
      </main>
    </div>
  );
}

function SummaryCard({
  label,
  value,
  note,
  valueClass,
}: {
  label: string;
  value: number;
  note: string;
  valueClass: string;
}) {
  return (
    <div className="rounded-lg border border-gray-200 p-4">
      <p className="text-xs text-gray-500">{label}</p>
      <p className={`text-2xl font-bold ${valueClass}`}>
        {toBn2(value)} <span className="text-sm font-normal">টাকা</span>
      </p>
      <p className="text-xs text-gray-500">{note}</p>
    </div>
  );
}


export default ProductDetailPage;