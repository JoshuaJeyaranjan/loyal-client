// src/jwtUtils.js
import { jwtDecode } from "jwt-decode";

console.log('jwt_decode:', jwtDecode); // Debugging log

export const decodeJwt = (token) => {
  try {
    return jwtDecode(token); // Decode the JWT token
  } catch (error) {
    console.error('Failed to decode JWT:', error);
    return {};
  }
};
