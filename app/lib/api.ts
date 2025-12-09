import { Product } from "../types/Product";

const BASE_URL = "https://fakestoreapi.com";

/**
 * SAFER getProducts()
 * - Never throws errors
 * - Returns [] if API fails
 * - Logs error for development
 */
export async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch(`${BASE_URL}/products`, {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Failed to fetch products:", res.status);
      return []; // Fallback instead of crashing
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    return []; // Fallback
  }
}

/**
 * SAFER getProduct()
 * - Calls getProducts() (already safe)
 * - Returns null instead of throwing
 */
export async function getProduct(id: string): Promise<Product | null> {
  const products = await getProducts();
  const numericId = Number(id);

  const product = products.find((p) => p.id === numericId);

  if (!product) {
    console.error(`Product ${id} not found.`);
    return null; // SAFER than throwing
  }

  return product;
}
