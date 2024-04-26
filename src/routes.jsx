import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Home from "./ui/Home";
import Error from "./ui/Error";
import FishWrapper, { carsLoader } from "./components/FishWrapper/FishWrapper";

import CreateCarForm from "./components/CreateCarForm/CreateCarForm";
import AuthContextProvider from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import AuthLayout from "./auth/AuthLayout";
import Login from "./auth/Login";
import Register from "./auth/Register";
import { authLoader } from "./loaders/auth.loader";
// import { authGuardLoader } from "./loaders/authGuard.loader";

const router = createBrowserRouter([
  {
    element: (
      <AuthContextProvider>
        <AppLayout />
      </AuthContextProvider>
    ),
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/fishes",
        element: <FishWrapper />,
        loader: carsLoader,
        errorElement: <Error />,
        children: [
          {
            path: "create",
            // loader: authGuardLoader,
            // element: <CreateCarForm />,
            element: (
              <PrivateRoute>
                <CreateCarForm />
              </PrivateRoute>
            ),
          },
          
        ],
      },
      {
        path: "/favorites",
        loader: carsLoader,
        element: (
            <FishWrapper />
        ),
      },
      {
        path: "/auth",
        element: <AuthLayout />,
        loader: authLoader,
        children: [
          {
            index: true,
            element: <Login />,
          },
          {
            path: "/auth/login",
            element: <Login />,
          },
          {
            path: "/auth/register",
            element: <Register />,
          },
        ],
      },
    ],
  },
]);

export default router;
