// src/utils/testJWT.js
import { jwtDecode } from "jwt-decode";

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIzNDU2Nzg5LCJuYW1lIjoiSm9zZXBoIn0.OpOSSw7e485LOP5PrzScxHb7SR6sAOMRckfFwi4rp7o'; // Replace with an actual JWT token for testing

try {
  const decoded = jwtDecode(token);
  console.log('Decoded JWT:', decoded);
} catch (error) {
  console.error('Failed to decode JWT:', error);
}
