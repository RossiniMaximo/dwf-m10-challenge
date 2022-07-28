import { fetchAPI } from "lib";
import useSWR from "swr";

export function useProductData(productId) {
  const { data, error } = useSWR("/products?productId=" + productId, fetchAPI, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  if (error) {
    throw "error " + error;
  }
  return data;
}

export function useProducts(query: string, limit: number, offset: number) {
  const { data, error } = useSWR(
    "/products/search?query=" + query + "&limit=" + limit + "&offset=" + offset,
    fetchAPI
  );
  return data;
}
