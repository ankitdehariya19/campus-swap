import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchProducts, type FetchProductsParams } from "../../services/api";
import { ITEMS_PER_PAGE } from "../../constants/product.constants";

export function useInfiniteProducts(params: Omit<FetchProductsParams, "page" | "limit">) {
  return useInfiniteQuery({
    queryKey: ["products", params],
    queryFn: ({ pageParam = 1 }) => 
      fetchProducts({ 
        ...params, 
        page: pageParam, 
        limit: ITEMS_PER_PAGE 
      }),
    getNextPageParam: (lastPage) => lastPage.hasMore ? lastPage.page + 1 : undefined,
    initialPageParam: 1,
  });
}
