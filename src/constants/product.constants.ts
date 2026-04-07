import type { FilterKey, SortKey } from "../Types/Types";

export const FILTER_OPTIONS: { key: FilterKey; label: string }[] = [
  { key: "all", label: "All" },
  { key: "new", label: "New" },
  { key: "used", label: "Used" },
];

export const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: "default", label: "Sort" },
  { key: "price-asc", label: "Price ↑" },
  { key: "price-desc", label: "Price ↓" },
];

export const ITEMS_PER_PAGE = 4;
export const API_LATENCY = 600;
export const DEFAULT_PAGE_LIMIT = 8;

export const PRICE_RANGE_OPTIONS = [
  { key: "all", label: "Any Price", min: 0, max: Infinity },
  { key: "under-20000", label: "Under ₹20,000", min: 0, max: 20000 },
  { key: "20000-50000", label: "₹20,000 - ₹50,000", min: 20000, max: 50000 },
  { key: "50000-above", label: "Above ₹50,000", min: 50000, max: Infinity },
];
