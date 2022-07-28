import { fetchAPI, getStoragedToken, setStoragedToken } from "lib";

export async function sendCodeByEmail(email: string, fullname: string) {
  const res = await fetchAPI("/auth", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: { email, fullname },
  });
  return res;
}

export async function sendAuthCodeToVerify(email: string, code: number) {
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
  if (data?.result.length >= 1) {
    const getProducts = data?.result?.map(async (id) => {
      const res = await fetchAPI("/products?productId=" + id, {});
      return res;
    });

    const results = await Promise.all(getProducts);
    return results;
  } else {
    return false;
  }
}

export async function getFavourites() {
  const token = localStorage.getItem("auth_token");
  if (token != "null") {
    const res = await fetchAPI("/user/favourites", {});
    return res;
  }
}

export async function getIdsForPaths() {
  const res = await fetch(
    "https://dwf-m9-challenge.vercel.app/api/products/all"
  );
  const json = await res.json();
  return json;
}
export async function getProductData(itemId) {
  const res = await fetch(
    "https://dwf-m9-challenge.vercel.app/api/products?productId=" + itemId
  );
  const json = await res.json();

  return json.result.fields;
}
