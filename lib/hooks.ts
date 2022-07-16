import { fetchAPI } from "lib";
import useSWR from "swr";
import { userAddress } from "./atoms";
import { useRecoilState, useRecoilValue } from "recoil";

export const useUserAddressState = () => useRecoilState(userAddress);
export const useUserAddress = () => useRecoilValue(userAddress);

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
