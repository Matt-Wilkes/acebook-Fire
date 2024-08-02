import { render, screen } from "@testing-library/react";
import { userEvent } from '@testing-library/react';
import { describe, vi } from "vitest";

import { FeedPage } from "../../src/pages/Feed/FeedPage";
import { getPosts } from "../../src/services/posts";
import { useNavigate } from "react-router-dom";

const user = userEvent.setup();

// Mocking the getPosts service
vi.mock("../../src/services/posts", () => {
  const getPostsMock = vi.fn();
  return { getPosts: getPostsMock };
});

// Mocking React Router's useNavigate function
vi.mock("react-router-dom", () => {
  const navigateMock = vi.fn();
  const useNavigateMock = () => navigateMock; // Create a mock function for useNavigate
  return { useNavigate: useNavigateMock };
});

describe("Feed Page", () => {
  beforeEach(() => {
    window.localStorage.removeItem("token");
  });

  test("It displays posts from the backend", async () => {
    window.localStorage.setItem("token", "testToken");

    const mockPosts = [{ _id: "12345", message: "Test Post 1" }];

    getPosts.mockResolvedValue({ posts: mockPosts, token: "newToken" });

    render(<FeedPage />);

    const post = await screen.findByRole("article");
    expect(post.textContent).toEqual("Test Post 1");
  });

  test("It navigates to login if no token is present", async () => {
    render(<FeedPage />);
    const navigateMock = useNavigate();
    expect(navigateMock).toHaveBeenCalledWith("/login");
  });

  test("It displays posts when submitted to the feed page", async () => {
    window.localStorage.setItem("token", "testToken");
    render(<FeedPage />);

    const createPostMessage = screen.findByTestId("tcreate-post");
    const submitButtonEl = screen.findByRole("submit-button");
  
    await user.type(createPostMessage, "Test message");
    await user.click(submitButtonEl);

    const post = await screen.findByRole("article");
    expect(post.textContent).toEqual("Test message");
  });

  // test("It displays posts when submitted to the feed page", async () => {
  //   // Mock local storage for token
  //   const mockLocalStorage = {
  //     getItem: jest.fn(() => "testToken"),
  //     setItem: jest.fn(),
  //   };
  //   jest.spyOn(window.localStorage, "getItem", "get").mockImplementation(() => mockLocalStorage.getItem());
  
  //   // Render the FeedPage with mocked token
  //   render(<FeedPage />);
  
  //   // Restore local storage mock
  //   jest.spyOn(window.localStorage, "getItem", "get").mockRestore();
  // });
});
