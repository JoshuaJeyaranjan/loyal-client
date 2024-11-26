import {jwtDecode} from "jwt-decode";

export const decodeJwt = (token) => {
  try {
    return jwtDecode(token); // Decode the JWT token
  } catch (error) {
    console.error("Failed to decode JWT:", error);
    return {};
  }
};
