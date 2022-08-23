const BASE_URL = "https://dwf-m9-challenge.vercel.app/api";
const DEV_URL = "http://localhost:3001/api";

import { TypeUserData } from "custom";

export async function fetchAPI(input: RequestInfo, init: any) {
  const token = getStoragedToken();
  const newOptions = init || {};
  newOptions.headers ||= {};
  if (token) {
    newOptions.headers.authorization = "Bearer" + " " + token;
  }
  if (newOptions.body) {
    newOptions.body = JSON.stringify(newOptions.body);
  }
  const res = await fetch(DEV_URL + input, newOptions);
  if (res.status >= 200 && res.status < 300) {
    const json = await res.json();
    return json;
  } else {
    throw "error " + res.status;
  }
}

export function getStoragedToken() {
  return localStorage.getItem("auth_token");
}

export function setStoragedToken(data: string) {
  return localStorage.setItem("auth_token", data);
}

export function setStoragedUser(userData: TypeUserData) {
  return localStorage.setItem(
    "user_data",
    JSON.stringify({
      email: userData.email,
      fullname: userData.fullname,
      shipment_address: userData.shipment_address,
      phone: userData.phone,
      logged: userData.logged,
    })
  );
}
export function getStoragedUser() {
  const user = localStorage.getItem("user_data");
  if (user) {
    return JSON.parse(user);
  }
}

export function isUserLogged() {
  try {
    const user = getStoragedUser();
    return user.logged;
  } catch (error) {
    return false;
  }
}

export function LogOut() {
  const user = getStoragedUser();
  user.email = "";
  user.fullname = "";
  user.shipment_address = "";
  user.logged = false;
  setStoragedUser(user);
  setStoragedToken("null");
}
