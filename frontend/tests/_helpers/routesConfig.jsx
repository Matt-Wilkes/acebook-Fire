import { Outlet } from "react-router-dom";

import { HomePage } from "../../src/pages/Home/HomePage";
import { LoginPage } from "../../src/pages/Login/LoginPage";
import { SignupPage } from "../../src/pages/Signup/SignupPage";
import { FeedPage } from "../../src/pages/Feed/FeedPage";
import Navbar from "../../src/components/Navbar/Navbar";

const NavbarWrapper = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

const routesConfig = [
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
];

export default routesConfig;
