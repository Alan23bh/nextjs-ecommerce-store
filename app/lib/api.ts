import { Product } from "../types/Product";

const BASE_URL = "https://fakestoreapi.com";

export async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${BASE_URL}/products`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Failed to fetch products ${res.status}`);
  }
  return res.json();
}
export async function getProduct(id: string): Promise<Product> {
  const products = await getProducts();
  const numericId = Number(id);
  const product = products.find((p) => p.id === numericId);
  if (!product) {
    throw new Error(`Failed to fetch product ${id}`);
  }
  return product;
}
