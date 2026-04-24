import { createBrowserRouter } from "react-router-dom";
import Login from "./Features/Auth/pages/Login.jsx";
import Register from "./Features/Auth/pages/Register.jsx";


export const Router = createBrowserRouter([
  {
    path: "/",
    element: <Register />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },

])