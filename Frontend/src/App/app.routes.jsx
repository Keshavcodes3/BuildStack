import { createBrowserRouter, Navigate } from "react-router-dom";
import Register from "../Features/Auth/Pages/Register";
import Login from "../Features/Auth/Pages/Login";
import Home from "../Features/Home/Pages/Home";
import Layout from "../Features/Home/Pages/Layout";
import Explore from "../Features/Home/Pages/Explore";
import Profile from "../Features/Home/Pages/Profile";
import Protected from "./Protected";

export const router = createBrowserRouter([
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: (
      <Protected>
        <Layout />
      </Protected>
    ),
    children: [
      { path: "", element: <Navigate to="home" replace /> },
      { path: "home", element: <Home /> },
      { path: "explore", element: <Explore /> },
      { path: "profile", element: <Profile /> },
    ],
  },
]);
