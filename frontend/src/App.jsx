import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { useState } from "react";

import "./App.css";
import { HomePage } from "./pages/Home/HomePage";
import { LoginPage } from "./pages/Login/LoginPage";
import { SignupPage } from "./pages/Signup/SignupPage";
import { FeedPage } from "./pages/Feed/FeedPage";
import Navbar from "./components/Navbar/Navbar";
import Context from "./components/Context/Context";

const NavbarWrapper = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

// docs: https://reactrouter.com/en/main/start/overview
const router = createBrowserRouter([
  {
    path: "/",
    element: <NavbarWrapper />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/signup",
        element: <SignupPage />,
      },
      {
        path: "/posts",
        element: <FeedPage />,
      },
    ],
  },
]);

const App = () => {
  const [authStatus, setAuthStatus] = useState(false);
  return (
    <Context.Provider value={{ authStatus, setAuthStatus }}>
      <RouterProvider router={router} />
    </Context.Provider>
  );
};

export default App;
