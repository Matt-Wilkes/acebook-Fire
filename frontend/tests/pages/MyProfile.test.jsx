import { screen, render } from "@testing-library/react";
import { expect, beforeEach } from "vitest";
import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";
import userEvent from "@testing-library/user-event";

import { MyProfile } from "../../src/pages/MyProfile/MyProfile";
import { getUser, updateUser } from "../../src/services/users";
import Context from "../../src/components/Context/Context";

// Mock authentication
let authStatus = false;
const setAuthStatus = (newValue) => {
  authStatus = newValue;
};

// Mocking getUser and updateUser services
vi.mock("../../src/services/users", () => {
  const getUserMock = vi.fn();
  const updateUserMock = vi.fn();
  return { getUser: getUserMock, updateUser: updateUserMock };
});

describe("MyProfile.jsx", () => {
  const mockUser = {
    user_id: "qwerty12345",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@email.com",
    city: "Detroit",
    bio: "I saw things in Vietnam",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541",
  };
  beforeEach(() => {
    window.localStorage.removeItem("token");
    setAuthStatus(false);
  });

  test("Logged out user cannot see profile", async () => {
    render(
      <Context.Provider value={{ authStatus, setAuthStatus }}>
        <MyProfile />
      </Context.Provider>
    );

    const message = screen.queryByTestId("_message");
    expect(message).toBeInTheDocument();
    expect(message).toHaveTextContent("You are not logged in. Please login.");
  });

  test("Logged in user can see profile", async () => {
    window.localStorage.setItem(
      "token",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjZhZThmNmFjYzNiNzc1NDJlYTc0ZDIxIiwiaWF0IjoxNzIyODk1OTcwfQ.QOeRf8AgdnpPEiD_51hF73W9WW2c87Z5v_ZVTo6riP8"
    );
    // console.log(localStorage.getItem("token"));

    setAuthStatus(true);

    getUser.mockResolvedValue(mockUser);

    render(
      <Context.Provider value={{ authStatus, setAuthStatus }}>
        <MyProfile />
      </Context.Provider>
    );

    const myProfile = screen.queryByTestId("_my-profile");
    expect(myProfile).toBeInTheDocument();
    expect(myProfile).toHaveTextContent("My Profile");

    const message = screen.queryByTestId("_message");
    expect(message).not.toBeInTheDocument();

    const image = await screen.findByTestId("_image");
    expect(image.src).toContain(
      "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"
    );

    const fullName = await screen.findByTestId("_full-name");
    expect(fullName).toHaveTextContent("John Doe");

    const email = await screen.findByTestId("_email");
    expect(email).toHaveTextContent("john.doe@email.com");

    const city = await screen.findByTestId("_city");
    expect(city).toHaveTextContent("Detroit");

    const bio = await screen.findByTestId("_bio");
    expect(bio).toHaveTextContent("I saw things in Vietnam");
  });

  test("Logged in user can see profile edit form with values already added", async () => {
    window.localStorage.setItem(
      "token",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjZhZThmNmFjYzNiNzc1NDJlYTc0ZDIxIiwiaWF0IjoxNzIyODk1OTcwfQ.QOeRf8AgdnpPEiD_51hF73W9WW2c87Z5v_ZVTo6riP8"
    );
    // console.log(localStorage.getItem("token"));

    setAuthStatus(true);

    getUser.mockResolvedValue(mockUser);

    render(
      <Context.Provider value={{ authStatus, setAuthStatus }}>
        <MyProfile />
      </Context.Provider>
    );

    const user = userEvent.setup();

    const editButton = screen.queryByTestId("_edit-button");
    expect(editButton).toBeInTheDocument();
    console.log(editButton);

    await user.click(editButton);

    const editProfile = screen.getByTestId("_edit-profile");
    expect(editProfile).toBeInTheDocument();
    expect(editProfile).toHaveTextContent("Edit Profile");

    const image = await screen.findByTestId("_image-edit");
    expect(image).toBeInTheDocument();
    expect(image.src).toContain(
      "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"
    );

    const firstNameField = await screen.findByTestId("_first-name-field");
    expect(firstNameField).toBeInTheDocument();
    expect(firstNameField.value).toBe("John");

    const lastNameField = await screen.findByTestId("_last-name-field");
    expect(lastNameField).toBeInTheDocument();
    expect(lastNameField.value).toBe("Doe");

    const cityField = await screen.findByTestId("_city-field");
    expect(cityField).toBeInTheDocument();
    expect(cityField.value).toBe("Detroit");

    const bioField = await screen.findByTestId("_bio-field");
    expect(bioField).toBeInTheDocument();
    expect(bioField.value).toBe("I saw things in Vietnam");

    const pictureUrlField = await screen.findByTestId("_picture-url-field");
    expect(pictureUrlField).toBeInTheDocument();
    expect(pictureUrlField.value).toBe("");
  });

  test("Logged in user can cancel edit mode", async () => {
    window.localStorage.setItem(
      "token",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjZhZThmNmFjYzNiNzc1NDJlYTc0ZDIxIiwiaWF0IjoxNzIyODk1OTcwfQ.QOeRf8AgdnpPEiD_51hF73W9WW2c87Z5v_ZVTo6riP8"
    );
    // console.log(localStorage.getItem("token"));

    setAuthStatus(true);

    getUser.mockResolvedValue(mockUser);

    render(
      <Context.Provider value={{ authStatus, setAuthStatus }}>
        <MyProfile />
      </Context.Provider>
    );

    const user = userEvent.setup();

    const editButton = screen.queryByTestId("_edit-button");
    expect(editButton).toBeInTheDocument();

    await user.click(editButton);

    const editProfile = screen.getByTestId("_edit-profile");
    expect(editProfile).toBeInTheDocument();

    const cancelButton = screen.getByTestId("_cancel-button");
    expect(cancelButton).toBeInTheDocument();
    expect(cancelButton).toHaveTextContent("Cancel");

    await user.click(cancelButton);

    const myProfile = screen.queryByTestId("_my-profile");
    expect(myProfile).toBeInTheDocument();
    expect(myProfile).toHaveTextContent("My Profile");

    const fullName = await screen.findByTestId("_full-name");
    expect(fullName).toHaveTextContent("John Doe");
  });

  test("Logged in can submit data from edit form and switch to display mode with new info", async () => {
    window.localStorage.setItem(
      "token",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjZhZThmNmFjYzNiNzc1NDJlYTc0ZDIxIiwiaWF0IjoxNzIyODk1OTcwfQ.QOeRf8AgdnpPEiD_51hF73W9WW2c87Z5v_ZVTo6riP8"
    );
    // console.log(localStorage.getItem("token"));

    setAuthStatus(true);

    getUser.mockResolvedValue(mockUser);

    render(
      <Context.Provider value={{ authStatus, setAuthStatus }}>
        <MyProfile />
      </Context.Provider>
    );

    const user = userEvent.setup();

    const editButton = screen.queryByTestId("_edit-button");
    expect(editButton).toBeInTheDocument();

    await user.click(editButton);

    const editProfile = screen.getByTestId("_edit-profile");
    expect(editProfile).toBeInTheDocument();

    const firstNameField = await screen.findByTestId("_first-name-field");
    const lastNameField = await screen.findByTestId("_last-name-field");
    const cityField = await screen.findByTestId("_city-field");
    const bioField = await screen.findByTestId("_bio-field");
    const pictureUrlField = await screen.findByTestId("_picture-url-field");

    await userEvent.clear(firstNameField);
    await userEvent.type(firstNameField, "Potato");

    await userEvent.clear(lastNameField);
    await userEvent.type(lastNameField, "Tomato");

    await userEvent.clear(cityField);
    await userEvent.type(cityField, "Vegshire");

    await userEvent.clear(bioField);
    await userEvent.type(bioField, "I grew up on the fields");

    await userEvent.type(
      pictureUrlField,
      "https://i.natgeofe.com/n/8271db90-5c35-46bc-9429-588a9529e44a/raccoon_thumb_square.JPG?wp=1&w=357&h=357"
    );

    const submitButton = screen.getByTestId("_submit-button");
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toHaveTextContent("Submit");

    updateUser.mockResolvedValue({ message: "Profile updated" });
    getUser.mockResolvedValue({
      user_id: "qwerty12345",
      firstName: "Potato",
      lastName: "Tomato",
      email: "john.doe@email.com",
      city: "Vegshire",
      bio: "I grew up on the fields",
      image:
        "https://i.natgeofe.com/n/8271db90-5c35-46bc-9429-588a9529e44a/raccoon_thumb_square.JPG?wp=1&w=357&h=357",
    });

    await user.click(submitButton);

    const message = screen.getByTestId("_message");
    expect(message).toBeInTheDocument();
    expect(message).toHaveTextContent("Profile updated");

    const myProfile = screen.queryByTestId("_my-profile");
    expect(myProfile).toBeInTheDocument();
    expect(myProfile).toHaveTextContent("My Profile");

    const image = await screen.findByTestId("_image");
    expect(image.src).toContain(
      "https://i.natgeofe.com/n/8271db90-5c35-46bc-9429-588a9529e44a/raccoon_thumb_square.JPG?wp=1&w=357&h=357"
    );

    const fullName = await screen.findByTestId("_full-name");
    expect(fullName).toHaveTextContent("Potato Tomato");

    const email = await screen.findByTestId("_email");
    expect(email).toHaveTextContent("john.doe@email.com");

    const city = await screen.findByTestId("_city");
    expect(city).toHaveTextContent("Vegshire");

    const bio = await screen.findByTestId("_bio");
    expect(bio).toHaveTextContent("I grew up on the fields");
  });
});
