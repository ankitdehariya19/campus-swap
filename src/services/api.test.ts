import { describe, it, expect, vi } from "vitest";
import { fetchProducts } from "./api";

// We don't need to mock the data because it's a fake API service 
// but we should be aware of the data structure.
// If we wanted to be more robust, we could mock the products.ts import.

describe("fetchProducts API", () => {
  it("should fetch products with default parameters", async () => {
    const response = await fetchProducts({});

    expect(response).toHaveProperty("data");
    expect(response).toHaveProperty("total");
    expect(response).toHaveProperty("page", 1);
    expect(response.data.length).toBeLessThanOrEqual(8);
  });

  it("should filter products by condition 'new'", async () => {
    const response = await fetchProducts({ filter: "new" });

    const allNew = response.data.every(p => p.condition === "new");
    expect(allNew).toBe(true);
  });

  it("should search products by query", async () => {
    const query = "Sony";
    const response = await fetchProducts({ query });

    const allMatch = response.data.every(p =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.category.toLowerCase().includes(query.toLowerCase())
    );
    expect(allMatch).toBe(true);
    if (response.total > 0) {
      expect(response.data.length).toBeGreaterThan(0);
    }
  });

  it("should filter products by price range", async () => {
    const minPrice = 10000;
    const maxPrice = 50000;
    const response = await fetchProducts({ minPrice, maxPrice });

    const allInRange = response.data.every(p =>
      p.price >= minPrice && p.price <= maxPrice
    );
    expect(allInRange).toBe(true);
  });

  it("should handle pagination", async () => {
    const limit = 2;
    const page = 1;
    const response = await fetchProducts({ limit, page });

    expect(response.data.length).toBe(limit);
    expect(response.page).toBe(page);
    expect(response.totalPages).toBeGreaterThan(0);
  });

  it("should sort products by price ascending", async () => {
    const response = await fetchProducts({ sort: "price-asc" });

    const isSorted = response.data.every((p, i) => {
      if (i === 0) return true;
      return p.price >= response.data[i - 1].price;
    });
    expect(isSorted).toBe(true);
  });
});
