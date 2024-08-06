import { render, screen } from "@testing-library/react";
import { vi } from "vitest";

import  AllUsers  from "../../src/pages/Users/AllUsers";
import { getUsers } from "../../src/services/users";
import { useNavigate } from "react-router-dom";

// Mocking the getUsers service
vi.mock("../../src/services/users", () => {
  const getUsersMock = vi.fn();
  return { getUsers: getUsersMock };
});

// Mocking React Router's useNavigate function
vi.mock("react-router-dom", () => {
  const navigateMock = vi.fn();
  const useNavigateMock = () => navigateMock; // Create a mock function for useNavigate
  return { useNavigate: useNavigateMock };
});

describe("All Users Page", () => {
  beforeEach(() => {
    window.localStorage.removeItem("token");
  });

  test("It displays users from the backend", async () => {
    window.localStorage.setItem("token", "testToken");

    const mockUsers = [
        {
        _id: "12345",
        firstName: "john",
        lastName: "smith",
        email: "test@mail.com",
        password: "1234",
        confirmPassword: "123"
        }
    ];

    getUsers.mockResolvedValue({ users: mockUsers, token: "newToken" });

    render(<AllUsers />);

    const user = await screen.findByTestId("user-card");
    expect(user.textContent).toEqual("john smith");
  });

  test("It navigates to login if no token is present", async () => {
    render(<AllUsers />);
    const navigateMock = useNavigate();
    expect(navigateMock).toHaveBeenCalledWith("/login");
  });
});
