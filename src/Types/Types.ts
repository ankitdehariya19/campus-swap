export type Condition = "new" | "used";
export type SortKey = "default" | "price-asc" | "price-desc";
export type FilterKey = Condition | "all";

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  condition: Condition;
  image: string;
}
