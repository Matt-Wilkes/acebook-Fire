import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LoginPage } from "../../src/pages/Login/LoginPage";
import { vi } from "vitest";
import getBody from "../helpers/getBody";

// Get the backend url specified by our environment variable
// in the .env file
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// Mocking React Router's useNavigate function
let navigateMock = vi.fn();
vi.mock("react-router-dom", () => {
  const useNavigate = () => navigateMock; // Create a mock function for useNavigate
  return { useNavigate };
});

// Reusable function for logging in
const login = async () => {
  const user = userEvent.setup();

  const emailInputEl = screen.getByLabelText("Email:");
  const passwordInputEl = screen.getByLabelText("Password:");
  const submitButtonEl = screen.getByRole("submit-button");

  await user.type(emailInputEl, "test@email.com");
  await user.type(passwordInputEl, "1234");
  await user.click(submitButtonEl);
};

describe("Login Page", () => {
  test("allows a user to login", async () => {
    render(<LoginPage />);

    await login();

    expect(fetch.requests().length).toEqual(1);
    const request = fetch.requests()[0];
    expect(request.url).toEqual(`${BACKEND_URL}/tokens`);
    const requestBody = getBody(request);
    expect(requestBody).toMatchObject({
      email: "test@email.com",
      password: "1234",
    });
  });

  test("navigates to /posts on successful login", async () => {
    render(<LoginPage />);

    const responseString = JSON.stringify({ token: "abcd" });
    fetch.mockResponse(responseString, { status: 201 });

    await login();

    expect(navigateMock).toHaveBeenCalledWith("/posts");
  });

  test("navigates to /login on unsuccessful login", async () => {
    render(<LoginPage />);

    const responseString = JSON.stringify({ messsage: "User not found" });
    fetch.mockResponse(responseString, { status: 401 });

    await login();

    expect(navigateMock).toHaveBeenCalledWith("/login");
  });
});
