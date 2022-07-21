import { fetchAPI, getStoragedUser } from "lib";
import useSWR from "swr";
import { userAddress } from "./atoms";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

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
