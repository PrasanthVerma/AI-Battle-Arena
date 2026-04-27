import { createBrowserRouter } from "react-router-dom";
import Login from "../Features/Auth/pages/Login.jsx";
import Register from "../Features/Auth/pages/Register.jsx";
import Logout from "../Features/Auth/pages/Logout.jsx";
import App from "./App.jsx";
import Root from "./Root.jsx";
import Home from "../Features/Arena/Pages/Home.jsx"


export const Router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
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
      {
        path: "/logout",
        element: <Logout />
      },
      {
        path: "/home",
        element: <Home/>
      }
    ]
  }
])