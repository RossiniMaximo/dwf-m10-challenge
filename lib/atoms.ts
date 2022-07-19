import { atom, selector } from "recoil";

export const userAddress = atom({
  key: "userAddress",
  default: "",
});
