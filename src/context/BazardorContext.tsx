"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const BASE_URL = "https://openapi.programming-hero.com/api/bazardor";

export type Category = {
  id: number | string;
  slug: string;
  nameBn: string;
  icon: string;
};

export type Product = {
  id: number | string;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
};

type BazardorContextValue = {
  categories: Category[];
  products: Product[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
};

const BazardorContext = createContext<BazardorContextValue | undefined>(
  undefined
);

/**
 * Fetches categories + products from the bazardor API ONCE and shares them
 * through context, so Navbar, Marquee, Banner, product pages etc. all read
 * the same data instead of each component calling fetch on its own.
 *
 * Wrap the app with this in app/layout.tsx:
 *   <BazardorProvider>{children}</BazardorProvider>
 */
export function BazardorProvider({ children }: { children: React.ReactNode }) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      setError(null);

      try {
        const [categoriesRes, productsRes] = await Promise.all([
          fetch(`${BASE_URL}/categories`),
          fetch(`${BASE_URL}/products`),
        ]);

        if (!categoriesRes.ok || !productsRes.ok) {
          throw new Error("Failed to fetch bazardor data");
        }

        const categoriesJson = await categoriesRes.json();
        const productsJson = await productsRes.json();

        if (!cancelled) {
          // Some programming-hero openapi endpoints wrap the array in a
          // `data` key — this handles both shapes safely.
          setCategories(categoriesJson?.data ?? categoriesJson ?? []);
          setProducts(productsJson?.data ?? productsJson ?? []);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : "Something went wrong"
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, [reloadKey]);

  const refetch = () => setReloadKey((k) => k + 1);

  return (
    <BazardorContext.Provider
      value={{ categories, products, loading, error, refetch }}
    >
      {children}
    </BazardorContext.Provider>
  );
}

export function useBazardor() {
  const ctx = useContext(BazardorContext);
  if (!ctx) {
    throw new Error("useBazardor must be used inside a <BazardorProvider>");
  }
  return ctx;
}