import { Product } from "../types/Product";
import { productsData } from "./productsData";

// const BASE_URL = "https://fakestoreapi.com";

// export async function getProducts(): Promise<Product[]> {
//   try {
//     const res = await fetch(`${BASE_URL}/products`, {
//       cache: "no-store",
//     });

//     if (!res.ok) {
//       console.error("Failed to fetch products:", res.status);
//       return [];
//     }

//     return await res.json();
//   } catch (error) {
//     console.error("Error fetching products:", error);
//     return [];
//   }
// }

// export async function getProduct(id: string): Promise<Product | null> {
//   const products = await getProducts();
//   const numericId = Number(id);

//   const product = products.find((p) => p.id === numericId);

//   if (!product) {
//     console.error(`Product ${id} not found.`);
//     return null;
//   }

//   return product;
// }
export async function getProducts(): Promise<Product[]> {
  // still async so you don’t have to change other code
  return productsData;
}

export async function getProduct(id: string): Promise<Product | null> {
  const numericId = Number(id);

  const product = productsData.find((p) => p.id === numericId);

  if (!product) {
    console.error(`Product ${id} not found.`);
    return null;
  }

  return product;
}
