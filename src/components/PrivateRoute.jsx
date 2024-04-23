import { Navigate } from "react-router-dom";
import { useAuthCont } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { isAuth } = useAuthCont();

  if (!isAuth) {
    return <Navigate to="/auth/login" />;
  }

  return children;
};

export default PrivateRoute;
