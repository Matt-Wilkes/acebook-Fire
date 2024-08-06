import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom'
import { describe, expect, vi } from "vitest";
import { FeedPage } from "../../src/pages/Feed/FeedPage";
import { getPosts, createPost } from "../../src/services/posts";
import { useNavigate } from "react-router-dom";


// Mocking the getPosts service
vi.mock("../../src/services/posts", () => {
  const getPostsMock = vi.fn();
  const createPostMock = vi.fn();
  return { getPosts: getPostsMock, createPost: createPostMock };
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
  
});
