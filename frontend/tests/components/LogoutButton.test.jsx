import { screen, render, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { expect, beforeEach } from "vitest";
import "@testing-library/jest-dom/vitest";

import Context from "../../src/components/Context/Context";
import Navbar from "../../src/components/Navbar/Navbar"

// Mock authentication
let authStatus = false;
const setAuthStatus = (newValue) => {
  authStatus = newValue;
};

describe("MyProfile.jsx", () => {
  beforeEach(() => {
    window.localStorage.removeItem("token");
    setAuthStatus(false);
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

  test("clicking Logout button will delete token", async () => {
    window.localStorage.setItem(
      "token",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjZhZThmNmFjYzNiNzc1NDJlYTc0ZDIxIiwiaWF0IjoxNzIyODk1OTcwfQ.QOeRf8AgdnpPEiD_51hF73W9WW2c87Z5v_ZVTo6riP8"
    );

    setAuthStatus(true);

    render(
      <Context.Provider value={{ authStatus, setAuthStatus }}>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </Context.Provider>
    );

    expect(screen.getByTestId("_nav")).toBeInTheDocument();

    const logout = screen.queryByTestId("_logout");
    expect(logout).toBeInTheDocument();

    expect(localStorage.getItem("token")).toBe("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjZhZThmNmFjYzNiNzc1NDJlYTc0ZDIxIiwiaWF0IjoxNzIyODk1OTcwfQ.QOeRf8AgdnpPEiD_51hF73W9WW2c87Z5v_ZVTo6riP8");

    fireEvent.click(logout);

    expect(authStatus).toBe(false);
    expect(localStorage.getItem("token")).toBe(null);
  });
});
