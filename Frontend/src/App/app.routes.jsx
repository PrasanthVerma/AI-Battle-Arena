import { createBrowserRouter } from "react-router-dom";
import Login from "../Features/Auth/pages/Login.jsx";
import Register from "../Features/Auth/pages/Register.jsx";
import Logout from "../Features/Auth/pages/Logout.jsx";
import Root from "./Root.jsx";
import Home from "../Features/Arena/Pages/Home.jsx";
import { ProtectedRoute, GuestRoute } from "./guards.jsx";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      // Guest-only routes (redirect to /home if already logged in)
      {
        element: <GuestRoute />,
        children: [
          { path: "/", element: <Register /> },
          { path: "/login", element: <Login /> },
          { path: "/register", element: <Register /> },
        ]
      },
      // Protected routes (redirect to /login if not logged in)
      {
        element: <ProtectedRoute />,
        children: [
          { path: "/home", element: <Home /> },
          { path: "/logout", element: <Logout /> },
        ]
      }
    ]
  }
])