import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import { HomePage } from "../../src/pages/Home/HomePage";

import Context from "../../src/components/Context/Context";

// Mock authentication
let authStatus = false;
const setAuthStatus = (newValue) => {
  authStatus = newValue;
};

describe("Home Page", () => {
  test("welcomes you to the site", () => {
    setAuthStatus(false);

    render(
      <Context.Provider value={{ authStatus, setAuthStatus }}>
        <BrowserRouter>
          <HomePage />
        </BrowserRouter>
      </Context.Provider>
    );

    const heading = screen.getByTestId("_heading");
    expect(heading.textContent).toEqual("Welcome to 🔥cebook");
  });

});
