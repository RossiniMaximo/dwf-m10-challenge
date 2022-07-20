import { fetchAPI, setStoragedToken } from "lib";

export async function sendEmail(email: string, fullname: string) {
  const res = await fetchAPI("/auth", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: { email, fullname },
  });
  return res;
}

export async function sendCode(email: string, code: number) {
  const res = await fetchAPI("/auth/token", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: { email, code },
  });
  if (res) {
    setStoragedToken(res.token);
    return true;
  }
}

export async function getSearchProducts(
  query: string,
  limit: string,
  offset: number
) {
  const res = await fetchAPI(
    "/products/search?query=" + query + "&limit=" + limit + "&offset=" + offset,
    {
      method: "GET",
    }
  );
  return res;
}

export async function createOrder(productId: string, purchaseData) {
  const res = await fetchAPI("/order?productId=" + productId, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: {
      shippment_address: purchaseData.address,
      colour: purchaseData.colour,
    },
  });
  return res;
}

export async function setUserAddressAndPhoneNumber(
  address: string,
  phoneNumber: string
) {
  const res = await fetchAPI("/user/address", {
    method: "PATCH",
    headers: { "content-type": "application/json" },
    body: { address, phoneNumber },
  });
  return res;
}

export async function setUserFavourites(productId: string) {
  const res = await fetchAPI("/user/favourites", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: { productId },
  });
  return res;
}

export async function getUserFavourites(data) {
  const getProducts = data?.result?.map(async (id) => {
    const res = await fetchAPI("/products?productId=" + id, {});
    return res;
  });
  if (getProducts) {
    const results = await Promise.all(getProducts);
    return results;
  }
}
