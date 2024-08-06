import { render, screen } from "@testing-library/react";
import { userEvent } from '@testing-library/react';
import { describe, vi } from "vitest";

import { FeedPage } from "../../src/pages/Feed/FeedPage";
import { getPosts } from "../../src/services/posts";
import { useNavigate } from "react-router-dom";

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
  test("It displays posts in descending order (by date)", async () => {
    window.localStorage.setItem("token", "testToken");

    const mockPosts = [{ _id: "12345", message: "First post", date:"2024-08-05T13:06:21.288+00:00" },{ _id: "13456", message: "Second post", date:"2024-08-06T13:06:21.288+00:00" },{ _id: "13456", message: "Third post", date:"2024-08-06T15:06:21.288+00:00" }];
  
    getPosts.mockResolvedValue({ posts: mockPosts, token: "newToken" });
  
    render(<FeedPage />);
  
    const post = (await screen.findAllByRole("article")).children;
    expect(post.textContent).toEqual("Third post");
  })

});
