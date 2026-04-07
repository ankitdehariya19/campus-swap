export type Condition = "new" | "used" | "refurbished";
export type SortKey = "default" | "price-asc" | "price-desc" | "rating";
export type FilterKey = Condition | "all";

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  condition: Condition;
  rating: number;
  reviews: number;
  image: string;
}
