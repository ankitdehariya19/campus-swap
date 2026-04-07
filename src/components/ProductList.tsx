import { useState, useMemo } from "react";
import { ProductCard } from "./ProductCard";
import { useDebounce } from "../hooks/useDebounce";
import { products as PRODUCTS } from "../data/products";
import type { Product, FilterKey, SortKey } from "../Types/Types";

const FILTER_OPTIONS: { key: FilterKey; label: string }[] = [
  { key: "all", label: "All" },
  { key: "new", label: "New" },
  { key: "used", label: "Used" },
  { key: "refurbished", label: "Refurbished" },
];

const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: "default", label: "Sort" },
  { key: "price-asc", label: "Price ↑" },
  { key: "price-desc", label: "Price ↓" },
  { key: "rating", label: "Rating" },
];

export function ProductListing() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<FilterKey>("all");
  const [sort, setSort] = useState<SortKey>("default");

  const debouncedQuery = useDebounce(query, 280);

  const filtered = useMemo(
    () =>
      PRODUCTS.filter((p) => filter === "all" || p.condition === filter)
        .filter((p) => {
          if (!debouncedQuery) return true;
          const q = debouncedQuery.toLowerCase();
          return (
            p.name.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q)
          );
        })
        .sort((a, b) =>
          sort === "price-asc"
            ? a.price - b.price
            : sort === "price-desc"
              ? b.price - a.price
              : sort === "rating"
                ? b.rating - a.rating
                : 0,
        ),
    [debouncedQuery, filter, sort],
  );

  const handleBuyNow = (product: Product) => {
    console.log("Buy now:", product);
  };

  return (
    <div className="p-5 space-y-4 ">
      <div className="flex gap-2 ">

        <input
          className="flex-1 h-10 px-3.5 text-sm border border-gray-200 rounded-xl bg-white
                     text-gray-900 placeholder-gray-400 outline-none
                     focus:ring-2 focus:ring-gray-900/10 focus:border-gray-400 transition"
          placeholder="Search products…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select
          className="h-10 px-3 text-sm border border-gray-200 rounded-xl bg-white
                     text-gray-500 outline-none focus:ring-2 focus:ring-gray-900/10 cursor-pointer transition"
          value={sort}
          onChange={(e) => setSort(e.target.value as SortKey)}
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.key} value={o.key}>
              {o.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        {FILTER_OPTIONS.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-full border transition-all duration-100
              ${filter === f.key
                ? "bg-gray-900 text-white border-gray-900"
                : "bg-white text-gray-500 border-gray-200 hover:border-gray-400 hover:text-gray-700"
              }`}
          >
            {f.label}
          </button>
        ))}
        <span className="ml-auto text-xs text-gray-400">
          {filtered.length} of {PRODUCTS.length} items
        </span>
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-sm text-gray-400 py-12">
          No products match &quot;{debouncedQuery}&quot;
        </p>
      ) : (
        <div className="grid gap-3.5 [grid-template-columns:repeat(auto-fill,minmax(200px,1fr))]">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} onBuyNow={handleBuyNow} />
          ))}
        </div>
      )}
    </div>
  );
}
