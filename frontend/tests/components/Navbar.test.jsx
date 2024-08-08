import { screen, render, cleanup, within } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { expect, afterEach } from "vitest";
import "@testing-library/jest-dom/vitest";

import Context from "../../src/components/Context/Context";
import Navbar from "../../src/components/Navbar/Navbar";

afterEach(() => {
  cleanup();
});

// Mock authentication
let authStatus = false;
const setAuthStatus = (newValue) => {
  authStatus = newValue;
};

test("renders Navbar with different links when logged out", () => {
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

  const home = within(nav).queryByTestId("_home");
  expect(home).toBeInTheDocument();

  const login = within(nav).queryByTestId("_login");
  expect(login).toBeInTheDocument();

  const signup = within(nav).queryByTestId("_signup");
  expect(signup).toBeInTheDocument();
});

test("renders Navbar with different links when logged in", () => {
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

  const posts = within(nav).queryByTestId("_posts");
  expect(posts).toBeInTheDocument();

  const users = within(nav).queryByTestId("_users");
  expect(users).toBeInTheDocument();

  const logout = within(nav).queryByTestId("_logout");
  expect(logout).toBeInTheDocument();
});

