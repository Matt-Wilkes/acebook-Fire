import { screen, render, fireEvent, cleanup } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { expect, afterEach } from "vitest";
import "@testing-library/jest-dom/vitest";
import { RouterProvider, createMemoryRouter } from "react-router-dom";

import Context from "../../src/components/Context/Context";
import Navbar from "../../src/components/Navbar/Navbar";

import routesConfig from "../_helpers/routesConfig";

afterEach(() => {
  cleanup();
});

// Variable and function to pass data to Context.Provider to mock behaviour of useState in App.jsx
let authStatus = false;
const setAuthStatus = (newValue) => {
  authStatus = newValue;
};

// Router equivalent to router implemented in App.jsx
const router = createMemoryRouter(routesConfig, {
  initialEntries: ["/"],
});

test("renders Logout button element when logged in", () => {
  setAuthStatus(true);
  render(
    <Context.Provider value={{ authStatus, setAuthStatus }}>
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    </Context.Provider>
  );

  const nav = screen.queryByTestId("_nav");
  expect(nav).toBeInTheDocument();

  const logout = screen.queryByTestId("_logout");
  expect(logout).toBeInTheDocument();
});

test("does not render Logout button element when logged out", () => {
  setAuthStatus(false);
  render(
    <Context.Provider value={{ authStatus, setAuthStatus }}>
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    </Context.Provider>
  );

  const nav = screen.queryByTestId("_nav");
  expect(nav).toBeInTheDocument();

  const logout = screen.queryByTestId("_logout");
  expect(logout).not.toBeInTheDocument();
});

test("clicking Logout button redirects to HomePage with message", async () => {
  setAuthStatus(true);
  render(
    <Context.Provider value={{ authStatus, setAuthStatus }}>
      <RouterProvider router={router} />
    </Context.Provider>
  );

  expect(screen.getByTestId("_nav")).toBeInTheDocument();

  const logout = screen.queryByTestId("_logout");
  expect(logout).toBeInTheDocument();

  fireEvent.click(logout);

  const message = screen.queryByTestId("_message");
  expect(message).toBeInTheDocument();
  expect(message).toHaveTextContent("You were logged out.");
});
