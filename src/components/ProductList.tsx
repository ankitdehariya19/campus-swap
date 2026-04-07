import { useState, useMemo } from "react";
import { ProductCard } from "./ProductCard";
import { useDebounce } from "../hooks/useDebounce";
import { products as PRODUCTS } from "../data/products";
import type { Product, FilterKey, SortKey } from "../Types/Types";
import { Input } from "./ui/Input";
import { Dropdown } from "./ui/Dropdown";
import { Button } from "./ui/Button";

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
    <div className="p-5 space-y-5">
      <div className="flex gap-3">
        <div className="flex-1">
          <Input
            placeholder="Search products…"
            value={query}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
            icon={
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            }
          />
        </div>
        <Dropdown
          className="w-40"
          options={SORT_OPTIONS}
          value={sort}
          onChange={(val) => setSort(val as SortKey)}
        />
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        {FILTER_OPTIONS.map((f) => (
          <Button
            key={f.key}
            onClick={() => setFilter(f.key)}
            variant={filter === f.key ? "primary" : "outline"}
            size="sm"
            className="rounded-full"
          >
            {f.label}
          </Button>
        ))}
        <span className="ml-auto text-xs font-medium text-gray-400">
          Showing {filtered.length} items
        </span>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <p className="text-sm font-medium text-gray-900">No products found</p>
          <p className="text-[13px] text-gray-500 mt-1">Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(220px,1fr))]">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} onBuyNow={handleBuyNow} />
          ))}
        </div>
      )}
    </div>
  );
}
