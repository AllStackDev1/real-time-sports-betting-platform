import "react-toastify/dist/ReactToastify.css";

import {
  Outlet,
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { useAuthStore } from "./stores";
import AppErrorPage from "./app-error-page";

type RouteProps = {
  isAuthenticated: boolean;
};

const PrivateRoute = ({ isAuthenticated }: RouteProps) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

const PublicRoute = ({ isAuthenticated }: RouteProps) => {
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

function App() {
  const accessToken = useAuthStore((state) => state.accessToken);

  const router = createBrowserRouter([
    {
      errorElement: <AppErrorPage />,
      element: (
        <>
          <ToastContainer />
          <Outlet />
        </>
      ),
      children: [
        {
          index: true,
          element: <Navigate to="/login" replace />,
        },
        {
          element: <PublicRoute isAuthenticated={!!accessToken} />,
          children: [
            {
              path: "/login",
              lazy: async () => {
                const { Login } = await import("./pages/login");
                return {
                  Component: Login,
                };
              },
            },
            {
              path: "/signup",
              lazy: async () => {
                const { Signup } = await import("./pages/signup");
                return {
                  Component: Signup,
                };
              },
            },
          ],
        },
        {
          element: <PrivateRoute isAuthenticated={!!accessToken} />,
          children: [
            {
              path: "/dashboard",
              lazy: async () => {
                const { Dashboard } = await import("./pages/dashboard");
                return {
                  Component: Dashboard
                };
              },
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
