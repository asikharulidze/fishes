import jwt_decode from "jwt-decode";

export const decodeJwt = (token) => {
  if (token) {
    return jwt_decode(token);
  }
  return {};
};
