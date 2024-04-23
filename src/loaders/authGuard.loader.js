import { redirect } from "react-router-dom";
import { decodeJwt } from "../utils/jwt.decoder";

export const authGuardLoader = () => {
  const token = localStorage.getItem("token");
  if (token) {
    const decodedToken = decodeJwt(token);
    const exp = decodedToken.exp;
    const now = Date.now() / 1000;
    if (!exp || exp < now) {
      return redirect("/auth/login");
    }
    return null;
  }
  return redirect("/auth/login");
};
