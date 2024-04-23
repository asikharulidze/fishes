import React, { createContext, useContext, useState, useEffect } from "react";
import { decodeJwt } from "../utils/jwt.decoder";

export const AuthContext = createContext();

export const useAuthCont = () => useContext(AuthContext);

const AuthContextProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState({ firstName: "", lastName: "" });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = decodeJwt(token);
      const exp = decodedToken.exp;
      const now = Date.now() / 1000;
      if (exp && exp > now) {
        setIsAuth(true);
      } else setIsAuth(false);
    }
  }, []);

  const login = (token, user) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
    setIsAuth(true);
  };

  const logout = () => {
    setIsAuth(false);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ isAuth, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
