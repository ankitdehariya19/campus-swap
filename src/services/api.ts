import { products as ALL_PRODUCTS } from "../data/products";
import type { Product, FilterKey, SortKey } from "../Types/Types";
import { DEFAULT_PAGE_LIMIT, API_LATENCY } from "../constants/product.constants";

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasMore: boolean;
}

export interface FetchProductsParams {
  query?: string;
  filter?: FilterKey;
  sort?: SortKey;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  limit?: number;
}

/**
 * Simulates a backend API call with filtering, searching, and pagination.
 */
export const fetchProducts = async ({
  query = "",
  filter = "all",
  sort = "default",
  minPrice = 0,
  maxPrice = Infinity,
  page = 1,
  limit = DEFAULT_PAGE_LIMIT,
}: FetchProductsParams): Promise<PaginatedResponse<Product>> => {
  // Simulate network latency
  await new Promise((resolve) => setTimeout(resolve, API_LATENCY));

  let filtered = [...ALL_PRODUCTS];

  // Filter by condition
  if (filter !== "all") {
    filtered = filtered.filter((p) => p.condition === filter);
  }

  // Filter by price
  filtered = filtered.filter((p) => p.price >= minPrice && p.price <= maxPrice);

  // Search by query
  if (query) {
    const q = query.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );
  }

  // Sort
  filtered.sort((a, b) => {
    switch (sort) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      default:
        return 0;
    }
  });

  // Pagination
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedData = filtered.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filtered.length / limit);

  return {
    data: paginatedData,
    total: filtered.length,
    page,
    limit,
    totalPages,
    hasMore: page < totalPages,
  };
};
