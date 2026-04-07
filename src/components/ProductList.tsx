import { useState } from "react";
import { ProductCard } from "./ProductCard";
import { useDebounce } from "../hooks/useDebounce";
import { useInfiniteProducts } from "../hooks/queries/useProducts";
import type { Product, FilterKey, SortKey } from "../Types/Types";
import { Input } from "./ui/Input";
import { Dropdown } from "./ui/Dropdown";
import { Button } from "./ui/Button";
import { 
  FILTER_OPTIONS, 
  SORT_OPTIONS, 
  PRICE_RANGE_OPTIONS 
} from "../constants/product.constants";

export function ProductListing() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<FilterKey>("all");
  const [sort, setSort] = useState<SortKey>("default");
  const [priceRange, setPriceRange] = useState("all");

  const debouncedQuery = useDebounce(query, 300);

  const selectedPriceOption = PRICE_RANGE_OPTIONS.find((o) => o.key === priceRange);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteProducts({
    query: debouncedQuery,
    filter,
    sort,
    minPrice: selectedPriceOption?.min,
    maxPrice: selectedPriceOption?.max,
  });

  const allProducts = data?.pages.flatMap((page) => page.data) ?? [];
  const totalItems = data?.pages[0]?.total ?? 0;

  const handleBuyNow = (product: Product) => {
    console.log("Buy now:", product);
  };

  return (
    <div className="py-10 space-y-8 px-5">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
        <div className="flex-1 w-full">
          <Input
            placeholder="What are you looking for?"
            value={query}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
            icon={
              <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            }
          />
        </div>
        <Dropdown
          className="w-full md:w-48"
          options={PRICE_RANGE_OPTIONS}
          value={priceRange}
          onChange={(val) => setPriceRange(val)}
        />
        <Dropdown
          className="w-full md:w-48"
          options={SORT_OPTIONS}
          value={sort}
          onChange={(val) => setSort(val as SortKey)}
        />
      </div>

      <div className="flex items-center gap-2.5 flex-wrap">
        {FILTER_OPTIONS.map((f) => (
          <Button
            key={f.key}
            onClick={() => setFilter(f.key)}
            variant={filter === f.key ? "primary" : "outline"}
            size="sm"
            className="rounded-full px-5"
          >
            {f.label}
          </Button>
        ))}
        {!isLoading && (
          <span className="ml-auto text-xs font-semibold text-gray-500 uppercase tracking-widest">
            {allProducts.length} <span className="text-gray-700 mx-1">/</span> {totalItems} items
          </span>
        )}
      </div>

      {isLoading ? (
        <div className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(280px,1fr))] animate-pulse">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-80 bg-[#171717] rounded-3xl border border-[#262626]" />
          ))}
        </div>
      ) : isError ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-20 h-20 bg-rose-500/10 border border-rose-500/20 rounded-full flex items-center justify-center mb-6">
            <svg className="w-10 h-10 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <p className="text-lg font-semibold text-white">Something went wrong</p>
          <p className="text-gray-400 mt-2 max-w-sm">Failed to load products. Please check your internet connection or try again.</p>
          <Button onClick={() => window.location.reload()} variant="outline" className="mt-8">Try Again</Button>
        </div>
      ) : allProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center border border-dashed border-[#262626] rounded-3xl bg-[#0A0A0A]">
          <div className="w-24 h-24 bg-[#171717] border border-[#262626] rounded-full flex items-center justify-center mb-6">
            <svg className="w-10 h-10 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <p className="text-xl font-bold text-white">No items found</p>
          <p className="text-gray-500 mt-2 text-sm">We couldn't find anything matching your filters or search.</p>
        </div>
      ) : (
        <div className="space-y-12">
          <div className="grid gap-8 grid-cols-[repeat(auto-fill,minmax(280px,1fr))]">
            {allProducts.map((p) => (
              <ProductCard key={p.id} product={p} onBuyNow={handleBuyNow} />
            ))}
          </div>

          {hasNextPage && (
            <div className="flex justify-center pb-20">
              <Button 
                onClick={() => fetchNextPage()} 
                variant="outline" 
                className="min-w-[160px] h-12 rounded-2xl"
                disabled={isFetchingNextPage}
              >
                {isFetchingNextPage ? (
                   <span className="flex items-center gap-2">
                     <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                     </svg>
                     Loading...
                   </span>
                ) : "Load More Items"}
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
