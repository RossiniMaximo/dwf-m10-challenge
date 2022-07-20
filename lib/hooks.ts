import { fetchAPI, getStoragedUser } from "lib";
import useSWR from "swr";
import { userAddress } from "./atoms";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

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

export function useUserFavourites() {
  try {
    const { data, error } = useSWR("/user/favourites", fetchAPI);
    return data;
  } catch (error) {
    throw "error : " + error;
  }
}
