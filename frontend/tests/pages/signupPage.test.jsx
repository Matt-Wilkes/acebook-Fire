import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

import { useNavigate } from "react-router-dom";
import { signup } from "../../src/services/authentication";

import { SignupPage } from "../../src/pages/Signup/SignupPage";

// Mocking React Router's useNavigate function
vi.mock("react-router-dom", () => {
  const navigateMock = vi.fn();
  const useNavigateMock = () => navigateMock; // Create a mock function for useNavigate
  return { useNavigate: useNavigateMock };
});

// Mocking the signup service
vi.mock("../../src/services/authentication", () => {
  const signupMock = vi.fn();
  return { signup: signupMock };
});

// Reusable function for filling out signup form
const completeSignupForm = async () => {
  const user = userEvent.setup();

  const firstNameInputEl = screen.getByLabelText("First Name:");
  const lastNameInputEl = screen.getByLabelText("Last Name:");
  const emailInputEl = screen.getByLabelText("Email:");
  const passwordInputEl = screen.getByLabelText("Password:");
  const confirmPasswordInputEl = screen.getByLabelText("Confirm Password:");
  const imageInputEl = screen.getByLabelText("Profile Photo (URL)")
  const submitButtonEl = screen.getByRole("submit-button");

  await user.type(firstNameInputEl, "john");
  await user.type(lastNameInputEl, "smith");
  await user.type(emailInputEl, "test@mail.com");
  await user.type(passwordInputEl, "1234");
  await user.type(confirmPasswordInputEl, "1234");
  await user.type(imageInputEl, "https://www.strasys.uk/wp-content/uploads/2022/02/Depositphotos_484354208_S.jpg");
  await user.click(submitButtonEl);
};

describe("Signup Page", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  test("allows a user to signup", async () => {
    render(<SignupPage />);

    await completeSignupForm();

    expect(signup).toHaveBeenCalledWith({
      firstName: "john",
      lastName: "smith",
      email: "test@mail.com",
      password: "1234",
      confirmPassword: "1234",
      image: "https://www.strasys.uk/wp-content/uploads/2022/02/Depositphotos_484354208_S.jpg"
    });
  });

  test("navigates to /login on successful signup", async () => {
    render(<SignupPage />);

    const navigateMock = useNavigate();

    await completeSignupForm();

    expect(navigateMock).toHaveBeenCalledWith("/login");
  });

  test("navigates to /signup on unsuccessful signup", async () => {
    render(<SignupPage />);

    signup.mockRejectedValue(new Error("Error signing up"));
    const navigateMock = useNavigate();

    await completeSignupForm();

    expect(navigateMock).toHaveBeenCalledWith("/signup");
  });
});
