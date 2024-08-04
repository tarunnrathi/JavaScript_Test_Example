import { jwtDecode } from "jwt-decode";

export const decryptToken = (token = "") => {
  const decoded = jwtDecode(token); // , "test@#$%$"
  return decoded;
};
